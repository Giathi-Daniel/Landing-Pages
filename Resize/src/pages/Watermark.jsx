import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import New from "../components/New";
import Procedure from "../components/Procedure";
import HoverClickGrid from "../components/HoverClickGrid";
import { FaArrowRight } from "react-icons/fa";

const Watermark = () => {
  const [uploadedImages, setUploadedImages] = useState([])
  const [processedImages, setProcessedImages] = useState([])
  const [watermarkImage, setWatermarkImage] = useState(null)
  const [selectedFormat, setSelectedFormat] = useState('PNG')
  const [position, setPosition] = useState('bottom-right')

  // Load initial data from localStorage
  useEffect(() => {
    const savedUploaded = JSON.parse(localStorage.getItem('uploadedImages')) || []
    const savedProcessed = JSON.parse(localStorage.getItem('processedImages')) || []
    const savedWatermark = localStorage.getItem('watermarkImage')
   
    setUploadedImages(savedUploaded)
    setProcessedImages(savedProcessed)
    setWatermarkImage(savedWatermark)
  }, [])

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const readers = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = (e) => resolve(e.target.result)
        reader.readAsDataURL(file)
      })
    })

    Promise.all(readers).then(dataUrls => {
      const newImages = [...uploadedImages, ...dataUrls]
      setUploadedImages(newImages)
      localStorage.setItem('uploadedImages', JSON.stringify(newImages))
    })
  }

  const handleWatermarkUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      setWatermarkImage(e.target.result)
      localStorage.setItem('watermarkImage', e.target.result)
    }
    reader.readAsDataURL(file)
  }

  const handleAddWatermark = async () => {
    if (!uploadedImages.length || !watermarkImage) return

    const processed = await Promise.all(uploadedImages.map(async (imageData) => {
      const mainImg = await loadImage(imageData)
      const watermarkImg = await loadImage(watermarkImage)

      const canvas = document.createElement('canvas')
      canvas.width = mainImg.width
      canvas.height = mainImg.height

      const ctx = canvas.getContext('2d')
      ctx.drawImage(mainImg, 0, 0)

      // Calculate position
      const pos = calculatePosition(mainImg, watermarkImg)
      ctx.drawImage(watermarkImg, pos.x, pos.y)

      const format = selectedFormat.toLowerCase()
      const mimeType = `image/${format === 'jpg' ? 'jpeg' : format}`
      return canvas.toDataURL(mimeType, 1.0)
    }))

    setProcessedImages(processed)
    localStorage.setItem('processedImages', JSON.stringify(processed))
  }

  const handleDownload = (dataUrl, index) => {
    const link = document.createElement('a')
    link.download = `watermarked-${Date.now()}.${selectedFormat.toLowerCase()}`
    link.href = dataUrl
    link.click()

    // Remove from state and storage
    const updated = processedImages.filter((_, i) => i !== index)
    setProcessedImages(updated)
    localStorage.setItem('processedImages', JSON.stringify(updated))
  }

  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = src
    })
  }

  const calculatePosition = (mainImg, watermarkImg) => {
    const padding = 20
    switch(position) {
      case 'top-left': return { x: padding, y: padding }
      case 'top-right': return { x: mainImg.width - watermarkImg.width - padding, y: padding }
      case 'bottom-left': return { x: padding, y: mainImg.height - watermarkImg.height - padding }
      case 'bottom-right': return {
        x: mainImg.width - watermarkImg.width - padding,
        y: mainImg.height - watermarkImg.height - padding
      }
      case 'center': return {
        x: (mainImg.width - watermarkImg.width) / 2,
        y: (mainImg.height - watermarkImg.height) / 2
      }
      default: return { x: 0, y: 0 }
    }
  }

  return (
    <>
      {/* HERO SECTION */}
      <section className="bg-dark px-4 flex flex-col items-start justify-between space-y-6">
        <div className="flex flex-col">
          <div className="w-full">
            <h1 className="text-3xl font-bold text-white">Watermark</h1>
            <p className="mt-4 text-lg text-text">
              Add a logo watermark to your images with a few simple clicks.
            </p>
          </div>

          {/* Main Image Upload */}
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

          {/* Watermark Image Upload */}
          <div className="bg-darkLight w-full mt-4 h-[150px] rounded-lg flex flex-col items-center justify-center p-6">
            <label className="cursor-pointer rounded-lg bg-transparent border border-border flex flex-col items-center justify-center gap-3 text-white px-5 py-3 w-full h-full">
              <img src="/images/icons/watermark-icon.svg" alt="watermark" className="w-[3rem] h-auto" />
              <span className="text-lg font-semibold">Upload Watermark (PNG recommended)</span>
              <input
                type="file"
                onChange={handleWatermarkUpload}
                className="hidden"
                accept="image/png"
              />
            </label>
          </div>
        </div>

        <div className="flex items-start flex-col justify-center md:ml-[60%] space-y-6">
          <div className="flex items-center gap-[3rem]">
            <h4 className="text-white font-semibold text-xl">Convert to:</h4>
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="text-text bg-dark border border-border px-6 py-3 rounded-lg"
            >
              <option value="PNG">PNG</option>
              <option value="JPG">JPG</option>
              <option value="WEBP">WebP</option>
            </select>
          </div>

          <HoverClickGrid onPositionChange={setPosition} />

          <button
            onClick={handleAddWatermark}
            className="text-white flex items-center text-lg justify-center px-8 py-2 bg-secondary hover:bg-tertiary transition-all rounded-lg w-full"
          >
            Add watermark
          </button>
        </div>
      </section>

      {/* Processed Images */}
      {processedImages.length > 0 && (
        <section className="bg-dark px-4 py-6">
          <h2 className="text-white text-2xl mb-6">Your Watermarked Images</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {processedImages.map((img, index) => (
              <div key={index} className="bg-darkLight rounded-lg p-4">
                <img src={img} alt={`processed-${index}`} className="w-full h-auto mb-3 rounded" />
                <button
                  onClick={() => handleDownload(img, index)}
                  className="w-full py-2 bg-secondary hover:bg-tertiary text-white rounded-lg"
                >
                  Download {selectedFormat}
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      <New />
      <Procedure />

      {/* WATERMARK CONTENT */}
      <section className="flex items-start flex-col justify-center space-y-4 px-4 mb-[-8rem]">
        <h1 className="text-white text-xl">Watermark Images</h1>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-1 md:gap-[4rem]">
          <p className="text-lg text-text">
            Add a logo watermark to your images with a few simple clicks. Make sure 
            your brand stands out and gets the recognition it deserves. Put a watermark 
            on your photos, art, and other promotional materials.
          </p>
          <p className="text-lg text-text">
            You can use any type of identifying mark for your brand, like your logo, 
            your name, your mascot, or your signature. For the best results, we recommend
            you upload a PNG picture with a transparent background. You can select the placement 
            from one of our predefined options and watermark up to 20 images at a time.
          </p>
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
                Convert
                <FaArrowRight />
            </Link>
            </h1>
            <p className="text-text">Convert your images to JPG, PNG, and WEBP.</p>
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

export default Watermark
