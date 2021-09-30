"use strict";
const { Client } = require("pg");
const config = require("config");

(async () => {
  const usersTable = `
    CREATE TABLE IF NOT EXISTS users(
      user_id         INT           PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
      email           VARCHAR(100)  UNIQUE,
      password        VARCHAR(200)  UNIQUE, 
      first_name      VARCHAR(20)   NOT NULL,
      last_name       VARCHAR(20)   NOT NULL,
      profile_image   VARCHAR,
      cover_image     VARCHAR,
      google_id       VARCHAR,
      facebook_id     VARCHAR,
      email_verified  BOOLEAN,
      created         DATE          NOT NULL,
      modified        DATE          NOT NULL,
      last_login      DATE
    );
  `;

  const postsTAble = `
      CREATE TABLE IF NOT EXISTS posts(
        post_id         INT             PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
        title           VARCHAR(100)    NOT NULL,
        sub_title       VARCHAR(150)    NOT NULL,
        body            VARCHAR         NOT NULL,
        cover_image     VARCHAR         NOT NULL,
        created         TIMESTAMP       NOT NULL,
        modified        TIMESTAMP       NOT NULL,
        like_user_id    INT[] DEFAULT   ARRAY[]::INT[],
        likes INT       DEFAULT 0 CHECK (likes >= 0),
        author          INT       REFERENCES users(user_id) ON DELETE CASCADE,
        tag_id          INT       REFERENCES tags(tag_id) ON DELETE CASCADE
      );
  `;

  const tagsTable = `
  CREATE TABLE IF NOT EXISTS tags(
    tag_id    INT          PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
    tag       VARCHAR(50)  UNIQUE  NOT NULL
  );
`;

  const commentsTable = `
        CREATE TABLE IF NOT EXISTS comments(
          comment_id      INT           PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
          comment         VARCHAR(255)  NOT NULL,
          created         TIMESTAMP     NOT NULL,
          modified        TIMESTAMP     NOT NULL, 
          post_id         INT     REFERENCES posts(post_id) ON DELETE CASCADE,
          user_id         INT     REFERENCES users(user_id) 
        );
    `;

  try {
    const db = new Client({ connectionString: config.get("dbUrl") });

    await db
      .connect()
      .then(() => console.log("Connected successfully to the database..."))
      .catch((err) => console.log(err));

    await db.query(usersTable);
    await db.query(tagsTable);
    await db.query(postsTAble);
    await db.query(commentsTable);

    await db.end();
  } catch (err) {
    console.log(err);
  }
})();
