import React, { useState } from "react";
import FileUploader from "../file-uploader";
import ImageCropper from "../image-cropper";
import { parseDataUrlToEncodedData } from "../../utils/parser";

function ImageUploadCropper() {
  const [imageName, setImageName] = useState("");
  const [imageDataUrl, setImageDataUrl] = useState<string>();

  const onAcceptImageFile = (imageFiles: File[]) => {
    const imageFile = imageFiles?.[0];

    if (!imageFile) {
      return;
    }
    console.log(imageFile);
    setImageName(imageFile.name);

    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const dataUrl = e?.target?.result as string;
      dataUrl && setImageDataUrl(dataUrl);
    };
    fileReader.readAsDataURL(imageFile);
  };

  return imageDataUrl ? (
    <ImageCropper fixedAspectRatio={16 / 9} dataUrl={imageDataUrl} />
  ) : (
    <FileUploader
      onAcceptFiles={onAcceptImageFile}
      multiple={false}
      accept={["image/jpeg", "image/png", "image/gif"]}
    />
  );
}

export default ImageUploadCropper;
