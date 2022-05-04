import { useDispatch } from "react-redux";
import { useState, useRef } from "react";
import useStyles from "./styles";

import { Typography, TextField, Button } from "@material-ui/core";
import { getCommentsForPost } from "../../../redux/actions/posts";

const CommentSection = ({ post }) => {
  const [comments, setComments] = useState(post?.comments);
  const [textfield, setTextField] = useState("");

  const user = JSON.parse(localStorage.getItem("profile"));
  const classes = useStyles();
  const dispatch = useDispatch();
  const commentsRef = useRef();

  const handleAddComment = async () => {
    const finalComment = `${user.result.name}: ${textfield}`;
    const newComments = await dispatch(
      getCommentsForPost(finalComment, post._id)
    );

    setComments(newComments);
    setTextField("");

    // const newComments = await dispatch(
    //   getCommentsForPost(finalComment, post._id)
    // );

    commentsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              {c}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        {user?.result?.name && (
          <div style={{ width: "70%" }}>
            <Typography gutterBottom variant="h6">
              Write a comment
            </Typography>
            <TextField
              fullWidth
              minRows={4}
              variant="outlined"
              label="Comemnt"
              multiline
              value={textfield}
              onChange={(e) => setTextField(e.target.value)}
            />
            <Button
              style={{ marginTop: "10px" }}
              fullWidth
              disabled={!textfield}
              variant="contained"
              color="primary"
              onClick={handleAddComment}
            >
              Add Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
