import { useState, useRef } from "react";
import New from "../components/New";
import Tools from "../components/Tools";
import Procedure from "../components/Procedure";
import Faqs from "../components/Faqs";
import { FaArrowRight } from "react-icons/fa";
import { CiVideoOn } from "react-icons/ci";

const Home = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [resizedImage, setResizedImage] = useState(null);
  const [resizeMode, setResizeMode] = useState("pixel");
  const [dimensions, setDimensions] = useState({ width: "", height: "" });
  const [percentage, setPercentage] = useState(100);
  const [socialPreset, setSocialPreset] = useState("instagram");
  const fileInputRef = useRef(null);

  const socialMediaPresets = {
    instagram: { width: 1080, height: 1080 },
    facebook: { width: 1200, height: 630 },
    twitter: { width: 1200, height: 675 },
    linkedin: { width: 1200, height: 627 },
    pinterest: { width: 1000, height: 1500 },
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalImage(e.target.result);
      setResizedImage(null);
    };
    reader.readAsDataURL(file);
  };

  const resizeImage = async () => {
    if (!originalImage) return;

    const img = await loadImage(originalImage);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    let newWidth, newHeight;

    switch (resizeMode) {
      case "pixel":
        newWidth = parseInt(dimensions.width);
        newHeight = parseInt(dimensions.height);
        break;
      case "percentage":
        newWidth = img.width * (percentage / 100);
        newHeight = img.height * (percentage / 100);
        break;
      case "social": {
        const preset = socialMediaPresets[socialPreset];
        newWidth = preset.width;
        newHeight = preset.height;
        break;
      }
      default:
        return;
    }

    // Maintain aspect ratio if only one dimension is provided
    if (resizeMode === "pixel" && (!dimensions.width || !dimensions.height)) {
      const aspectRatio = img.width / img.height;
      if (!dimensions.width) {
        newWidth = newHeight * aspectRatio;
      } else {
        newHeight = newWidth / aspectRatio;
      }
    }

    canvas.width = newWidth;
    canvas.height = newHeight;
    ctx.drawImage(img, 0, 0, newWidth, newHeight);

    const mimeType = originalImage.startsWith("data:image/png") 
      ? "image/png" 
      : "image/jpeg";
    const quality = mimeType === "image/png" ? undefined : 0.9;

    setResizedImage(canvas.toDataURL(mimeType, quality));
  };

  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.download = `resized-${Date.now()}.${resizedImage.includes("png") ? "png" : "jpg"}`;
    link.href = resizedImage;
    link.click();
  };

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative z-0 bg-dark px-4 border border-b-borderLight border-t-0 border-l-0 flex flex-col md:flex-row items-center justify-between h-[87vh]">
        <div className="w-full">
          <h1 className="text-5xl font-bold text-white">Resize your image</h1>
          <p className="mt-6 text-xl text-text md:max-w-lg">
            Our image editor is free, fun, and fast. Resize, compress, convert, and edit with a few simple clicks.
          </p>
          <div className="flex items-center justify-start gap-3 mb-6">
            <button 
              onClick={() => fileInputRef.current.click()}
              className="rounded-lg px-5 py-2 flex items-center justify-center bg-gray-800 text-white gap-2 hover:bg-border transition-all"
            >
              Get started
              <FaArrowRight />
            </button>
            <button className="rounded-lg px-5 py-2 flex items-center justify-center text-white gap-2 bg-transparent hover:bg-border transition-all">
              Learn how
              <CiVideoOn className="text-xl" />
            </button>
          </div>
        </div>

        {/* Image Preview Section */}
        <div className="bg-darkLight w-full h-[450px] rounded-lg flex flex-col items-center justify-center p-8">
          {resizedImage ? (
            <div className="relative w-full h-full group">
              <img src={resizedImage} alt="resized" className="w-full h-full object-contain" />
              <button
                onClick={handleDownload}
                className="absolute bottom-4 right-4 px-4 py-2 bg-secondary hover:bg-tertiary text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Download
              </button>
            </div>
          ) : originalImage ? (
            <div className="relative w-full h-full group">
              <img src={originalImage} alt="original" className="w-full h-full object-contain" />
              <button
                onClick={() => {
                  setOriginalImage(null);
                  setResizedImage(null);
                }}
                className="absolute top-4 right-4 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg"
              >
                Remove
              </button>
            </div>
          ) : (
            <label className="cursor-pointer rounded-lg bg-transparent border border-border flex flex-col items-center justify-center gap-3 text-white px-5 py-3 w-full h-full">
              <img src="/images/icons/upload-icon.svg" alt="upload" className="w-32 h-32" />
              <span className="text-lg">
                Drop an image or click <span className="text-secondary">here</span>
              </span>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
                accept="image/*"
              />
            </label>
          )}
        </div>
      </section>

      {/* Resize Controls */}
      {originalImage && (
        <section className="bg-dark px-4 py-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setResizeMode("pixel")}
                className={`px-4 py-2 rounded-lg ${
                  resizeMode === "pixel" ? "bg-secondary" : "bg-darkLight"
                } text-white`}
              >
                Resize by Pixel
              </button>
              <button
                onClick={() => setResizeMode("percentage")}
                className={`px-4 py-2 rounded-lg ${
                  resizeMode === "percentage" ? "bg-secondary" : "bg-darkLight"
                } text-white`}
              >
                Resize by Percentage
              </button>
              <button
                onClick={() => setResizeMode("social")}
                className={`px-4 py-2 rounded-lg ${
                  resizeMode === "social" ? "bg-secondary" : "bg-darkLight"
                } text-white`}
              >
                Social Media Presets
              </button>
            </div>

            {resizeMode === "pixel" && (
              <div className="flex gap-4">
                <input
                  type="number"
                  value={dimensions.width}
                  onChange={(e) => setDimensions({ ...dimensions, width: e.target.value })}
                  placeholder="Width (px)"
                  className="bg-darkLight text-white px-4 py-2 rounded-lg"
                />
                <input
                  type="number"
                  value={dimensions.height}
                  onChange={(e) => setDimensions({ ...dimensions, height: e.target.value })}
                  placeholder="Height (px)"
                  className="bg-darkLight text-white px-4 py-2 rounded-lg"
                />
              </div>
            )}

            {resizeMode === "percentage" && (
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="1"
                  max="500"
                  value={percentage}
                  onChange={(e) => setPercentage(e.target.value)}
                  className="w-full"
                />
                <span className="text-white">{percentage}%</span>
              </div>
            )}

            {resizeMode === "social" && (
              <select
                value={socialPreset}
                onChange={(e) => setSocialPreset(e.target.value)}
                className="bg-darkLight text-white px-4 py-2 rounded-lg"
              >
                {Object.keys(socialMediaPresets).map((platform) => (
                  <option key={platform} value={platform}>
                    {platform.charAt(0).toUpperCase() + platform.slice(1)} (
                    {socialMediaPresets[platform].width}x{socialMediaPresets[platform].height})
                  </option>
                ))}
              </select>
            )}

            <button
              onClick={resizeImage}
              className="px-6 py-2 bg-secondary text-white rounded-lg hover:bg-tertiary transition-all"
            >
              Apply Resize
            </button>
          </div>
        </section>
      )}

      <New />
      <Procedure />

      {/* FEATURES AND TOOLS */}
      <section className="border border-b-borderLight border-t-0 border-l-0 px-4 space-y-20">
        {/* ==== RESIZE FEATURES ==== */}
        <div className="flex flex-col justify-center">
          <h1 className="text-white md:text-xl text-lg mb-8">Resize features</h1>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-3 content-center">
            {/* ... existing feature cards ... */}
          </div>
        </div>

        {/* ==== TOOLS AND FEATURES ==== */}
        <Tools />
      </section>

      {/* FAQs */}
      <Faqs />
    </>
  );
};

export default Home;