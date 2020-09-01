import React from "react";
import "./App.scss";
import AppHeader from "./components/app-header";
import AppBody from "./components/app-body";
import PostProvider from "./context-providers/PostProvider";

function App() {
  return (
    <PostProvider>
      <div className="App">
        <AppHeader />
        <AppBody />
      </div>
    </PostProvider>
  );
}

export default App;
