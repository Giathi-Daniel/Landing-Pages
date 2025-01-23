import { Link } from "react-router-dom"

import New from "../components/New";
import Procedure from "../components/Procedure";

import { FaArrowRight } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";


const AddText = () => {
  
  return (
    <>
      <section className="relative bg-dark md:px-6 px-4 border border-b-borderLight border-t-0 border-l-0 flex flex-col md:flex-row items-center justify-between h-[87vh]">
        <div className="w-full">
          <p className="px-3 py-1 flex items-center text-white text-sm bg-secondary w-fit rounded-lg">Editor feature</p>
          <h1 className="text-5xl mt-[-1rem] font-bold text-white">Add text to your images</h1>
          <p className="mt-6 text-xl text-text md:max-w-lg">
            Add a unique touch to your images and tell your story with our easy-to-use online image editor.
          </p>
          <div className="flex items-center justify-start gap-3 mb-6">
            <Link
                to={'/crop/app'}
                className="rounded-lg px-5 py-2 flex items-center justify-center bg-gray-800 text-white gap-2 hover:bg-border transition-all"
              >
                Get started
                <FaArrowRight />
              </Link>
              <Link
                to={'#features'}
                className="rounded-lg px-5 py-2 flex items-center justify-center text-white gap-2 bg-transparent hover:bg-border transition-all"
              >
                Learn how
                <FiChevronDown />
              </Link>
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

      <New />
      <Procedure />

      {/* CONVERT CONTENT */}
      <section id="features" className="md:px-6 grid md:grid-cols-2 grid-cols-1 md:gap-6 gap-[3rem] py-10 px-4 mb-[-2rem]">
        <div className="w-[90%] flex items-center justify-center">
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
      <section className="flex flex-col justify-center px-6 mb-[-1rem]">
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