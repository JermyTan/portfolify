import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";
import PostCard from "../post-card";
import LoaderWrapper from "../loader-wrapper";
import { PostContext, Post } from "../../context-providers/PostProvider";

function AppBody() {
  const { isLoading, posts } = useContext(PostContext);

  return (
    <LoaderWrapper isLoading={isLoading}>
      <Grid
        padded="vertically"
        relaxed="very"
        stackable
        container
        centered
        columns="3"
      >
        {posts.map(({ id, created_at, title, image }: Post) => (
          <Grid.Column key={id}>
            <PostCard
              id={id}
              created_at={created_at * 1000}
              title={title}
              image_url={image?.image_url}
            />
          </Grid.Column>
        ))}
      </Grid>
    </LoaderWrapper>
  );
}

export default AppBody;
