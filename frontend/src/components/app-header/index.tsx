import React from "react";
import { Segment, Header, Divider } from "semantic-ui-react";
import "./index.scss";

type Props = {
  mainButton: React.ReactNode;
};

function AppHeader({ mainButton }: Props) {
  return (
    <div id="header-section">
      <Segment className="border-section" vertical />
      <Segment className="main-section" placeholder vertical textAlign="center">
        <Header className="title infinite-bob">Portfolify</Header>
        <Divider className="divider" section />
        {mainButton}
      </Segment>
    </div>
  );
}

export default AppHeader;
