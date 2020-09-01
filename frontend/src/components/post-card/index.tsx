import React, { useState } from "react";
import { Card, Image } from "semantic-ui-react";
import { format } from "date-fns";

type Props = {
  id: number;
  title: string;
  created_at: number;
  image_url?: string;
};

function PostCard({ id, title, created_at, image_url }: Props) {
  return (
    <Card onClick={() => {}} fluid className="hvr-bob" raised centered>
      <Image src={image_url} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Meta>
          Posted at: {format(created_at, "d MMM yyyy h.mmaaaa")}
        </Card.Meta>
      </Card.Content>
    </Card>
  );
}

export default PostCard;
