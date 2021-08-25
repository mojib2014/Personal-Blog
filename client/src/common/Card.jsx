import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {MdShare} from "react-icons/md";
import getReadingTime from "../utils/getReadingTime";
import Cardheader from "./CardHeader";
import formatSlug from "../utils/formatSlug";
import useAuthor from "../hooks/useAuthor";

const Card = ({item}) => {
  const {data: author, isLoading} = useAuthor(item.author);

  return (
    <Container>
      {author && (
        <Cardheader author={author} />
      )}
      <CardTitleContainer>
        <Title>{item.title}</Title>
      </CardTitleContainer>
      <CardMedia>
        <Image src={item.cover_image} title={item.title} />
      </CardMedia>
      <CardContent>
        <CardSubtitle>{item.sub_title}</CardSubtitle>
      </CardContent>
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
            to={`/post-details/${formatSlug(item.title)}/${item.id}`}
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
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  border-radius: 5px;
  background-color: #ffffff;
  color: rgba(0, 0, 0, 0.87);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  font-size: 1rem;
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
  flex-grow: 0;
  padding: 8px;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`;

const CardTitleContainer = styled.div`
  display: flex;
  width: 100%;
  flex-basis: 100%;
`;

const Title = styled.h2`
  color: rgba(0, 0, 0, 0.83);
  font-weight: 400;
  line-height: 1.335;
  letter-spacing: 0em;
`;

const CardMedia = styled.div`
  background-color: #ddd;
  background-size: cover;
  display: block;
  min-width: 100%;
`;

const Image = styled.img`
  background-color: #ddd;
  display: block;
  min-width: 100%;
  width: 100%;
  min-height: 181.328px;
  height: auto;
  max-height: 250px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 1rem 0;
`;

const CardSubtitle = styled.small`
  color: rgba(0, 0, 0, 0.54);
  display: block;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 400;
  line-height: 1.43;
  letter-spacing: 0.01071em;
  width: 100%;
  margin: 0;
  padding: 0;
`;

const CardActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
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
