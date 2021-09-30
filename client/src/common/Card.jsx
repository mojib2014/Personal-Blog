import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { MdShare } from "react-icons/md";
import styled from "styled-components";
import getReadingTime from "../utils/getReadingTime";
import Cardheader from "./CardHeader";
import formatSlug from "../utils/formatSlug";
import useAuthor from "../hooks/useAuthor";
import { useEffect } from "react";

const Card = ({ item }) => {
  const { author, getAuthor } = useAuthor();

  useEffect(() => {
    if (item) getAuthor(item.author);
  }, [getAuthor, item]);

  return (
    <Container>
      <Cardheader author={author} />
      <CardTitleContainer>
        <Title>{item.title}</Title>
      </CardTitleContainer>
      <CardMedia>
        <Link to={`/post-details/${formatSlug(item.title)}/${item.post_id}`}>
          <Image src={item.cover_image} title={item.title} alt={item.title} />
        </Link>
      </CardMedia>
      <CardSubtitle>{item.sub_title}</CardSubtitle>
      <CardActions className="card-actions">
        <CardAction>
          <CardSubtitle>
            {item.likes > 1 ? `Likes: ${item.likes}` : `Likes ${item.likes}`}
          </CardSubtitle>
        </CardAction>
        <CardAction>
          <Button>
            <MdShare
              aria-label="share"
              size={16}
              color="#1967d2"
              title="Share On"
            />
          </Button>
        </CardAction>
        <CardAction>
          <Link
            to={`/post-details/${formatSlug(item.title)}/${item.post_id}`}
            title="Read Topic"
          >
            <Button>Read</Button>
          </Link>
        </CardAction>
        <CardAction>
          <CardSubtitle>{getReadingTime(item.body)}</CardSubtitle>
        </CardAction>
      </CardActions>
    </Container>
  );
};

export default Card;

Card.propTypes = {
  item: PropTypes.object.isRequired,
};

const Container = styled.div`
  box-shadow: var(--box-shadow);
  border-radius: var(--border-radius);
  background-color: var(--bg-color);
  color: var(--text-color);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  -moz-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: stretch;
  justify-content: space-evenly;
  with: 100%;
  height: 100%;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  padding: 1rem;
`;

const CardTitleContainer = styled.div`
  display: flex;
  width: 100%;
  flex-basis: 100%;
  padding: 1rem 0;
`;

const Title = styled.h3``;

const CardMedia = styled.div`
  width: 100%;
`;

const Image = styled.img`
  background-color: var(--bg-color);
  cursor: pointer;
  display: block;
  min-width: 100%;
  width: 100%;
  min-height: 181.328px;
  height: auto;
  object-fit: cover;
`;

const CardSubtitle = styled.p`
  color: var(--dark-gray);
  display: block;
  width: 100%;
  margin: 0;
  padding: 1rem 0;
`;

const CardActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CardAction = styled.div`
  flex-basis: auto;
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  color: #1967d2;
  cursor: pointer;
  font-size: inherit;
  &:hover {
    text-decoration: underline;
  }
`;
