import React from "react";
import { Segment, Header, Divider } from "semantic-ui-react";
import CreatePostButton from "../create-post-button";
import "./index.scss";

function AppHeader() {
  return (
    <div id="header-section">
      <Segment className="border-section" vertical />
      <Segment className="main-section" placeholder vertical textAlign="center">
        <Header className="title infinite-bob">Portfolify</Header>
        <Divider className="divider" section />
        <CreatePostButton />
      </Segment>
    </div>
  );
}

export default AppHeader;
