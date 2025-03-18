import { useState } from "react";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const ImageCropper = () => {
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ unit: '%', inlineSize: 30, aspect: 1 });
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);
  
  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const getCroppedImg = () => {
    const imageElement = document.createElement('img');
    imageElement.src = image;

    imageElement.onload = () => {
      const canvas = document.createElement('canvas');
      const crop = getCrop();
      canvas.width = crop.width;
      canvas.height = crop.height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(
        imageElement,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        crop.width,
        crop.height
      );

      const base64Image = canvas.toDataURL('image/png');
      setCroppedImageUrl(base64Image);
    };
  };

  const getCrop = () => {
    const imageElement = document.createElement('img');
    imageElement.src = image;

    return {
      x: crop.x,
      y: crop.y,
      inlineSize: crop.width,
      blockSize: crop.height
    };
  };

  return (
    <div className="flex flex-col items-center p-4">
      <input type="file" accept="image/*" onChange={onSelectFile} className="mb-4" />
      {image && (
        <ReactCrop
          src={image}
          crop={crop}
          onImageLoaded={setImage}
          onComplete={setCrop}
          onChange={(newCrop) => setCrop(newCrop)}
        />
      )}
      <button
        onClick={getCroppedImg}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Crop Image
      </button>
      {croppedImageUrl && (
        <div className="mt-4">
          <img src={croppedImageUrl} alt="Cropped" />
          <a
            href={croppedImageUrl}
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
