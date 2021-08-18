import React, {useEffect} from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import useAuthor from "../hooks/useAuthor";
import formatDate from "../utils/formatDate";

const Cardheader = ({item}) => {
  const [author, getAuthor] = useAuthor();

  useEffect(() => {
    getAuthor(item.author);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  return (
    <>
      {author && (
        <HeaderContainer>
          <Link
            to={`/author/profile/${author.last_name}/${author.id}`}
            style={{textDecoration: "none"}}
            title="Go to author's profile"
          >
            <Avatar aria-label="Author Profile">
              <AvatarCircle>
                {author.last_name ? author.last_name[0] : null}
              </AvatarCircle>
            </Avatar>
          </Link>
          <Link
            to={`/author/profile/${author.last_name}/${author.id}`}
            style={{textDecoration: "none"}}
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
  item: PropTypes.object.isRequired,
};

export default React.memo(Cardheader);

const HeaderContainer = styled.div`
  padding: 0.5rem 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
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
  font-size: 1.25rem;
  flex-shrink: 0;
  line-height: 1;
  border-radius: 50%;
  user-select: none;
  justify-content: center;
`;

const HeaderContent = styled.div`
  flex: 1 1 auto;
`;

const HeaderTitle = styled.span`
  display: block;
  font-size: 0.875rem;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 400;
  line-height: 1.43;
  letter-spacing: 0.02071em;
`;

const HeaderSubtitle = styled.span`
  display: block;
  color: rgba(0, 0, 0, 0.6);
  font-size: 0.875rem;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 400;
  line-height: 1.43;
  letter-spacing: 0.01071em;
`;
