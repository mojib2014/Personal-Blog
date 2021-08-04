const { Client } = require("pg");
const config = require("config");

(async () => {
  const usersTable = `
    CREATE TABLE IF NOT EXISTS users(
      id              INT           PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
      email           VARCHAR(100)  UNIQUE NOT NULL,
      password        VARCHAR(200)  NOT NULL, 
      first_name      VARCHAR(20)   NOT NULL,
      last_name       VARCHAR(20)   NOT NULL,
      email_verified  BOOLEAN,
      created         DATE,
      modified        DATE,
      last_login      DATE
    );
  `;

  const postsTAble = `
      CREATE TABLE IF NOT EXISTS posts(
        id              INT             PRIMARY  KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
        title           VARCHAR(100)    NOT NULL,
        sub_title       VARCHAR(150)    NOT NULL,
        body            VARCHAR         NOT NULL,
        created         TIMESTAMP       NOT NULL,
        modified        TIMESTAMP       NOT NULL,
        liked            BOOLEAN,
        like_user_id    INT[] DEFAULT ARRAY[]::INT[],
        likes INT DEFAULT 0 CHECK (likes >= 0),
        author    INT   REFERENCES users(id)
      );
  `;

  const commentsTable = `
        CREATE TABLE IF NOT EXISTS comments(
          id              INT         PRIMARY  KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
          comment         VARCHAR(255),
          created         TIMESTAMP,
          modified        TIMESTAMP, 
          post_id         INT REFERENCES posts(id),
          user_id         INT REFERENCES users(id)
        );
    `;

  try {
    const db = new Client({ connectionString: config.get("db") });

    await db
      .connect()
      .then(() => console.log("Connected successfully to the database..."))
      .catch((err) => console.log(err));

    await db.query(usersTable);
    await db.query(postsTAble);
    await db.query(commentsTable);

    await db.end();
  } catch (err) {
    console.log(err);
  }
})();
