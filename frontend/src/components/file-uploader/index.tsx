import React, { useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { Header, Icon } from "semantic-ui-react";
import "./index.scss";

type Props = {
  accept?: string | string[];
  multiple?: boolean;
  onAcceptFiles: (files: File[]) => void;
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

function FileUploader({ accept, multiple = true, onAcceptFiles }: Props) {
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({ accept, multiple, onDropAccepted: onAcceptFiles });

  const style = useMemo(
    () => ({
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragAccept, isFocused, isDragReject]
  );

  return (
    <div
      {...getRootProps({
        style,
        className: "upload-container",
      })}
    >
      <input {...getInputProps()} />
      <Header icon>
        <Icon name="image" />
        Drag and Drop, or Click to upload an image.
      </Header>
    </div>
  );
}

export default FileUploader;
