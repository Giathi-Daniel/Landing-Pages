
const Procedure = () => {
  return (
    <section className="px-4 bg-darkLight space-y-16 border border-b-borderLight border-t-0 border-l-0">
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
  )
}

export default Procedure