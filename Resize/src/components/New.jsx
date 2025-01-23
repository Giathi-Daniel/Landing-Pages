

const New = () => {
  return (
    <div className="relative flex items-center space-x-4 justify-center py-2 px-4 bg-white md:h-12 h-16">
        <div className="w-[3rem] h-auto absolute top-[-1rem] ml-[-90%]">
            <img src="/images/coffee-standing.png" alt="coffee-standing image" className="w-full h-auto" />
        </div>
        <div className="relative flex items-center justify-center gap-2">
            <h1 className="text-secondary md:text-2xl text-lg font-semibold">NEW:</h1>
            <p className="flex md:flex-row md:text-lg md:mt-7 mt-18 h-full text-sm flex-col">
                Try our &nbsp;
                 <span className="underline cursor-pointer">
                    Bulk resize 
                </span>
                &nbsp;
                tool to resize multiple images.
            </p>
        </div>
    </div>
  )
}

export default New