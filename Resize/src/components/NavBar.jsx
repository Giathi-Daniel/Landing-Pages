import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FiMenu, FiXCircle } from 'react-icons/fi'; // Import FiXCircle here
import DropdownMenu from './DropdownMenu';

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle the mobile menu visibility
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  return (
    <nav className="h-[4rem] bg-dark flex items-center justify-between px-4 py-2 z-50 relative">
      <a href="/" className="text-white font-semibold text-xl">SnapTools</a>

      {/* Hamburger Menu (only visible on mobile) */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMobileMenu} className="text-white">
          {isMobileMenuOpen ? <FiXCircle size={24} /> : <FiMenu size={24} />} {/* Use FiXCircle here */}
        </button>
      </div>

      {/* Desktop Menu (visible on larger screens) */}
      <div className="hidden md:flex items-center justify-center gap-4 text-text text-base">
        <Link
          to={'/'}
          className="hover:bg-darkLight px-4 py-3 rounded-lg hover:text-white transition-all"
        >
          Resize
        </Link>

        <Link
          to={'/crop'}
          className="hover:bg-darkLight px-4 py-3 rounded-lg hover:text-white transition-all"
        >
          Crop
        </Link>

        <Link
          to={'/bulk'}
          className="hover:bg-darkLight px-4 py-3 rounded-lg hover:text-white transition-all"
        >
          Bulk resize
        </Link>

        <Link
          to={'/compress'}
          className="hover:bg-darkLight px-4 py-3 rounded-lg hover:text-white transition-all"
        >
          Compress
        </Link>

        <Link
          to={'/convert'}
          className="hover:bg-darkLight px-4 py-3 rounded-lg hover:text-white transition-all"
        >
          Convert
        </Link>

        <Link
          to={'/watermark'}
          className="hover:bg-darkLight px-4 py-3 rounded-lg hover:text-white transition-all"
        >
          Watermark
        </Link>

        <DropdownMenu />
      </div>

      {/* Mobile Menu (visible when mobile menu is open) */}
      <div
        className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} absolute top-[4rem] left-0 w-full bg-dark px-4 py-3 z-50`}
      >
        <Link
          to={'/'}
          className="block text-white py-3 hover:bg-darkLight rounded-lg"
          onClick={() => setIsMobileMenuOpen(false)} // Close menu when clicked
        >
          Resize
        </Link>
        <Link
          to={'/crop'}
          className="block text-white py-3 hover:bg-darkLight rounded-lg"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Crop
        </Link>
        <Link
          to={'/bulk'}
          className="block text-white py-3 hover:bg-darkLight rounded-lg"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Bulk resize
        </Link>
        <Link
          to={'/compress'}
          className="block text-white py-3 hover:bg-darkLight rounded-lg"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Compress
        </Link>
        <Link
          to={'/convert'}
          className="block text-white py-3 hover:bg-darkLight rounded-lg"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Convert
        </Link>
        <Link
          to={'/watermark'}
          className="block text-white py-3 hover:bg-darkLight rounded-lg"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Watermark
        </Link>
        <DropdownMenu />
      </div>
    </nav>
  );
};

export default NavBar;
