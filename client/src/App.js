import useStyles from "./styles";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import memories from "../src/images/memories.jpg";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
import { getPosts } from "./redux/actions/posts";

import { Form } from "./components/Form/Form";
import { Posts } from "./components/Posts/Posts";

function App() {
  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Container maxWidth="lg">
      <AppBar position="static" color="inherit" className={classes.appBar}>
        <Typography variant="h2" align="center" className={classes.heading}>
          Memories
        </Typography>

        <img
          src={memories}
          alt="memories"
          height={"60"}
          className={classes.image}
        />
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            className={classes.mainContainer}
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default App;
