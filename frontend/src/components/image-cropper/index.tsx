import React, { useState, useEffect, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Area, Point } from "react-easy-crop/types";
import "./index.scss";
import { getCroppedImage } from "../../utils/image-utils";
import { Button, Divider } from "semantic-ui-react";
//@ts-ignore
import Slider from "semantic-ui-react-slider";

const defaultAspectRatio = 4 / 3;

type Props = {
  image: string;
  fixedAspectRatio?: number;
  onCropImage: (image: string) => void;
  onCancel?: () => void;
  enableRotation?: boolean;
};

let inputAspectRatio: number = defaultAspectRatio;

const scaleHeight = () => {
  const imageCropper = document.getElementById("image-cropper");

  if (!imageCropper) {
    return;
  }

  imageCropper.style.height = `${
    imageCropper.offsetWidth / inputAspectRatio
  }px`;
};

window.addEventListener("resize", scaleHeight);

function ImageCropper({
  image,
  fixedAspectRatio,
  onCropImage,
  enableRotation = false,
  onCancel,
}: Props) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixes] = useState<Area>();
  const reset = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
  };

  useEffect(() => {
    reset();
    inputAspectRatio = fixedAspectRatio ?? defaultAspectRatio;
    scaleHeight();
  }, [image, fixedAspectRatio]);

  const onCropConfirm = async () => {
    if (!croppedAreaPixels) {
      return;
    }

    try {
      const croppedImage =
        (await getCroppedImage(image, croppedAreaPixels, rotation)) ?? "";
      onCropImage(croppedImage);
    } catch (error) {
      console.log(error);
    }
  };

  const onRotationChange = useCallback(
    (rotation: number) => {
      enableRotation && setRotation(rotation);
    },
    [enableRotation]
  );

  return (
    <div>
      <div id="image-cropper">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={fixedAspectRatio}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={(croppedArea, croppedAreaPixels) =>
            setCroppedAreaPixes(croppedAreaPixels)
          }
          showGrid={false}
          minZoom={0.75}
          restrictPosition={false}
          rotation={rotation}
          onRotationChange={onRotationChange}
        />
      </div>

      {enableRotation && (
        <>
          <Divider />
          <Slider
            sliderMinValue={0}
            sliderMaxValue={360}
            onSliderValuesChange={(minValue: number, maxValue: number) =>
              onRotationChange(maxValue)
            }
            selectedMinValue={0}
            selectedMaxValue={rotation}
          />
        </>
      )}

      <Divider />
      <div className="action-button-group justify-center">
        {onCancel && (
          <Button
            type="button"
            icon="close"
            color="red"
            content="Cancel"
            onClick={onCancel}
          />
        )}
        <Button
          type="button"
          icon="repeat"
          secondary
          content="Reset"
          onClick={reset}
        />
        <Button
          type="button"
          icon="checkmark"
          color="green"
          content="Confirm"
          onClick={onCropConfirm}
        />
      </div>
    </div>
  );
}

export default ImageCropper;
