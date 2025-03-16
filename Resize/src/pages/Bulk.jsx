import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import New from "../components/New";
import Procedure from "../components/Procedure";
import CustomCheckBox from "../components/CustomCheckBox";
import { FaArrowRight } from "react-icons/fa";
import JSZip from "jszip";

const Bulk = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [processedImages, setProcessedImages] = useState([]);
  const [resizeMode, setResizeMode] = useState("percentage");
  const [selectedPercentage, setSelectedPercentage] = useState("50% Smaller");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [compressionLevel, setCompressionLevel] = useState("Medium");
  const [useMaxSize, setUseMaxSize] = useState(false);
  const [maxSize, setMaxSize] = useState(1024); // in KB
  const [isProcessing, setIsProcessing] = useState(false);

  // Percentage mapping
  const percentageMap = {
    "75% Smaller": 0.25,
    "50% Smaller": 0.5,
    "25% Smaller": 0.75,
    "100%": 1,
    "25% Larger": 1.25,
    "50% Larger": 1.5,
    "75% Larger": 1.75
  };

  useEffect(() => {
    const savedUploaded = JSON.parse(localStorage.getItem("bulkUploads")) || [];
    const savedProcessed = JSON.parse(localStorage.getItem("bulkProcessed")) || [];
    setUploadedImages(savedUploaded);
    setProcessedImages(savedProcessed);
  }, []);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const readers = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve({
          dataUrl: e.target.result,
          name: file.name,
          type: file.type
        });
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then(data => {
      const newImages = [...uploadedImages, ...data];
      setUploadedImages(newImages);
      localStorage.setItem("bulkUploads", JSON.stringify(newImages));
    });
  };

  const processImages = async () => {
    if (!uploadedImages.length) return;
    setIsProcessing(true);

    const processed = await Promise.all(uploadedImages.map(async (image) => {
      const img = await loadImage(image.dataUrl);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Calculate new dimensions
      let newWidth, newHeight;
      if (resizeMode === "percentage") {
        const scale = percentageMap[selectedPercentage];
        newWidth = img.width * scale;
        newHeight = img.height * scale;
      } else {
        newWidth = width || img.width;
        newHeight = height || img.height;
        
        // Maintain aspect ratio if only one dimension provided
        if (!width || !height) {
          const ratio = img.width / img.height;
          if (!width) newWidth = newHeight * ratio;
          if (!height) newHeight = newWidth / ratio;
        }
      }

      canvas.width = newWidth;
      canvas.height = newHeight;
      ctx.drawImage(img, 0, 0, newWidth, newHeight);

      // Compression settings
      let quality = getQuality();
      let mimeType = image.type.includes("png") ? "image/png" : "image/jpeg";
      let dataUrl = canvas.toDataURL(mimeType, quality);

      // Handle max size
      if (useMaxSize) {
        let currentSize = dataUrl.length * 0.75; // Approximate KB
        while (currentSize > maxSize && quality > 0.1) {
          quality -= 0.1;
          dataUrl = canvas.toDataURL(mimeType, quality);
          currentSize = dataUrl.length * 0.75;
        }
      }

      return {
        ...image,
        processed: dataUrl,
        size: Math.round(dataUrl.length * 0.75 / 1024)
      };
    }));

    setProcessedImages(processed);
    localStorage.setItem("bulkProcessed", JSON.stringify(processed));
    setIsProcessing(false);
  };

  const getQuality = () => {
    switch(compressionLevel) {
      case "Strong": return 0.6;
      case "Medium": return 0.8;
      case "Light": return 0.9;
      default: return 0.8;
    }
  };

  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  };

  const handleDownloadAll = async () => {
    const zip = new JSZip();
    processedImages.forEach((img) => {
      const base64Data = img.processed.split(",")[1];
      zip.file(`resized-${img.name}`, base64Data, { base64: true });
    });

    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);
    const link = document.createElement("a");
    link.href = url;
    link.download = "resized-images.zip";
    link.click();

    // Cleanup
    URL.revokeObjectURL(url);
    localStorage.removeItem("bulkUploads");
    localStorage.removeItem("bulkProcessed");
    setUploadedImages([]);
    setProcessedImages([]);
  };

  return (
    <>
      <section className="bg-dark px-4 flex flex-col items-start justify-between space-y-6">
        <div className="flex flex-col">
          <div className="w-full">
            <h1 className="text-3xl font-bold text-white">Bulk resize images</h1>
            <p className="mt-4 text-lg text-text">
              Resize and compress multiple images at once with a few simple clicks.
            </p>
          </div>

          <div className="bg-darkLight w-full h-[250px] rounded-lg flex flex-col items-center justify-center p-6">
            <label className="cursor-pointer rounded-lg bg-transparent border border-border flex flex-col items-center justify-center gap-3 text-white px-5 py-3 w-full h-full">
              <img src="/images/icons/upload-icon.svg" alt="upload" className="w-[4rem] h-auto" />
              <span className="text-xl font-semibold flex flex-col items-center">
                Upload your images here 
                <span className="text-secondary text-lg">up to 20 images</span>
              </span>
              <input
                type="file"
                multiple
                onChange={handleImageUpload}
                className="hidden"
                accept="image/*"
              />
            </label>
          </div>
        </div>

        <div className="flex items-start flex-col justify-center md:ml-[60%] space-y-6">
          <div className="flex items-center gap-[3rem]">
            <h4 className="text-white font-semibold text-xl">Resize</h4>
            <select 
              value={selectedPercentage}
              onChange={(e) => setSelectedPercentage(e.target.value)}
              className="text-text bg-dark border border-border px-6 py-3 rounded-lg"
              disabled={resizeMode === "pixel"}
            >
              {Object.keys(percentageMap).map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-center gap-4 ml-[-.5rem]">
            <CustomCheckBox 
              checked={resizeMode === "pixel"}
              onChange={(e) => setResizeMode(e.target.checked ? "pixel" : "percentage")}
            />
            <p className="text-white text-lg m-0">Resize by pixel</p>
          </div>

          {resizeMode === "pixel" && (
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                placeholder="Width"
                className="text-text bg-dark border border-border px-4 py-2 rounded-lg"
              />
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Height"
                className="text-text bg-dark border border-border px-4 py-2 rounded-lg"
              />
            </div>
          )}

          <div className="flex items-center gap-[3rem]">
            <h4 className="text-white font-semibold text-xl">Compression</h4>
            <select 
              value={compressionLevel}
              onChange={(e) => setCompressionLevel(e.target.value)}
              className="text-text bg-dark border border-border px-6 py-3 rounded-lg"
            >
              <option value="Strong">Strong</option>
              <option value="Medium">Medium</option>
              <option value="Light">Light</option>
            </select>
          </div>

          <div className="flex items-center justify-center gap-4 ml-[-.5rem]">
            <CustomCheckBox 
              checked={useMaxSize}
              onChange={(e) => setUseMaxSize(e.target.checked)}
            />
            <p className="text-white text-lg m-0">Set max size</p>
          </div>

          {useMaxSize && (
            <div className="flex items-center gap-4">
              <input
                type="number"
                value={maxSize}
                onChange={(e) => setMaxSize(e.target.value)}
                className="text-text bg-dark border border-border px-4 py-2 rounded-lg w-24"
                placeholder="KB"
              />
              <span className="text-white">KB</span>
            </div>
          )}

          <button 
            onClick={processedImages.length ? handleDownloadAll : processImages}
            disabled={isProcessing}
            className="text-white flex items-center text-lg justify-center px-8 py-2 bg-secondary hover:bg-tertiary transition-all rounded-lg w-full"
          >
            {isProcessing ? "Processing..." : (processedImages.length ? "Download All" : "Resize")}
          </button>
        </div>
      </section>

      {processedImages.length > 0 && (
        <section className="bg-dark px-4 py-6">
          <h2 className="text-white text-2xl mb-6">Processed Images ({processedImages.length})</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {processedImages.map((img, index) => (
              <div key={index} className="bg-darkLight rounded-lg p-4">
                <img src={img.processed} alt={`processed-${index}`} className="w-full h-32 object-cover mb-3 rounded" />
                <div className="text-text text-sm">
                  <p>{img.size}KB</p>
                  <p>{Math.round(img.processed.width)}x{Math.round(img.processed.height)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <New />
      <Procedure />

      {/* CROP AND TOOLS */}
      <section className="flex items-start flex-col justify-center space-y-4 px-4 mb-[-10rem]">
        <h1 className="text-white text-2xl">Bulk image resizing</h1>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-1 md:gap-[4rem]">
          <p className="text-xl text-text">
            Resize.com makes bulk image resizing easy. With an intuitive interface, it allows you to resize multiple images
            at once to specific dimensions, ensuring consistency across your visuals. Simultaneously, you can also compress 
            images and save on file size.
          </p>
          <p className="text-xl text-text">
            As an entirely online solution, there’s no need to download or install any software, 
            making it accessible from any device with an internet connection. Best of all, Resize.com 
            is completely free to use, making it the perfect tool for individuals and professionals seeking 
            a fast, reliable, and cost-effective way to resize images in bulk.
          </p>
        </div>
      </section>

      {/* TOOLS */}
      <section className="flex flex-col justify-center px-4 mb-[-1rem]">
        <h1 className="text-white md:text-2xl text-xl mb-8">More tools and features</h1>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 content-center">
          <div className="p-5 flex flex-col space-y-3 rounded-md border border-border">
            {/* image container */}
            <div className="w-[3rem] h-auto rounded-full border border-secondary flex justify-center">
            <img src="/images/icons/crop-icon.svg" alt="resize-icon" className="w-full h-auto p-3" />
            </div>

            {/* text content */}
            <h1 className="text-white font-bold md:text-xl text-lg">
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

          <div className="p-5 flex flex-col space-y-3 rounded-md border border-border">
            {/* image container */}
            <div className="w-[3rem] h-auto rounded-full border border-secondary flex justify-center">
            <img src="/images/icons/resize-icon.svg" alt="resize-icon" className="w-full h-auto p-3" />
            </div>

            {/* text content */}
            <h1 className="text-white font-bold md:text-xl text-lg">
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

          <div className="p-5 flex flex-col space-y-3 rounded-md border border-border">
            {/* image container */}
            <div className="w-[3rem] h-auto rounded-full border border-secondary flex justify-center">
            <img src="/images/icons/compress-icon.svg" alt="resize-icon" className="w-full h-auto p-3" />
            </div>

            {/* text content */}
            <h1 className="text-white font-bold md:text-xl text-lg">
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

          <div className="p-5 flex flex-col space-y-3 rounded-md border border-border">
            {/* image container */}
            <div className="w-[3rem] h-auto rounded-full border border-secondary flex justify-center">
            <img src="/images/icons/convert-icon.svg" alt="resize-icon" className="w-full h-auto p-3" />
            </div>

            {/* text content */}
            <h1 className="text-white font-bold md:text-xl text-lg">
            <Link 
            to={'/convert'}
            className="flex items-center gap-2 transition-all hover:text-secondary"
            >
                Convert
                <FaArrowRight />
            </Link>
            </h1>
            <p className="text-text">Convert your images to JPG, PPNG, and WEBP.</p>
          </div>

          <div className="p-5 flex flex-col space-y-3 rounded-md border border-border">
            {/* image container */}
            <div className="w-[3rem] h-auto rounded-full border border-secondary flex justify-center">
            <img src="/images/icons/watermark-icon.svg" alt="resize-icon" className="w-full h-auto p-3" />
            </div>

            {/* text content */}
            <h1 className="text-white font-bold md:text-xl text-lg">
            <Link 
            to={'/watermark'}
            className="flex items-center gap-2 transition-all hover:text-secondary"
            >
                Watermark
                <FaArrowRight />
            </Link>
            </h1>
            <p className="text-text">Showcase your logo and protect your work.</p>
          </div>

          <div className="p-5 flex flex-col space-y-3 rounded-md border border-border">
            {/* image container */}
            <div className="w-[3rem] h-auto rounded-full border border-secondary flex justify-center">
            <img src="/images/icons/text-icon.svg" alt="resize-icon" className="w-full h-auto p-3" />
            </div>

            {/* text content */}
            <h1 className="text-white font-bold md:text-xl text-lg">
            <Link 
            to={'/add-text/'}
            className="flex items-center gap-2 transition-all hover:text-secondary"
            >
                Add text
                <FaArrowRight />
            </Link>
            </h1>
            <p className="text-text">Add text to your images to tell a story.</p>
          </div>

          <div className="p-5 flex flex-col space-y-3 rounded-md border border-border">
            {/* image container */}
            <div className="w-[3rem] h-auto rounded-full border border-secondary flex justify-center">
            <img src="/images/icons/colors-icon.svg" alt="resize-icon" className="w-full h-auto p-3" />
            </div>

            {/* text content */}
            <h1 className="text-white font-bold md:text-xl text-lg">
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

          <div className="p-5 flex flex-col space-y-3 rounded-md border border-border">
            {/* image container */}
            <div className="w-[3rem] h-auto rounded-full border border-secondary flex justify-center">
            <img src="/images/icons/mirror-icon.svg" alt="resize-icon" className="w-full h-auto p-3" />
            </div>

            {/* text content */}
            <h1 className="text-white font-bold md:text-xl text-lg">
            <Link 
            to={'/mirror-flip'}
            className="flex items-center gap-2 transition-all hover:text-secondary"
            >
                Mirror and flip
                <FaArrowRight />
            </Link>
            </h1>
            <p className="text-text">Reflect your images vertically or horizontally.</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Bulk
