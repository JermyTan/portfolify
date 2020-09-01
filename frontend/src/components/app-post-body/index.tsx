import React from "react";
import useAxios from "axios-hooks";
import { useParams } from "react-router-dom";
import {
  Container,
  Header,
  Image,
  Divider,
  Segment,
  Button,
  Icon,
} from "semantic-ui-react";
import { format } from "date-fns";
import LoaderWrapper from "../loader-wrapper";
import "./index.scss";
import DeletePostButton from "../delete-post-button";

function AppPostBody() {
  const { id } = useParams();
  const [{ data: response, loading, error }, getPost] = useAxios({
    url: `/posts/${id}`,
    method: "get",
    baseURL: "http://localhost:8000",
  });
  const { created_at: createdAt, title, image, content } = response?.data ?? {};

  return (
    <Segment vertical padded="very">
      <LoaderWrapper
        isLoading={loading}
        loadingMessage="Retrieving post"
        showDefaultMessage={!!error}
        defaultMessage={"No post found"}
      >
        <Container className="post-container post-content">
          <Image
            style={{ height: "auto" }}
            src={image?.image_url}
            rounded
            centered
          />
          <Divider hidden />
          <Header as="h1">{title}</Header>
          {createdAt && (
            <p>Posted at: {format(createdAt * 1000, "d MMM yyyy h.mmaaaa")}</p>
          )}
          <p>{content}</p>

          <Divider hidden section />

          <div className="button-action-group">
            <DeletePostButton id={id} className="post-action-button" />

            <Button
              className="post-action-button"
              onClick={() => {}}
              animated="vertical"
              primary
            >
              <Button.Content visible>
                <Icon name="edit" />
              </Button.Content>
              <Button.Content hidden>Edit</Button.Content>
            </Button>
          </div>
        </Container>
      </LoaderWrapper>
    </Segment>
  );
}

export default AppPostBody;
