import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";
import { Form } from "../Form/Form";
import { Posts } from "../Posts/Posts";
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";
import useStyles from "../../styles";
import { useDispatch } from "react-redux";
import { getPosts, getPostBySearch } from "../../redux/actions/posts";
import Paginate from "../Pagination/Pagination";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  const classes = useStyles();
  const query = useQuery();
  const history = useNavigate();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const dispatch = useDispatch();

  const handleAdd = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  const searchPost = () => {
    if (search.trim() || tags) {
      //dispatch for searched posts
      dispatch(getPostBySearch({ search, tags: tags.join(",") }));
      history(
        `/post/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      console.log("hello");
      history("/");
    }
  };

  const handleKeyPress = (e) => {
    if (e.keycode === 13) {
      //search posts
      searchPost();
    }
  };

  // useEffect(() => {
  //   dispatch(getPosts());
  // }, [currentId, dispatch]);

  return (
    <>
      <Grow in>
        <Container maxWidth="xl">
          <Grid
            className={classes.gridContainer}
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={6} md={9}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBar
                className={classes.appBarSearch}
                position="static"
                color="inherit"
              >
                <TextField
                  name="search"
                  variant="outlined"
                  label="Search Memories"
                  fullWidth
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  onKeyPress={handleKeyPress}
                />

                <ChipInput
                  style={{ margin: "10px 0px" }}
                  value={tags}
                  onAdd={handleAdd}
                  onDelete={handleDelete}
                  label="Search tags"
                  variant="outlined"
                />
                <Button
                  onClick={searchPost}
                  className={classes.searchButton}
                  color="primary"
                  variant="contained"
                >
                  Search
                </Button>
              </AppBar>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
              {!searchQuery && !tags.length && (
                <Paper elevation={6} className={classes.pagination}>
                  <Paginate page={page} />
                </Paper>
              )}
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </>
  );
};

export default Home;
