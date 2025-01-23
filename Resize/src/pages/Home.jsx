import { Link } from "react-router-dom"

import New from "../components/New";
import Faqs from "../components/Faqs";

import { FaArrowRight } from "react-icons/fa";
import { CiVideoOn } from "react-icons/ci";


const Home = () => {
  return (
    <>
    
    {/* // HERO SECTION */}
    <section className="relative bg-dark md:px-6 px-4 border border-b-borderLight border-t-0 border-l-0 flex flex-col md:flex-row items-center justify-between h-[87vh]">
      <div className="w-full">
        <h1 className="text-5xl font-bold text-white">Resize your image</h1>
        <p className="mt-6 text-xl text-text md:max-w-lg">
          Our image editor is free, fun, and fast. Resize, compress, convert, and edit with a few simple clicks.
        </p>
        <div className="flex items-center justify-start gap-3 mb-6">
          <button className="rounded-lg px-5 py-2 flex items-center justify-center bg-gray-800 text-white gap-2 hover:bg-border transition-all">
            Get started
            <FaArrowRight />
          </button>
          <button className="rounded-lg px-5 py-2 flex items-center justify-center text-white gap-2 bg-transparent hover:bg-border transition-all">
            Learn how
            <CiVideoOn className="text-xl" />
          </button>
        </div>
      </div>

      {/* Image + Input section */}
      <div 
        className="bg-darkLight w-full h-[450px] rounded-lg flex flex-col items-center justify-center p-8"
      >
        {/* Custom Input Button */}
        <label className="cursor-pointer rounded-lg bg-transparent border border-border flex flex-col items-center justify-center gap-3 text-white px-5 py-3 w-full h-full">
          {/* Image */}
          <img src="/images/icons/upload-icon.svg" alt="resize-icon" className="w-32 h-32" />
          
          <span className="text-lg">Drop an image or click <span className="text-secondary">here</span></span>
          <input
            type="file"
            name="image"
            className="hidden"
            accept="image/*"
          />
        </label>
      </div>
    </section>


      {/* // Ad */}
      <New />

      {/* // STEPS TO FOLLOW */}
      <section className="md:px-6 px-4 bg-darkLight space-y-16 border border-b-borderLight border-t-0 border-l-0">
        <div className="space-y-3">
          <h1 className="text-white md:text-3xl text-2xl font-bold">Designed for simplicity</h1>
          <p className="text-text md:max-w-xl md:text-xl text-lg">Good things come in threes. Upload, resize, and bring your images to life with beautiful edits.</p>
        </div>
        <div className="flex flex-col md:flex-row md:items-center space-y-6 justify-between">
          <div className="space-y-2">
            <div className="w-[3rem] h-auto rounded-full bg-secondary text-white">
              <img src="/images/icons/upload-icon.svg" alt="upload-icon" className="w-full h-auto p-3" />
            </div>

            <h1 className="text-white text-xl font-semibold">Upload</h1>
            <p className="text-text text-lg">Quick and simple, upload you image.</p>
          </div>

          <div className="space-y-2">
            <div className="w-[3rem] h-auto rounded-full bg-secondary">
              <img src="/images/icons/resize-icon.svg" alt="upload-icon" className="w-full h-auto p-3" />
            </div>

            <h1 className="text-white text-xl font-semibold">Resize</h1>
            <p className="text-text text-lg">Resize your image to the size needed.</p>
          </div>

          <div className="space-y-2">
            <div className="w-[3rem] h-auto rounded-full bg-secondary text-white">
              <img src="/images/icons/edit-icon.svg" alt="upload-icon" className="w-full h-auto p-3" />
            </div>

            <h1 className="text-white text-xl font-semibold">Edit</h1>
            <p className="text-text text-lg">Compress, convert, and edit for extra effect.</p>
          </div>
        </div>
      </section>


      {/* // FEATURES AND TOOLS */}
      <section className="md:px-6 border border-b-borderLight border-t-0 border-l-0 px-4 space-y-20">
        {/* ==== RESIZE FEATURES ==== */}
        <div className="flex flex-col justify-center">
          <h1 className="text-white md:text-xl text-lg mb-8">Resize features</h1>

          <div className="grid md:grid-cols-4 grid-cols-1 gap-3 content-center">
            <div className="p-5 flex flex-col space-y-3 rounded-md border border-border">
              <div className="w-[3rem] h-auto rounded-full border border-secondary flex justify-center">
                <img src="/images/icons/resize-icon.svg" alt="resize-icon" className="w-full h-auto p-3" />
              </div>
              <h1 className="text-white font-bold md:text-xl text-lg">Resize by pixel</h1>
              <p className="text-text">Define the desired width and height of your image.</p>
            </div>

            <div className="p-5 flex flex-col space-y-3 rounded-md border border-border">
              <div className="w-[3rem] h-auto rounded-full border border-secondary flex justify-center">
                <img src="/images/icons/resize-icon.svg" alt="resize-icon" className="w-full h-auto p-3" />
              </div>
              <h1 className="text-white font-bold md:text-xl text-lg">Resize by percentage</h1>
              <p className="text-text">Set a percentage to increase or decrease the size of your image.</p>
            </div>

            <div className="p-5 flex flex-col space-y-3 rounded-md border border-border">
              <div className="w-[3rem] h-auto rounded-full border border-secondary flex justify-center">
                <img src="/images/icons/resize-icon.svg" alt="resize-icon" className="w-full h-auto p-3" />
              </div>
              <h1 className="text-white font-bold md:text-xl text-lg">Resize for social</h1>
              <p className="text-text">Presets for the most popular social media websites.</p>
            </div>

            <div className="p-5 flex flex-col space-y-3 rounded-md border border-border">
              <div className="w-[3rem] h-auto rounded-full border border-secondary flex justify-center">
                <img src="/images/icons/resize-icon.svg" alt="resize-icon" className="w-full h-auto p-3" />
              </div>
              <h1 className="text-white font-bold md:text-xl text-lg">
                <Link 
                  to={'/bulk'}
                  className="flex items-center gap-2 transition-all hover:text-secondary">
                    Bulk resize
                    <FaArrowRight />
                  </Link>
                </h1>
              <p className="text-text">Resize multiple images at once with a few simple clicks.</p>
            </div>
          </div>
        </div>

        {/* ==== TOOLS AND FEATURES ==== */}
        <div className="flex flex-col justify-center">
          <h1 className="text-white md:text-xl text-lg mb-8">More tools and features</h1>

          <div className="grid md:grid-cols-4 grid-cols-1 gap-3 content-center">
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
              <p className="text-text">Crop the perfect frame and enhance your image.</p>
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
        </div>
      </section>

      {/* // FAQS */}
      <Faqs />
    </>
  )
}

export default Home