import React from "react";
import { Button, Icon } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

function HomeButton() {
  const history = useHistory();

  return (
    <Button onClick={() => history.push("/")} animated="fade" primary fluid>
      <Button.Content visible>
        <Icon name="home" />
      </Button.Content>
      <Button.Content hidden>Back to home</Button.Content>
    </Button>
  );
}

export default HomeButton;
