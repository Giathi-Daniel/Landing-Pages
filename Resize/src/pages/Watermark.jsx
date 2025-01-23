import { Link } from "react-router-dom"

import New from "../components/New";
import Procedure from "../components/Procedure";
import HoverClickGrid from "../components/HoverClickGrid";

import { FaArrowRight } from "react-icons/fa";


const Watermark = () => {
  
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

          {/* Image + Input section */}
          <div 
            className="bg-darkLight w-full h-[250px] rounded-lg flex flex-col items-center justify-center p-6"
          >
            {/* Custom Input Button */}
            <label className="cursor-pointer rounded-lg bg-transparent border border-border flex flex-col items-center justify-center gap-3 text-white px-5 py-3 w-full h-full">
              {/* Image */}
              <img src="/images/icons/upload-icon.svg" alt="resize-icon" className="w-[4rem] h-auto" />
              
              <span className="text-xl font-semibold flex flex-col items-center">
                Upload your images here 
                <span className="text-secondary text-lg">
                  up to 20 images
                </span>
              </span>
              <input
                type="file"
                name="image"
                className="hidden"
                accept="image/*"
              />
            </label>
          </div>
        </div>
        <div className="flex items-start flex-col justify-center md:ml-[60%] space-y-6">
          <div className="flex items-center gap-[3rem]">
            <h4 className="text-white font-semibold text-xl">Convert to:</h4>
            <select className="text-text bg-dark border border-border px-6 py-3 rounded-lg">
              <option value="JPG" selected>JPG</option>
              <option value="WebP">WebP</option>
              <option value="PNG">PNG</option>
            </select>
          </div>

          <HoverClickGrid />

          <button className="text-white flex items-center text-lg justify-center px-8 py-2 bg-secondary hover:bg-tertiary transition-all rounded-lg w-full">Add watermark</button>
        </div>
      </section>

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