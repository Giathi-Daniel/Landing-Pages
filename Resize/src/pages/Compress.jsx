import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import New from "../components/New";
import Procedure from "../components/Procedure";
import CustomCheckBox from "../components/CustomCheckBox";
import { FaArrowRight } from "react-icons/fa";

const Compress = () => {
  const [uploadedImages, setUploadedImages] = useState([])
  const [processedImages, setProcessedImages] = useState([])
  const [compressionLevel, setCompressionLevel] = useState('Medium')
  const [useMaxSize, setUseMaxSize] = useState(false)
  const [maxSize, setMaxSize] = useState(1024) // Default 1MB in KB

  // Load initial data from localStorage
  useEffect(() => {
    const savedUploaded = JSON.parse(localStorage.getItem('compressedUploads')) || []
    const savedProcessed = JSON.parse(localStorage.getItem('compressedResults')) || []
   
    setUploadedImages(savedUploaded)
    setProcessedImages(savedProcessed)
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
      localStorage.setItem('compressedUploads', JSON.stringify(newImages))
    })
  }

  const getQualityFromLevel = () => {
    switch(compressionLevel) {
      case 'Strong': return 0.6
      case 'Medium': return 0.8
      case 'Light': return 0.9
      default: return 0.8
    }
  }

  const handleCompress = async () => {
    if (!uploadedImages.length) return

    const compressed = await Promise.all(uploadedImages.map(async (image) => {
      const img = await loadImage(image.dataUrl)
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
     
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)
     
      let quality = getQualityFromLevel()
      let compressedDataUrl

      // Handle different formats
      if (image.type.includes('jpeg') || image.type.includes('jpg')) {
        compressedDataUrl = canvas.toDataURL('image/jpeg', quality)
      } else if (image.type.includes('webp')) {
        compressedDataUrl = canvas.toDataURL('image/webp', quality)
      } else {
        // For PNG we need different approach
        compressedDataUrl = canvas.toDataURL('image/png')
      }

      // Handle max size constraint
      if (useMaxSize) {
        let currentSize = compressedDataUrl.length * 0.75 // Approximate KB
        while (currentSize > maxSize && quality > 0.1) {
          quality -= 0.1
          compressedDataUrl = canvas.toDataURL('image/jpeg', quality)
          currentSize = compressedDataUrl.length * 0.75
        }
      }

      return {
        original: image.dataUrl,
        compressed: compressedDataUrl,
        name: image.name,
        format: image.type.split('/')[1]
      }
    }))

    setProcessedImages(compressed)
    localStorage.setItem('compressedResults', JSON.stringify(compressed))
  }

  const handleDownload = (dataUrl, name, format, index) => {
    const link = document.createElement('a')
    link.download = `compressed-${name.split('.')[0]}.${format}`
    link.href = dataUrl
    link.click()

    // Remove from state and storage
    const updated = processedImages.filter((_, i) => i !== index)
    setProcessedImages(updated)
    localStorage.setItem('compressedResults', JSON.stringify(updated))
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
      <section className="bg-dark px-4 flex flex-col items-start justify-between space-y-6">
        <div className="flex flex-col">
          <div className="w-full">
            <h1 className="text-3xl font-bold text-white">Compress images</h1>
            <p className="mt-4 text-lg text-text">
              Optimize your JPG and WebP images with a few simple clicks.
            </p>
          </div>

          {/* Image Upload Section */}
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
            onClick={handleCompress}
            className="text-white flex items-center text-lg justify-center px-8 py-2 bg-secondary hover:bg-tertiary transition-all rounded-lg w-full"
          >
            Compress
          </button>
        </div>
      </section>

      {/* Processed Images */}
      {processedImages.length > 0 && (
        <section className="bg-dark px-4 py-6">
          <h2 className="text-white text-2xl mb-6">Compressed Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {processedImages.map((img, index) => (
              <div key={index} className="bg-darkLight rounded-lg p-4">
                <img src={img.compressed} alt={`compressed-${index}`} className="w-full h-auto mb-3 rounded" />
                <div className="flex justify-between items-center">
                  <span className="text-text text-sm">
                    {Math.round(img.compressed.length * 0.75 / 1024)}KB
                  </span>
                  <button
                    onClick={() => handleDownload(img.compressed, img.name, img.format, index)}
                    className="px-4 py-2 bg-secondary hover:bg-tertiary text-white rounded-lg"
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

      {/* CROP AND TOOLS */}
      <section className="flex items-start flex-col justify-center space-y-4 px-4 mb-[-8rem]">
        <h1 className="text-white font-semibold text-xl">Image compression</h1>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-1 md:gap-[4rem]">
          <p className="text-lg text-text">
            SnapTools makes compressing your images quick and effortless. High-resolution image files, 
            such as those from cameras, can often be tens of megabytes - too large for many purposes, 
            especially uploading to a website. Smaller image files lead to faster load times and a better 
            user experience. That’s why SnapTools uses lossy compression to reduce file sizes by removing 
            parts of the image data that are less noticeable to the human eye.
          </p>
          <p className="text-lg text-text">
            Our tool supports both JPG and WebP formats and allows you to compress up to 20 images simultaneously, 
            streamlining your workflow. Choose the compression level that fits your needs. Select from Strong, Medium, 
            or Light compression, or specify a target file size for precise control over the final output.
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

export default Compress
