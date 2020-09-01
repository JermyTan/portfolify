import React, { useState, useContext } from "react";
import { Button, Icon, TransitionablePortal, Modal } from "semantic-ui-react";
import PostForm from "../post-form";
import { PostContext } from "../../context-providers/PostProvider";

function CreatePostButton() {
  const { getPosts } = useContext(PostContext);
  const [isCreating, setCreating] = useState(false);

  return (
    <>
      <Button
        onClick={() => setCreating(!isCreating)}
        animated="fade"
        color="teal"
        fluid
      >
        <Button.Content visible>
          <Icon name="plus" />
        </Button.Content>
        <Button.Content hidden>Create new post</Button.Content>
      </Button>

      <TransitionablePortal
        open={isCreating}
        transition={{ animation: "scale", duration: 300 }}
      >
        <Modal open={true} onClose={() => setCreating(false)} size="small">
          <Modal.Header>New Post</Modal.Header>
          <Modal.Content>
            <PostForm
              onSubmitEffect={() => {
                setCreating(false);
                getPosts();
              }}
              onCancelEffect={() => {
                setCreating(false);
              }}
            />
          </Modal.Content>
        </Modal>
      </TransitionablePortal>
    </>
  );
}

export default CreatePostButton;
