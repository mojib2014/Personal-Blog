import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardMedia,
  Avatar,
  Typography,
  IconButton,
  makeStyles,
  CardContent,
  Grid,
  CssBaseline,
  Container,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(20),
  },
  card: {
    maxWidth: "100%",
    margin: "auto",
  },
  media: {
    height: 150,
  },
}));

function Media(props) {
  const { loading = false } = props;
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" className={classes.root}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
            <Grid item xs={3} key={num}>
              <Card className={classes.card}>
                <CardHeader
                  avatar={
                    loading ? (
                      <Skeleton
                        animation="wave"
                        variant="circle"
                        width={40}
                        height={40}
                      />
                    ) : (
                      <Avatar
                        alt="Ted talk"
                        src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg"
                      />
                    )
                  }
                  action={
                    loading ? null : (
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    )
                  }
                  title={
                    loading ? (
                      <Skeleton
                        animation="wave"
                        height={10}
                        width="80%"
                        style={{ marginBottom: 6 }}
                      />
                    ) : (
                      "Ted"
                    )
                  }
                  subheader={
                    loading ? (
                      <Skeleton animation="wave" height={10} width="40%" />
                    ) : (
                      "5 hours ago"
                    )
                  }
                />
                {loading ? (
                  <Skeleton
                    animation="wave"
                    variant="rect"
                    className={classes.media}
                  />
                ) : (
                  <CardMedia
                    className={classes.media}
                    image="https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/72bda89f-9bbf-4685-910a-2f151c4f3a8a/NicolaSturgeon_2019T-embed.jpg?w=512"
                    title="Ted talk"
                  />
                )}

                <CardContent>
                  {loading ? (
                    <React.Fragment>
                      <Skeleton
                        animation="wave"
                        height={10}
                        style={{ marginBottom: 6 }}
                      />
                      <Skeleton animation="wave" height={10} width="80%" />
                    </React.Fragment>
                  ) : (
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {
                        "Why First Minister of Scotland Nicola Sturgeon thinks GDP is the wrong measure of a country's success:"
                      }
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
};

export default function Loading() {
  return (
    <div>
      <Media loading />
    </div>
  );
}
