import { Link } from "react-router-dom"

import New from "../components/New";
import Procedure from "../components/Procedure";

import { FaArrowRight } from "react-icons/fa";
import { CiVideoOn } from "react-icons/ci";

const Crop = () => {
  return (
    <>
      {/* HERO SECTION */}
      <section className="relative bg-dark px-4 border border-b-borderLight border-t-0 border-l-0 flex flex-col md:flex-row items-center justify-between h-[87vh]">
        <div className="w-full">
          <h1 className="text-5xl font-bold text-white">Crop an image</h1>
          <p className="mt-6 text-xl text-text md:max-w-lg">
          Resize.com makes cropping images easy. Upload your image and capture the perfect frame.
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
              to={'#popup'}
              className="rounded-lg px-5 py-2 flex items-center justify-center text-white gap-2 bg-transparent hover:bg-border transition-all"
            >
              Learn how
              <CiVideoOn className="text-xl" />
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

      {/* CROP AND TOOLS */}
      <section className="md:py-1 flex items-center md:flex-row flex-col justify-center md:gap-[4rem] px-4 space-y-20">
        <div className="md:w-[300%] h-auto border border-borderLight md:mt-[7rem]">
          <img src="/images/crop.jpeg" alt="crop-image" className="w-full h-auto object-cover" />
        </div>
        <div className="space-y-6 t-[-6rem]">
          <div className="space-y-4">
            <h1 className="text-white font-semibold md:text-2xl text-xl">Cropping features</h1>
            <p className="text-text md:text-lg text-base">
              Have you ever taken a photo where there is a part you would love to cut out? Well, the easiest way to fix that is to crop it! Resize.com makes that effortless. The process of cropping an image allows for the removal of unwanted elements from a picture. This way, you can capture the perfect shot every time. Use the Resize.com editor to manage the crop selection, image orientation, zooming, and size. It&apos;s simple and hassle-free.
            </p>
          </div>
          <div className="space-y-4">
            <h1 className="text-white font-semibold md:text-2xl text-xl">How to crop</h1>
            <p className="text-text md:text-lg text-base">
            To crop your image, drag any of the four borders to capture the desired shot. You can also crop by entering a desired width and height in pixels. Finally, there is also handy feature that allows you to crop by preset. Don’t forget that you can also flip, rotate, and even set a custom aspect ratio. Once you are ready, click the crop button in the bottom left-hand corner of the page to download your image.
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

export default Crop