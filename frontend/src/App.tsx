import React from "react";
import { toast } from "react-toastify";
import PostProvider from "./context-providers/post-provider";
import Routes from "./routes";
import "react-toastify/dist/ReactToastify.min.css";
import "semantic-ui-css/semantic.min.css";
import "./App.scss";

toast.configure({
  position: "bottom-center",
  autoClose: 4000,
  limit: 3,
});

function App() {
  return (
    <PostProvider>
      <Routes />
    </PostProvider>
  );
}

export default App;
