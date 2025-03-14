import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import New from "../components/New";
import Procedure from "../components/Procedure";
import { FaArrowRight } from "react-icons/fa";

const AddText = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [textConfig, setTextConfig] = useState({
    content: "",
    fontSize: 32,
    color: "#ffffff",
    x: 0.5,
    y: 0.5,
    background: "",
    bgColor: "#00000080"
  });
  const canvasRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const savedImage = localStorage.getItem("textImage");
    const savedConfig = localStorage.getItem("textConfig");
    
    if (savedImage) setProcessedImage(savedImage);
    if (savedConfig) setTextConfig(JSON.parse(savedConfig));
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setOriginalImage(e.target.result);
      processImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const processImage = (src, text = textConfig) => {
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      const canvas = canvasRef.current;
      canvas.width = img.width;
      canvas.height = img.height;
      
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      
      if (text.content) {
        drawText(ctx, text, img.width, img.height);
      }
      
      const processed = canvas.toDataURL("image/png");
      setProcessedImage(processed);
      localStorage.setItem("textImage", processed);
    };
  };

  const drawText = (ctx, config, imgWidth, imgHeight) => {
    ctx.font = `${config.fontSize}px Arial`;
    ctx.fillStyle = config.color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Calculate position
    const x = imgWidth * config.x;
    const y = imgHeight * config.y;

    // Draw background
    if (config.background) {
      const textMetrics = ctx.measureText(config.content);
      const padding = 10;
      const bgHeight = config.fontSize + padding * 2;
      const bgWidth = textMetrics.width + padding * 2;
      
      ctx.fillStyle = config.bgColor;
      ctx.fillRect(
        x - bgWidth / 2,
        y - bgHeight / 2,
        bgWidth,
        bgHeight
      );
    }

    // Draw text
    ctx.fillStyle = config.color;
    ctx.fillText(config.content, x, y);
  };

  const handleAddText = () => {
    if (!originalImage) return;
    processImage(originalImage, textConfig);
    localStorage.setItem("textConfig", JSON.stringify(textConfig));
    setIsEditing(false);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.download = `text-overlay-${Date.now()}.png`;
    link.href = processedImage;
    link.click();
    
    // Cleanup
    localStorage.removeItem("textImage");
    localStorage.removeItem("textConfig");
    setOriginalImage(null);
    setProcessedImage(null);
  };

  const handlePositionChange = (position) => {
    const positions = {
      "top-left": [0.2, 0.2],
      "top-center": [0.5, 0.2],
      "top-right": [0.8, 0.2],
      "center": [0.5, 0.5],
      "bottom-left": [0.2, 0.8],
      "bottom-center": [0.5, 0.8],
      "bottom-right": [0.8, 0.8]
    };
    
    setTextConfig(prev => ({
      ...prev,
      x: positions[position][0],
      y: positions[position][1]
    }));
  };

  return (
    <>
      <section className="relative bg-dark px-4 border border-b-borderLight border-t-0 border-l-0 flex flex-col md:flex-row items-center justify-between h-[87vh]">
        <div className="w-full">
          <p className="px-3 py-1 flex items-center text-white text-sm bg-secondary w-fit rounded-lg">
            Editor feature
          </p>
          <h1 className="text-5xl mt-[-1rem] font-bold text-white">
            Add text to your images
          </h1>
          
          {/* Text Configuration Controls */}
          {originalImage && (
            <div className="mt-6 space-y-4">
              <input
                type="text"
                value={textConfig.content}
                onChange={(e) => setTextConfig(prev => ({...prev, content: e.target.value}))}
                placeholder="Enter your text"
                className="bg-darkLight text-white px-4 py-2 rounded-lg w-full"
              />
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-text">Font Size</label>
                  <input
                    type="number"
                    value={textConfig.fontSize}
                    onChange={(e) => setTextConfig(prev => ({...prev, fontSize: e.target.value}))}
                    className="bg-darkLight text-white px-4 py-2 rounded-lg w-full"
                  />
                </div>
                
                <div>
                  <label className="text-text">Text Color</label>
                  <input
                    type="color"
                    value={textConfig.color}
                    onChange={(e) => setTextConfig(prev => ({...prev, color: e.target.value}))}
                    className="bg-darkLight rounded-lg w-full h-10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-text">Background</label>
                  <select
                    value={textConfig.background}
                    onChange={(e) => setTextConfig(prev => ({...prev, background: e.target.value}))}
                    className="bg-darkLight text-white px-4 py-2 rounded-lg w-full"
                  >
                    <option value="">None</option>
                    <option value="solid">Solid</option>
                    <option value="bubble">Text Bubble</option>
                  </select>
                </div>
                
                {textConfig.background && (
                  <div>
                    <label className="text-text">BG Color</label>
                    <input
                      type="color"
                      value={textConfig.bgColor}
                      onChange={(e) => setTextConfig(prev => ({...prev, bgColor: e.target.value}))}
                      className="bg-darkLight rounded-lg w-full h-10"
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {["top-left", "top-center", "top-right", "center", "bottom-left", "bottom-center", "bottom-right"].map(pos => (
                  <button
                    key={pos}
                    onClick={() => handlePositionChange(pos)}
                    className="px-3 py-1 bg-darkLight rounded-lg text-white hover:bg-secondary transition-all"
                  >
                    {pos}
                  </button>
                ))}
              </div>

              <button
                onClick={handleAddText}
                className="px-4 py-2 bg-secondary rounded-lg text-white hover:bg-tertiary transition-all"
              >
                {isEditing ? "Update Text" : "Add Text"}
              </button>
            </div>
          )}
        </div>

        {/* Image Preview Section */}
        <div className="bg-darkLight w-full h-[450px] rounded-lg flex flex-col items-center justify-center p-8">
          <canvas ref={canvasRef} className="hidden" />
          
          {processedImage ? (
            <div className="relative w-full h-full group">
              <img src={processedImage} alt="processed" className="w-full h-full object-contain" />
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
                  localStorage.removeItem("textImage");
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

      {/* CONVERT CONTENT */}
      <section id="features" className="grid md:grid-cols-2 grid-cols-1 md:gap-6 gap-[3rem] py-10 px-4 mb-[-2rem]">
        <div className="md:w-[90%] w-full flex items-center justify-center">
          <img src="/images/features.png" alt="features-image" className="border border-borderLight" />
        </div>
        <div className="flex flex-col items-center gap-6">
          <div className="space-y-4 md:space-y-3">
            <h1 className="text-white font-semibold text-xl">Text features</h1>
            <p className="text-text text-lg">
              For a professional appearance, add text to your image. The most effective way to incorporate text into a photograph 
              is to do it in an area that appears natural and contributes to the overall composition of the image. For example, 
              descriptions are usually placed at the bottom of the picture. For an artistic effect, take advantage of the space. 
              This can be achieved by placing the text in a wide-open area, without much detail or variation, such as an open sky, 
              forest, or block of color. Through creative font selection, editing, and text alignment, text can be seamlessly integrated 
              into the image. Your audience will be amazed, and you will have created that extra wow effect.
            </p>
          </div>

          <div className="space-y-4 md:space-y-3">
            <h1 className="text-white font-semibold text-xl">How to add text</h1>
            <p className="text-text text-lg">
              To add text to your image, select the &quot;Annotate icon in the right-hand column. When selected, 
              the text feature will appear in the canvas below the image. To add your text, click on the pen, 
              then click on the image. Now it&apos;s time to bring your letters to life and tell your story. Customize 
              the font, size, and color. To create contrast, shape a rectangle and place your text on top or adjust 
              your image with one of our filters.
            </p>
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section className="flex flex-col justify-center px-4 mb-[-1rem]">
        <h1 className="text-white md:text-xl text-lg mb-8">More tools and features</h1>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 content-center">
          <div className="p-5 flex flex-col space-y-3 rounded-md border border-border">
            {/* image container */}
            <div className="w-[3rem] h-auto rounded-full border border-secondary flex justify-center">
            <img src="/images/icons/resize-icon.svg" alt="resize-icon" className="w-full h-auto p-3" />
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
            <img src="/images/icons/crop-icon.svg" alt="resize-icon" className="w-full h-auto p-3" />
            </div>

            {/* text content */}
            <h1 className="text-white font-bold md:text-xl text-lg">
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
            <img src="/images/icons/convert-icon.svg" alt="resize-icon" className="w-full h-auto p-3" />
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
            to={'/watermark/'}
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

export default AddText