import { Link } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import New from "../components/New";
import Procedure from "../components/Procedure";
import { FaArrowRight } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";

const BlackWhite = () => {
  const [originalImage, setOriginalImage] = useState(null)
  const [processedImage, setProcessedImage] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const canvasRef = useRef(null)

  // Load from localStorage on mount
  useEffect(() => {
    const savedImage = localStorage.getItem('bwImage')
    if (savedImage) {
      setProcessedImage(savedImage)
    }
  }, [])

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      setOriginalImage(e.target.result)
      localStorage.setItem('originalImage', e.target.result)
    }
    reader.readAsDataURL(file)
  }

  const convertToBlackWhite = async () => {
    if (!originalImage) return
   
    setIsProcessing(true)
   
    const img = new Image()
    img.src = originalImage
   
    await new Promise((resolve) => (img.onload = resolve))

    const canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
   
    const ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0)

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data

    // Convert to grayscale
    for (let i = 0; i < data.length; i += 4) {
      const avg = 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2]
      data[i] = avg   // R
      data[i + 1] = avg // G
      data[i + 2] = avg // B
    }

    ctx.putImageData(imageData, 0, 0)

    const processedDataUrl = canvas.toDataURL('image/jpeg', 0.9)
    setProcessedImage(processedDataUrl)
    localStorage.setItem('bwImage', processedDataUrl)
    setIsProcessing(false)
  }

  const handleDownload = () => {
    const link = document.createElement('a')
    link.download = `bw-${Date.now()}.jpg`
    link.href = processedImage
    link.click()
   
    // Cleanup
    localStorage.removeItem('bwImage')
    localStorage.removeItem('originalImage')
    setProcessedImage(null)
    setOriginalImage(null)
  }

  return (
    <>
      <section className="relative flex flex-col items-center justify-between px-4 border border-t-0 border-l-0 bg-dark border-b-borderLight md:flex-row ">
        <div className="w-full">
          <p className="flex items-center px-3 py-1 text-sm text-white rounded-lg bg-secondary w-fit">Editor feature</p>
          <h1 className="text-5xl mt-[-1rem] font-bold text-white">Convert your images to black and white</h1>
          <p className="mt-6 text-xl text-text md:max-w-lg">
            Looking for a timeless appeal? Upload your image, remove the colors, and convert it to black and white.
          </p>
          <div className="flex items-center justify-start gap-3 mb-6">
            <button
              onClick={originalImage ? convertToBlackWhite : () => document.querySelector('input[type="file"]').click()}
              className="flex items-center justify-center gap-2 px-5 py-2 text-white transition-all bg-gray-800 rounded-lg hover:bg-border"
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : (originalImage ? 'Convert to B&W' : 'Get started')}
              {!isProcessing && <FaArrowRight />}
            </button>
            <a href="#how-to" className="flex items-center justify-center gap-2 px-5 py-2 text-white transition-all bg-transparent rounded-lg hover:bg-border">
                Learn how
                <FiChevronDown />
            </a>
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
                  setOriginalImage(null)
                  localStorage.removeItem('originalImage')
                }}
                className="absolute px-3 py-1 text-white bg-red-500 rounded-lg top-4 right-4 hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-full gap-3 px-5 py-3 text-white bg-transparent border rounded-lg cursor-pointer border-border">
              <img src="/images/icons/upload-icon.svg" alt="upload" className="w-32 h-32" />
              <span className="text-lg">Drop an image or click <span className="text-secondary">here</span></span>
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

      {/* HOW-TO */}
      <section id="how-to" className="grid md:grid-cols-2 grid-cols-1 md:gap-6 gap-[3rem] py-10 px-4 mb-[-2rem]">
        <div className="md:w-[90%] w-full flex items-center justify-center">
          <img src="/images/black-white.png" alt="features-image" className="border border-borderLight" />
        </div>
        <div className="flex flex-col items-center gap-6">
          <div className="space-y-4 md:space-y-3">
            <h1 className="text-xl font-semibold text-white">Black and white images</h1>
            <p className="text-lg text-text">
                With just one click, you can transform all your images into black-and-white. 
                The greyscale filter removes colors from your photos, leaving you with a dramatic 
                impact and a new focus on your images. You can apply the black and white filter to 
                images of any format. Whether you&apos;re taking a portrait, a landscape shot, or a product photo, 
                you can create a timeless look and get creative with your images.
            </p>
          </div>

          <div className="space-y-4 md:space-y-3">
            <h1 className="text-xl font-semibold text-white">How to convert</h1>
            <p className="text-lg text-text">
                Start by uploading your image. In the right-hand column, select the filter icon. 
                When selected, the photo filters will appear in the canvas below the image. To convert 
                your image to black and white choose the &quot;Noir, &quot;Mono, or &quot;Stark filter. It&apos;s that simple, 
                with a few clicks you can achieve that timeless look.
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
            <img src="/images/icons/mirror-icon.svg" alt="resize-icon" className="w-full h-auto p-3" />
            </div>

            {/* text content */}
            <h1 className="text-lg font-bold text-white md:text-xl">
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

export default BlackWhite
