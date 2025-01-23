import { Link } from "react-router-dom"

import New from "../components/New";
import Tools from "../components/Tools";
import Procedure from "../components/Procedure";
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

      <New />
      <Procedure />

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
        <Tools />
      </section>

      <Faqs />
    </>
  )
}

export default Home