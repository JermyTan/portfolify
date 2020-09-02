import React, { useState } from "react";
import useAxios from "axios-hooks";
import { useParams } from "react-router-dom";
import { Container, Segment } from "semantic-ui-react";
import LoaderWrapper from "../loader-wrapper";
import "./index.scss";
import PostViewer from "../post-viewer";
import PostForm, { FormFieldProps } from "../post-form";
import { toast } from "react-toastify";

function AppPostBody() {
  const { id } = useParams();
  const [isEditing, setEditing] = useState(false);
  const [{ data: response, loading, error }, getPost] = useAxios({
    url: `/posts/${id}`,
    method: "get",
    baseURL: process.env.REACT_APP_API_URL,
  });
  const { created_at: createdAt, title, image, content } = response?.data ?? {};

  const [, putPost] = useAxios(
    {
      url: "/posts/",
      method: "put",
      baseURL: process.env.REACT_APP_API_URL,
    },
    { manual: true }
  );

  const onSaveChanges = async (data: FormFieldProps) => {
    const { encodedImageData, title, content } = data;
    await putPost({
      data: { id, title, content, image_data: encodedImageData || undefined },
    });
    toast.success("The post has been successfully updated.");
    setEditing(false);
    getPost();
  };

  return (
    <Segment vertical padded="very">
      <LoaderWrapper
        isLoading={loading}
        loadingMessage="Retrieving post"
        showDefaultMessage={!!error}
        defaultMessage={"No post found"}
      >
        <Container className="post-container post-content">
          {isEditing ? (
            <PostForm
              onCancel={() => setEditing(false)}
              submitButtonProps={{ content: "Save changes", color: "green" }}
              defaultImage={image?.image_url}
              defaultValues={{
                title: title,
                content: content,
                encodedImageData: "no change",
              }}
              onSubmit={onSaveChanges}
            />
          ) : (
            <PostViewer
              id={id}
              image={image?.image_url}
              createdAt={createdAt}
              title={title}
              content={content}
              onEdit={() => setEditing(true)}
            />
          )}
        </Container>
      </LoaderWrapper>
    </Segment>
  );
}

export default AppPostBody;
