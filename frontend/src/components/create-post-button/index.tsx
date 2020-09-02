import React, { useState, useContext } from "react";
import { Button, Icon, TransitionablePortal, Modal } from "semantic-ui-react";
import useAxios from "axios-hooks";
import PostForm, { FormFieldProps } from "../post-form";
import { PostContext } from "../../context-providers/post-provider";
import { toast } from "react-toastify";

function CreatePostButton() {
  const { getAllPosts } = useContext(PostContext);
  const [, createPost] = useAxios(
    {
      url: "/posts/",
      method: "post",
      baseURL: "http://localhost:8000",
    },
    { manual: true }
  );
  const [isCreating, setCreating] = useState(false);

  const onSubmit = async (data: FormFieldProps) => {
    const { encodedImageData, title, content } = data;
    await createPost({
      data: { title, content, image_data: encodedImageData || undefined },
    });
    toast.success("A new post has been successfully created.");
    setCreating(false);
    getAllPosts();
  };

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
            <PostForm onSubmit={onSubmit} onCancel={() => setCreating(false)} />
          </Modal.Content>
        </Modal>
      </TransitionablePortal>
    </>
  );
}

export default CreatePostButton;
