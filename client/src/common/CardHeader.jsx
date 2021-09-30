import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import formatDate from "../utils/formatDate";

const Cardheader = ({ author }) => {
  return (
    <>
      {author && (
        <HeaderContainer>
          <Link
            to={`/author/profile/${author.user_id}`}
            style={{ textDecoration: "none" }}
            title="Go to author's profile"
          >
            <Avatar aria-label="Author Profile">
              <AvatarCircle>
                {author.last_name ? author.last_name[0] : null}
              </AvatarCircle>
            </Avatar>
          </Link>
          <Link
            to={`/author/profile/${author.user_id}`}
            style={{ textDecoration: "none" }}
            title="Go to author's profile"
          >
            <HeaderContent>
              <HeaderTitle>{"@" + author.last_name}</HeaderTitle>
              <HeaderSubtitle>{formatDate(author.created)}</HeaderSubtitle>
            </HeaderContent>
          </Link>
        </HeaderContainer>
      )}
    </>
  );
};

Cardheader.propTypes = {
  author: PropTypes.object,
};

export default React.memo(Cardheader);

const HeaderContainer = styled.div`
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-align: center;
  -ms-flex-align: center;
`;

const Avatar = styled.div`
  flex: 0 0 auto;
  margin-right: 16px;
`;

const AvatarCircle = styled.div`
  width: 40px;
  height: 40px;
  background-color: #f44336;
  color: #fff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
  border-radius: 50%;
  user-select: none;
  justify-content: center;
`;

const HeaderContent = styled.div`
  flex: 1 1 auto;
`;

const HeaderTitle = styled.span`
  display: block;
`;

const HeaderSubtitle = styled.span`
  display: block;
  color: var(--secondary-text-color);
  line-height: 1.1;
`;
