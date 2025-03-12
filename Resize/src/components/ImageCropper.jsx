import { useState, useRef } from "react";
import Cropper from 'react-cropper';
import "cropperjs/dist/cropper.css";

const ImageCropper = () => {
  const [image, setImage] = useState(null);
  const [cropData, setCropData] = useState(null);
  const cropperRef = useRef(null);

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const getCropData = () => {
    if (cropperRef.current) {
      setCropData(cropperRef.current.cropper.getCroppedCanvas().toDataURL());
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <input type="file" accept="image/*" onChange={onSelectFile} className="mb-4" />
      {image && (
        <Cropper
          src={image}
          style={{ blockSize: 300, inlineSize: "100%" }}
          initialAspectRatio={1}
          guides={true}
          ref={cropperRef}
          viewMode={1}
          background={false}
          responsive={true}
          autoCropArea={1}
        />
      )}
      <button
        onClick={getCropData}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Crop Image
      </button>
      {cropData && (
        <div className="mt-4">
          <img src={cropData} alt="Cropped" />
          <a
            href={cropData}
            download="cropped-image.png"
            className="block mt-2 bg-green-500 text-white px-4 py-2 rounded"
          >
            Download Cropped Image
          </a>
        </div>
      )}
    </div>
  );
};

export default ImageCropper;
