import React from "react";
import { Segment, Loader } from "semantic-ui-react";

type Props = {
  children: React.ReactNode;
  isLoading: boolean;
  loadingMessage?: string;
};

function LoaderWrapper({ children, isLoading, loadingMessage }: Props) {
  return isLoading ? (
    <Segment basic placeholder textAlign="center">
      <Loader size="massive" active inline content={loadingMessage} />
    </Segment>
  ) : (
    <>{children}</>
  );
}

export default LoaderWrapper;
