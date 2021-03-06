import React from "react";
import { Header, Image, Divider, Button, Icon } from "semantic-ui-react";
import { format } from "date-fns";
import DeletePostButton from "../delete-post-button";
import Linkify from "linkifyjs/react";
import defaultImage from "../../assets/portfolify-16:9.png";

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
      <Image
        className="preview-image"
        src={image ?? defaultImage}
        rounded
        centered
      />
      <Divider hidden />
      <Header as="h1">{title}</Header>
      {createdAt && (
        <h4>Posted at: {format(createdAt * 1000, "d MMM yyyy h.mmaaaa")}</h4>
      )}

      <Divider />

      <Linkify tagName="div">
        <p className="post-body-content">{content}</p>
      </Linkify>

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
