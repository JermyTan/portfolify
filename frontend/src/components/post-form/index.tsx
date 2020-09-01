import React from "react";
import { useForm } from "react-hook-form";
import { Form, Label } from "semantic-ui-react";
import useAxios from "axios-hooks";
import { toast } from "react-toastify";

type Props = {
  onSubmitEffect?: () => void;
  onCancelEffect?: () => void;
};

function PostForm({ onSubmitEffect, onCancelEffect }: Props) {
  const { register, handleSubmit, getValues, errors, reset } = useForm();
  const [{ loading }, createPost] = useAxios(
    {
      url: "/posts/",
      method: "post",
      baseURL: "http://localhost:8000",
    },
    { manual: true }
  );
  const { title: titleError, content: contentError } = errors;

  const onSubmit = async () => {
    try {
      await createPost({
        data: {
          title: getValues("title"),
          content: getValues("content"),
        },
      });

      toast.success("A new post has been successfully created.");
      onSubmitEffect?.();
      reset();
    } catch (error) {
      console.log(error);
      toast.error("An unkown error has occurred.");
    }
  };

  const onCancel = () => {
    onCancelEffect?.();
    reset();
  };

  console.log(errors);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Field required error={!!titleError}>
        <label>Title</label>
        {titleError && (
          <Label
            basic
            color="red"
            content={
              titleError?.type === "required"
                ? "Please enter a title"
                : "Max title length is 100 characters"
            }
            pointing="below"
          />
        )}
        <input
          name="title"
          ref={register({ required: true, maxLength: 100 })}
        />
      </Form.Field>
      <Form.Field required error={!!contentError}>
        <label>Content</label>
        {contentError && (
          <Label
            basic
            color="red"
            content="Please enter content"
            pointing="below"
          />
        )}
        <textarea name="content" rows={10} ref={register({ required: true })} />
      </Form.Field>

      <Form.Group className="button-action-group">
        <Form.Button
          type="button"
          content="Cancel"
          secondary
          onClick={onCancel}
        />
        <Form.Button type="submit" content="Create" primary loading={loading} />
      </Form.Group>
    </Form>
  );
}

export default PostForm;
