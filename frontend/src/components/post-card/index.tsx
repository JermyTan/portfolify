import React from "react";
import { Card, Image } from "semantic-ui-react";
import { format } from "date-fns";
import { useHistory } from "react-router-dom";
import defaultImage from "../../assets/portfolify-16:9.png";

type Props = {
  id: number;
  title: string;
  createdAt: number;
  imageUrl?: string;
};

function PostCard({ id, title, createdAt, imageUrl }: Props) {
  const history = useHistory();

  return (
    <Card
      onClick={() => history.push(`/post/${id}`)}
      fluid
      className="post-card hvr-bob"
      raised
      centered
    >
      <Image
        src={imageUrl ?? defaultImage}
        alt="Portfolify"
        wrapped
        ui={false}
      />
      <Card.Content className="post-content">
        <Card.Header>{title}</Card.Header>
        <Card.Meta>
          Posted at: {format(createdAt, "d MMM yyyy h.mmaaaa")}
        </Card.Meta>
      </Card.Content>
    </Card>
  );
}

export default PostCard;
