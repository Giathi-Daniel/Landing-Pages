import { Link } from "react-router-dom"

import New from "../components/New";
import Procedure from "../components/Procedure";
import CustomCheckBox from "../components/CustomCheckBox";

import { FaArrowRight } from "react-icons/fa";


const Bulk = () => {
  
  return (
    <>
      {/* HERO SECTION */}
      <section className="bg-dark md:px-[8rem] px-4 flex flex-col items-start justify-between space-y-6">
        <div className="flex flex-col">
          <div className="w-full">
            <h1 className="text-3xl font-bold text-white">Bulk resize images</h1>
            <p className="mt-4 text-lg text-text">
              Resize and compress multiple images at once with a few simple clicks.
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
            <h4 className="text-white font-semibold text-xl">Resize</h4>
            <select className="text-text bg-dark border border-border px-6 py-3 rounded-lg">
              <option value="" disabled selected>Select Percentage</option> {/* Placeholder */}
              <option value="75% Smaller">75% Smaller</option>
              <option value="50% Smaller">50% Smaller</option>
              <option value="50% Smaller">25% Smaller</option>
              <option value="100%">100%</option>
              <option value="75% Smaller">25% Larger</option>
              <option value="50% Larger">50% Larger</option>
              <option value="50% Larger">75% Larger</option>
            </select>
          </div>

          <div className="flex items-center justify-center gap-4 ml-[-.5rem]">
            <CustomCheckBox />
            <p className="text-white text-lg m-0">Resize by pixel</p>
          </div>

          <div className="flex items-center gap-[3rem]">
            <h4 className="text-white font-semibold text-xl">Compression</h4>
            <select className="text-text bg-dark border border-border px-6 py-3 rounded-lg">
              <option value="Strong">Strong</option>
              <option value="Medium" selected>Medium</option>
              <option value="Light">Light</option>
            </select>
          </div>

          <div className="flex items-center justify-center gap-4 ml-[-.5rem]">
            <CustomCheckBox />
            <p className="text-white text-lg m-0">Set max size</p>
          </div>

          <button className="text-white flex items-center text-lg justify-center px-8 py-2 bg-secondary hover:bg-tertiary transition-all rounded-lg w-full">Resize</button>
        </div>
      </section>

      <New />
      <Procedure />

      {/* CROP AND TOOLS */}
      <section className="md:px-6 flex items-start flex-col justify-center space-y-4 px-4 mb-[-10rem]">
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
      <section className="flex flex-col justify-center px-6 mb-[-1rem]">
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