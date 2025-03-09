import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import New from "../components/New";
import Procedure from "../components/Procedure";
import CustomCheckBox from "../components/CustomCheckBox";
import { FaArrowRight } from "react-icons/fa";

const Convert = () => {
  const [uploadedImages, setUploadedImages] = useState([])
  const [convertedImages, setConvertedImages] = useState([])
  const [targetFormat, setTargetFormat] = useState('JPG')
  const [useMaxSize, setUseMaxSize] = useState(false)
  const [maxSize, setMaxSize] = useState(1024) // Default 1MB in KB

  // Load initial data from localStorage
  useEffect(() => {
    const savedUploaded = JSON.parse(localStorage.getItem('convertUploads')) || []
    const savedConverted = JSON.parse(localStorage.getItem('convertResults')) || []
   
    setUploadedImages(savedUploaded)
    setConvertedImages(savedConverted)
  }, [])

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const readers = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = (e) => resolve({
          dataUrl: e.target.result,
          name: file.name,
          type: file.type
        })
        reader.readAsDataURL(file)
      })
    })

    Promise.all(readers).then(data => {
      const newImages = [...uploadedImages, ...data]
      setUploadedImages(newImages)
      localStorage.setItem('convertUploads', JSON.stringify(newImages))
    })
  }

  const handleConvert = async () => {
    if (!uploadedImages.length) return

    const conversions = await Promise.all(uploadedImages.map(async (image) => {
      const img = await loadImage(image.dataUrl)
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
     
      const ctx = canvas.getContext('2d')
     
      // Handle transparent backgrounds for JPG
      if (targetFormat === 'JPG') {
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
     
      ctx.drawImage(img, 0, 0)

      let quality = 0.9
      let convertedDataUrl
      let mimeType

      switch(targetFormat) {
        case 'JPG':
          mimeType = 'image/jpeg'
          break
        case 'PNG':
          mimeType = 'image/png'
          break
        case 'WebP':
          mimeType = 'image/webp'
          break
        default:
          mimeType = 'image/jpeg'
      }

      // Initial conversion
      convertedDataUrl = canvas.toDataURL(mimeType, targetFormat === 'PNG' ? undefined : quality)

      // Handle max size constraint
      if (useMaxSize) {
        let currentSize = convertedDataUrl.length * 0.75 // Approximate KB
        while (currentSize > maxSize && quality > 0.1 && targetFormat !== 'PNG') {
          quality -= 0.1
          convertedDataUrl = canvas.toDataURL(mimeType, quality)
          currentSize = convertedDataUrl.length * 0.75
        }
      }

      return {
        original: image.dataUrl,
        converted: convertedDataUrl,
        name: image.name,
        format: targetFormat.toLowerCase(),
        size: Math.round(convertedDataUrl.length * 0.75 / 1024)
      }
    }))

    setConvertedImages(conversions)
    localStorage.setItem('convertResults', JSON.stringify(conversions))
  }

  const handleDownload = (dataUrl, name, format, index) => {
    const link = document.createElement('a')
    link.download = `${name.split('.')[0]}.${format}`
    link.href = dataUrl
    link.click()

    // Remove from state and storage
    const updated = convertedImages.filter((_, i) => i !== index)
    setConvertedImages(updated)
    localStorage.setItem('convertResults', JSON.stringify(updated))
  }

  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = src
    })
  }

  return (
    <>
      {/* HERO SECTION */}
      <section className="flex flex-col items-start justify-between px-4 space-y-6 bg-dark">
        <div className="flex flex-col">
          <div className="w-full">
            <h1 className="text-3xl font-bold text-white">Convert images</h1>
            <p className="mt-4 text-lg text-text">
              Convert images to JPG, WebP, or PNG with a few simple clicks.
            </p>
          </div>

          {/* Image Upload Section */}
          <div className="bg-darkLight w-full h-[250px] rounded-lg flex flex-col items-center justify-center p-6">
            <label className="flex flex-col items-center justify-center w-full h-full gap-3 px-5 py-3 text-white bg-transparent border rounded-lg cursor-pointer border-border">
              <img src="/images/icons/upload-icon.svg" alt="upload" className="w-[4rem] h-auto" />
              <span className="flex flex-col items-center text-xl font-semibold">
                Upload your images here
                <span className="text-lg text-secondary">up to 20 images</span>
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
            <h4 className="text-xl font-semibold text-white">Convert to:</h4>
            <select
              value={targetFormat}
              onChange={(e) => setTargetFormat(e.target.value)}
              className="px-6 py-3 border rounded-lg text-text bg-dark border-border"
            >
              <option value="JPG">JPG</option>
              <option value="WebP">WebP</option>
              <option value="PNG">PNG</option>
            </select>
          </div>

          <div className="flex items-center justify-center gap-4 ml-[-.5rem]">
            <CustomCheckBox
              checked={useMaxSize}
              onChange={(e) => setUseMaxSize(e.target.checked)}
            />
            <p className="m-0 text-lg text-white">Set max size</p>
          </div>

          {useMaxSize && (
            <div className="flex items-center gap-4">
              <input
                type="number"
                value={maxSize}
                onChange={(e) => setMaxSize(e.target.value)}
                className="w-24 px-4 py-2 border rounded-lg text-text bg-dark border-border"
                placeholder="KB"
              />
              <span className="text-white">KB</span>
            </div>
          )}

          <button
            onClick={handleConvert}
            className="flex items-center justify-center w-full px-8 py-2 text-lg text-white transition-all rounded-lg bg-secondary hover:bg-tertiary"
          >
            Convert
          </button>
        </div>
      </section>

      {/* Converted Images */}
      {convertedImages.length > 0 && (
        <section className="px-4 py-6 bg-dark">
          <h2 className="mb-6 text-2xl text-white">Converted Images</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {convertedImages.map((img, index) => (
              <div key={index} className="p-4 rounded-lg bg-darkLight">
                <img src={img.converted} alt={`converted-${index}`} className="w-full h-auto mb-3 rounded" />
                <div className="flex items-center justify-between">
                  <div className="text-sm text-text">
                    <p>{img.size}KB</p>
                    <p>.{img.format}</p>
                  </div>
                  <button
                    onClick={() => handleDownload(img.converted, img.name, img.format, index)}
                    className="px-4 py-2 text-white rounded-lg bg-secondary hover:bg-tertiary"
                  >
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <New />
      <Procedure />

      {/* CONVERT CONTENT */}
      <section className="flex items-start flex-col justify-center space-y-4 px-4 mb-[-8rem]">
        <h1 className="text-xl font-semibold text-white">Image converter</h1>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-1 md:gap-[4rem]">
          <p className="text-lg text-text">
            Resize.com eliminates the hassle of managing different file types, giving 
            you a fast, seamless way to convert any image to JPG, PNG, or WebP. With Resize.com, 
            converting your images has never been easier. Simply upload your images, select your format, 
            and convert them with just two clicks.
          </p>
          <p className="text-lg text-text">
            Certain projects require images in specific formats, and that&apos;s 
            where Resize.com&apos;s image converter can help. Need to reduce file size? Convert to 
            JPG for lightweight images. Working on HD graphics? Choose PNG for crisp, high-resolution 
            visuals. Want modern, web-optimized files? Select WebP for superior compression and performance.
          </p>
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
            <img src="/images/icons/convert-icon.svg" alt="resize-icon" className="w-full h-auto p-3" />
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
            <img src="/images/icons/watermark-icon.svg" alt="resize-icon" className="w-full h-auto p-3" />
            </div>

            {/* text content */}
            <h1 className="text-lg font-bold text-white md:text-xl">
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

          <div className="flex flex-col p-5 space-y-3 border rounded-md border-border">
            {/* image container */}
            <div className="w-[3rem] h-auto rounded-full border border-secondary flex justify-center">
            <img src="/images/icons/text-icon.svg" alt="resize-icon" className="w-full h-auto p-3" />
            </div>

            {/* text content */}
            <h1 className="text-lg font-bold text-white md:text-xl">
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

export default Convert
