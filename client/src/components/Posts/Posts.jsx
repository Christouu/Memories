import React from "react";
import { Post } from "./Post/Post";
import { useSelector } from "react-redux";
import useStyles from "./styles";

import { Grid, CircularProgress } from "@material-ui/core";

export const Posts = ({ setCurrentId }) => {
  const classes = useStyles();
  const { posts, isLoading } = useSelector((state) => state.posts);

  if (!posts.length && !isLoading) return "No Posts";

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.mainContainer}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((p) => (
        <Grid key={p._id} item xs={12} sm={12} md={6} lg={3}>
          <Post post={p} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};
