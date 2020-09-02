import React, { useState, useEffect } from "react";
import Cropper from "react-easy-crop";
import { Area, Point } from "react-easy-crop/types";
import "./index.scss";

const defaultAspectRatio = 4 / 3;

type Props = {
  dataUrl: string;
  fixedAspectRatio?: number;
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

function ImageCropper({ dataUrl, fixedAspectRatio }: Props) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    console.log(croppedArea, croppedAreaPixels);
  };

  useEffect(() => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);

    inputAspectRatio = fixedAspectRatio ?? defaultAspectRatio;
    scaleHeight();
  }, [dataUrl, inputAspectRatio]);

  return (
    <div id="image-cropper">
      <Cropper
        image={dataUrl}
        crop={crop}
        zoom={zoom}
        aspect={fixedAspectRatio}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={onCropComplete}
        showGrid={false}
      />
    </div>
  );
}

export default ImageCropper;
