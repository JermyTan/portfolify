import React from "react";
import { Segment, Loader } from "semantic-ui-react";

type Props = {
  children: React.ReactNode;
  isLoading: boolean;
  loadingMessage?: string;
  showDefaultMessage?: boolean;
  defaultMessage?: string;
};

function LoaderWrapper({
  children,
  isLoading,
  loadingMessage,
  showDefaultMessage,
  defaultMessage,
}: Props) {
  return isLoading || showDefaultMessage ? (
    <Segment basic placeholder textAlign="center">
      {isLoading && (
        <Loader size="massive" active inline content={loadingMessage} />
      )}
      {!isLoading && showDefaultMessage && <h2>{defaultMessage}</h2>}
    </Segment>
  ) : (
    <>{children}</>
  );
}

export default LoaderWrapper;
