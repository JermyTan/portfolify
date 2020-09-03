import React, { useContext, useEffect } from "react";
import { Grid, Segment } from "semantic-ui-react";
import PostCard from "../post-card";
import LoaderWrapper from "../loader-wrapper";
import { PostContext, Post } from "../../context-providers/post-provider";

function AppHomeBody() {
  const { getAllPosts, isLoading, posts, error } = useContext(PostContext);

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  return (
    <Segment vertical padded>
      <LoaderWrapper
        isLoading={isLoading}
        loadingMessage="Retrieving all posts"
        showDefaultMessage={!!error || posts.length === 0}
        defaultMessage="No posts found"
      >
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
                createdAt={created_at * 1000}
                title={title}
                imageUrl={image?.image_url}
              />
            </Grid.Column>
          ))}
        </Grid>
      </LoaderWrapper>
    </Segment>
  );
}

export default AppHomeBody;
