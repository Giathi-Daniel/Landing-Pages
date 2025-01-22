const Footer = () => {
  return (
    <footer className="flex flex-col md:flex-row md:items-center justify-between px-8 h-[5rem] py-3 text-white bg-secondary border border-b-0 border-l-0 mt-10 border-t-borderLight">
        <h1 className="text-base">&copy; <span className="font-bold">Resize</span>.com</h1>
        <div className="md:text-base text-sm flex gap-4">
            <a href="#" className="hover:underline transition-all">Privacy</a>
            <a href="#" className="hover:underline transition-all">Terms</a>
            <a href="#" className="hover:underline transition-all">Cookies</a>
            <div className="flex items-center gap-4">
              <img src="/images/icons/x.svg" alt="x-logo" className="md:w-6 w-4 cursor-pointer"/>
              <img src="/images/icons/youtube.svg" alt="youtube-logo" className="md:w-6 w-4 cursor-pointer" />
            </div>
        </div>
    </footer>
  )
}

export default Footer