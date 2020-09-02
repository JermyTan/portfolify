import React from "react";
import { Header, Image, Divider, Button, Icon } from "semantic-ui-react";
import { format } from "date-fns";
import DeletePostButton from "../delete-post-button";

type Props = {
  id: number;
  image?: string;
  title?: string;
  createdAt?: number;
  content?: string;
  onEdit: () => void;
};

function PostViewer({ id, image, title, createdAt, content, onEdit }: Props) {
  return (
    <>
      <Image className="preview-image" src={image} rounded centered />
      <Divider hidden />
      <Header as="h1">{title}</Header>
      {createdAt && (
        <h4>Posted at: {format(createdAt * 1000, "d MMM yyyy h.mmaaaa")}</h4>
      )}

      <Divider />

      <p className="post-body-content">{content}</p>

      <Divider hidden section />

      <div className="action-button-group justify-end">
        <DeletePostButton id={id} className="post-action-button" />

        <Button
          className="post-action-button"
          onClick={onEdit}
          animated="vertical"
          primary
        >
          <Button.Content visible>
            <Icon name="edit" />
          </Button.Content>
          <Button.Content hidden>Edit</Button.Content>
        </Button>
      </div>
    </>
  );
}

export default PostViewer;
