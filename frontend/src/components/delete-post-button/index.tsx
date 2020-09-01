import React, { useState } from "react";
import { Button, Icon, Modal, Header } from "semantic-ui-react";
import useAxios from "axios-hooks";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

type Props = {
  id: number;
  className?: string;
};

function DeletePostButton({ className, id }: Props) {
  const history = useHistory();
  const [isDeleting, setDeleting] = useState(false);
  const [{ loading }, deletePost] = useAxios(
    {
      url: `/posts/`,
      method: "delete",
      baseURL: "http://localhost:8000",
    },
    { manual: true }
  );

  const onDelete = async () => {
    try {
      await deletePost({ data: { ids: [id] } });
      toast.success("The post has been successfully deleted.");
      setDeleting(false);
      history.push("/");
    } catch (error) {
      console.log(error);
      toast.error("An unkown error has occurred.");
    }
  };

  return (
    <Modal
      basic
      onClose={() => setDeleting(false)}
      onOpen={() => setDeleting(true)}
      open={isDeleting}
      size="tiny"
      trigger={
        <Button className={className} animated="vertical" color="red">
          <Button.Content visible>
            <Icon name="trash alternate" />
          </Button.Content>
          <Button.Content hidden>Delete</Button.Content>
        </Button>
      }
    >
      <Header icon>
        <Icon name="trash alternate outline" />
        Delete Post
      </Header>

      <Modal.Content>
        <Modal.Description>
          Are you sure you want to delete this post?
        </Modal.Description>
      </Modal.Content>

      <Modal.Actions>
        <Button
          onClick={() => setDeleting(false)}
          basic
          color="red"
          inverted
          icon="remove"
          content="No"
        />
        <Button
          onClick={onDelete}
          loading={loading}
          basic
          color="green"
          inverted
          icon="checkmark"
          content="Yes"
        />
      </Modal.Actions>
    </Modal>
  );
}

export default DeletePostButton;
