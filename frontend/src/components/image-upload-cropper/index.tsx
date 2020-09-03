import React, { useState, useEffect } from "react";
import { Image, Divider, Button } from "semantic-ui-react";
import FileUploader from "../file-uploader";
import ImageCropper from "../image-cropper";

type ImageData = {
  name: string;
  data: string;
};

type Props = {
  onFinalizeImage?: (imageData: ImageData) => void;
  onChangeImage?: () => void;
  defaultImage?: string;
};

function ImageUploadCropper({
  onFinalizeImage,
  defaultImage = "",
  onChangeImage,
}: Props) {
  const [uploadedImageData, setUploadedImageData] = useState<ImageData>();
  const [croppedImage, setCroppedImage] = useState("");

  useEffect(() => {
    setCroppedImage(defaultImage);
  }, [defaultImage]);

  const onAcceptImageFile = (imageFiles: File[]) => {
    const imageFile = imageFiles?.[0];

    if (!imageFile) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const data = e?.target?.result as string;
      if (data) {
        setUploadedImageData({ name: imageFile.name, data });
      }
    };
    fileReader.readAsDataURL(imageFile);
  };

  const renderView = () => {
    if (croppedImage) {
      return (
        <div>
          <Image
            className="preview-image"
            src={croppedImage}
            rounded
            centered
          />
          <Divider />
          <div className="action-button-group justify-center">
            {uploadedImageData && (
              <Button
                type="button"
                secondary
                icon="arrow left"
                content="Back"
                onClick={() => setCroppedImage("")}
              />
            )}
            <Button
              type="button"
              primary
              icon="sync"
              content="Change"
              onClick={() => {
                setCroppedImage("");
                setUploadedImageData(undefined);
                onChangeImage?.();
              }}
            />
          </div>
        </div>
      );
    } else if (uploadedImageData) {
      return (
        <ImageCropper
          fixedAspectRatio={16 / 9}
          image={uploadedImageData.data}
          onCropImage={(image) => {
            setCroppedImage(image);
            onFinalizeImage?.({ ...uploadedImageData, data: image });
          }}
          onCancel={() => setUploadedImageData(undefined)}
        />
      );
    } else {
      return (
        <FileUploader
          onAcceptFiles={onAcceptImageFile}
          multiple={false}
          accept={["image/jpeg", "image/png", "image/gif"]}
        />
      );
    }
  };

  return renderView();
}

export default ImageUploadCropper;
