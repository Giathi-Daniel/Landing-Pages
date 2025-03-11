import { Link } from "react-router-dom"

import { useState, useEffect, useRef } from "react";
import New from "../components/New";
import Procedure from "../components/Procedure";
import { FaArrowRight } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";

const MirrorFlip = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);

  // Load images from localStorage on mount
  useEffect(() => {
    const savedOriginal = localStorage.getItem("mirrorOriginal");
    const savedProcessed = localStorage.getItem("mirrorProcessed");
    if (savedOriginal) setOriginalImage(savedOriginal);
    if (savedProcessed) setProcessedImage(savedProcessed);
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalImage(e.target.result);
      localStorage.setItem("mirrorOriginal", e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const applyTransformation = async (type) => {
    if (!originalImage) return;
    setIsProcessing(true);

    try {
      const img = await loadImage(processedImage || originalImage);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Determine output format based on original image
      const isPNG = originalImage.startsWith("data:image/png");
      const mimeType = isPNG ? "image/png" : "image/jpeg";

      switch (type) {
        case "horizontal":
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.translate(img.width, 0);
          ctx.scale(-1, 1);
          break;
        case "vertical":
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.translate(0, img.height);
          ctx.scale(1, -1);
          break;
        case "rotate90":
          canvas.width = img.height;
          canvas.height = img.width;
          ctx.translate(img.height, 0);
          ctx.rotate(Math.PI / 2);
          break;
        case "rotate180":
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.translate(img.width, img.height);
          ctx.rotate(Math.PI);
          break;
        case "rotate270":
          canvas.width = img.height;
          canvas.height = img.width;
          ctx.translate(0, img.width);
          ctx.rotate(-Math.PI / 2);
          break;
      }

      ctx.drawImage(img, 0, 0);
      const dataUrl = canvas.toDataURL(mimeType, isPNG ? undefined : 0.9);
      
      setProcessedImage(dataUrl);
      localStorage.setItem("mirrorProcessed", dataUrl);
    } catch (error) {
      console.error("Error processing image:", error);
    }
    setIsProcessing(false);
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
    link.download = `transformed-${Date.now()}.${processedImage.includes("png") ? "png" : "jpg"}`;
    link.href = processedImage;
    link.click();

    // Clear storage and state
    localStorage.removeItem("mirrorOriginal");
    localStorage.removeItem("mirrorProcessed");
    setOriginalImage(null);
    setProcessedImage(null);
  };

  return (
    <>
      <section className="relative bg-dark px-4 border border-b-borderLight border-t-0 border-l-0 flex flex-col md:flex-row items-center justify-between h-[87vh]">
        <div className="w-full">
          <p className="flex items-center px-3 py-1 text-sm text-white rounded-lg bg-secondary w-fit">
            Editor feature
          </p>
          <h1 className="text-5xl mt-[-1rem] font-bold text-white">
            Mirror and flip your images
          </h1>
          <p className="mt-6 text-xl text-text md:max-w-lg">
            Express your creativity with a few clicks. Reflect and flip an image with our easy-to-use editor.
          </p>
          <div className="flex items-center justify-start gap-3 mb-6">
            {!originalImage ? (
              <>
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="flex items-center justify-center gap-2 px-5 py-2 text-white transition-all bg-gray-800 rounded-lg hover:bg-border"
                >
                  Get started
                  <FaArrowRight />
                </button>
                <a href="#how-to" className="flex items-center justify-center gap-2 px-5 py-2 text-white transition-all bg-transparent rounded-lg hover:bg-border">
                  Learn how
                  <FiChevronDown />
                </a>
              </>
            ) : (
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => applyTransformation("horizontal")}
                  className="px-4 py-2 text-white transition-all rounded-lg bg-secondary hover:bg-tertiary"
                  disabled={isProcessing}
                >
                  Flip Horizontal
                </button>
                <button
                  onClick={() => applyTransformation("vertical")}
                  className="px-4 py-2 text-white transition-all rounded-lg bg-secondary hover:bg-tertiary"
                  disabled={isProcessing}
                >
                  Flip Vertical
                </button>
                <button
                  onClick={() => applyTransformation("rotate90")}
                  className="px-4 py-2 text-white transition-all rounded-lg bg-secondary hover:bg-tertiary"
                  disabled={isProcessing}
                >
                  Rotate 90°
                </button>
                <button
                  onClick={() => applyTransformation("rotate180")}
                  className="px-4 py-2 text-white transition-all rounded-lg bg-secondary hover:bg-tertiary"
                  disabled={isProcessing}
                >
                  Rotate 180°
                </button>
                <button
                  onClick={() => applyTransformation("rotate270")}
                  className="px-4 py-2 text-white transition-all rounded-lg bg-secondary hover:bg-tertiary"
                  disabled={isProcessing}
                >
                  Rotate 270°
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Image Preview Section */}
        <div className="bg-darkLight w-full h-[450px] rounded-lg flex flex-col items-center justify-center p-8">
          {processedImage ? (
            <div className="relative w-full h-full group">
              <img src={processedImage} alt="processed" className="object-contain w-full h-full" />
              <button
                onClick={handleDownload}
                className="absolute px-4 py-2 text-white transition-opacity rounded-lg opacity-0 bottom-4 right-4 bg-secondary hover:bg-tertiary group-hover:opacity-100"
              >
                Download
              </button>
            </div>
          ) : originalImage ? (
            <div className="relative w-full h-full group">
              <img src={originalImage} alt="original" className="object-contain w-full h-full" />
              <button
                onClick={() => {
                  setOriginalImage(null);
                  localStorage.removeItem("mirrorOriginal");
                }}
                className="absolute px-3 py-1 text-white bg-red-500 rounded-lg top-4 right-4 hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-full gap-3 px-5 py-3 text-white bg-transparent border rounded-lg cursor-pointer border-border">
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

      <New />
      <Procedure />

      {/* HOW-TO */}
      <section id="how-to" className="grid md:grid-cols-2 grid-cols-1 md:gap-6 gap-[3rem] py-10 px-4 mb-[-2rem]">
        <div className="md:w-[90%] w-full flex items-center justify-center">
          <img src="/images/mirror-flip.png" alt="features-image" className="border border-borderLight" />
        </div>
        <div className="flex flex-col items-center gap-6">
          <div className="space-y-4 md:space-y-3">
            <h1 className="text-xl font-semibold text-white">Mirror and flip images</h1>
            <p className="text-lg text-text">
                In photography, image mirroring is the process of reflecting an image across the vertical or horizontal axis. 
                If you flip the image horizontally, you will see a mirror reflection effect, while if you flip it vertically, 
                you will see an object&apos;s reflection in the water (also called a water reflection effect). The mirror effect often 
                adds a surreal feel to photos that captivates the viewer. Using our rotation tool, you can easily adjust the orientation
                of a photo. Rotate the image by 90 degrees to tilt it sideways or 180 degrees to turn it upside down.
            </p>
          </div>
          <div className="space-y-4 md:space-y-3">
            <h1 className="text-xl font-semibold text-white">How to mirror and flip</h1>
            <p className="text-lg text-text">
                Start by uploading your image. In the top section of the canvas, click on the 
                &quot;Flip horizontal icon. To flip it, click on the &quot;Rotation icon next to it. 
                For extra effects, take advantage of our free filters and editing tools. Once you are 
                ready, click the Resize button to download your image.
            </p>
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section className="flex flex-col justify-center px-4 mb-[-1rem]">
        <h1 className="mb-8 text-lg text-white md:text-xl">More tools and features</h1>

        <div className="grid content-center grid-cols-1 gap-4 lg:grid-cols-4 md:grid-cols-2">
          <div className="flex flex-col p-5 space-y-3 border rounded-md border-border">
            {/* image container */}
            <div className="w-[3rem] h-auto rounded-full border border-secondary flex justify-center">
            <img src="/images/icons/resize-icon.svg" alt="resize-icon" className="w-full h-auto p-3" />
            </div>

            {/* text content */}
            <h1 className="text-lg font-bold text-white md:text-xl">
            <Link 
            to={'/'}
            className="flex items-center gap-2 transition-all hover:text-secondary"
            >
                Resize
                <FaArrowRight />
            </Link>
            </h1>
            <p className="text-text">Resize your images to the perfect size.</p>
          </div>

          <div className="flex flex-col p-5 space-y-3 border rounded-md border-border">
            {/* image container */}
            <div className="w-[3rem] h-auto rounded-full border border-secondary flex justify-center">
            <img src="/images/icons/crop-icon.svg" alt="resize-icon" className="w-full h-auto p-3" />
            </div>

            {/* text content */}
            <h1 className="text-lg font-bold text-white md:text-xl">
            <Link 
            to={'/crop'}
            className="flex items-center gap-2 transition-all hover:text-secondary"
            >
                Crop
                <FaArrowRight />
            </Link>
            </h1>
            <p className="text-text">Resize your images to the perfect size.</p>
          </div>

          <div className="flex flex-col p-5 space-y-3 border rounded-md border-border">
            {/* image container */}
            <div className="w-[3rem] h-auto rounded-full border border-secondary flex justify-center">
            <img src="/images/icons/resize-icon.svg" alt="resize-icon" className="w-full h-auto p-3" />
            </div>

            {/* text content */}
            <h1 className="text-lg font-bold text-white md:text-xl">
            <Link 
            to={'/bulk'}
            className="flex items-center gap-2 transition-all hover:text-secondary"
            >
                Bulk resize
                <FaArrowRight />
            </Link>
            </h1>
            <p className="text-text">Resize multiple images at once with a few simple clicks.</p>
          </div>

          <div className="flex flex-col p-5 space-y-3 border rounded-md border-border">
            {/* image container */}
            <div className="w-[3rem] h-auto rounded-full border border-secondary flex justify-center">
            <img src="/images/icons/compress-icon.svg" alt="resize-icon" className="w-full h-auto p-3" />
            </div>

            {/* text content */}
            <h1 className="text-lg font-bold text-white md:text-xl">
            <Link 
            to={'/compress'}
            className="flex items-center gap-2 transition-all hover:text-secondary"
            >
                Compress
                <FaArrowRight />
            </Link>
            </h1>
            <p className="text-text">Set the quality and reduce the size of your images.</p>
          </div>

          <div className="flex flex-col p-5 space-y-3 border rounded-md border-border">
            {/* image container */}
            <div className="w-[3rem] h-auto rounded-full border border-secondary flex justify-center">
            <img src="/images/icons/convert-icon.svg" alt="resize-icon" className="w-full h-auto p-3" />
            </div>

            {/* text content */}
            <h1 className="text-lg font-bold text-white md:text-xl">
            <Link 
            to={'/convert'}
            className="flex items-center gap-2 transition-all hover:text-secondary"
            >
                Convert
                <FaArrowRight />
            </Link>
            </h1>
            <p className="text-text">Convert your images to JPG, PNG, and WEBP.</p>
          </div>

          <div className="flex flex-col p-5 space-y-3 border rounded-md border-border">
            {/* image container */}
            <div className="w-[3rem] h-auto rounded-full border border-secondary flex justify-center">
            <img src="/images/icons/watermark-icon.svg" alt="resize-icon" className="w-full h-auto p-3" />
            </div>

            {/* text content */}
            <h1 className="text-lg font-bold text-white md:text-xl">
            <Link 
            to={'/watermark/'}
            className="flex items-center gap-2 transition-all hover:text-secondary"
            >
                Watermark
                <FaArrowRight />
            </Link>
            </h1>
            <p className="text-text">Showcase your logo and protect your work.</p>
          </div>

          <div className="flex flex-col p-5 space-y-3 border rounded-md border-border">
            {/* image container */}
            <div className="w-[3rem] h-auto rounded-full border border-secondary flex justify-center">
            <img src="/images/icons/text-icon.svg" alt="resize-icon" className="w-full h-auto p-3" />
            </div>

            {/* text content */}
            <h1 className="text-lg font-bold text-white md:text-xl">
            <Link 
            to={'/add-text'}
            className="flex items-center gap-2 transition-all hover:text-secondary"
            >
                Add text
                <FaArrowRight />
            </Link>
            </h1>
            <p className="text-text">Add text to your images to tell a story.</p>
          </div>

          <div className="flex flex-col p-5 space-y-3 border rounded-md border-border">
            {/* image container */}
            <div className="w-[3rem] h-auto rounded-full border border-secondary flex justify-center">
                <img src="/images/icons/colors-icon.svg" alt="resize-icon" className="w-full h-auto p-3" />
            </div>

            {/* text content */}
            <h1 className="text-lg font-bold text-white md:text-xl">
            <Link 
                to={'/black-white'}
                className="flex items-center gap-2 transition-all hover:text-secondary"
            >
                Black and white
                <FaArrowRight />
            </Link>
            </h1>
            <p className="text-text">Convert your images to black and white for a vintage look.</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default MirrorFlip
