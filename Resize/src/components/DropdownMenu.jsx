import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronDown } from 'react-icons/fi';

function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false); // Track whether the dropdown is open
  const dropdownRef = useRef(null); // Reference to the dropdown container

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState); // Toggle the dropdown visibility on click
  };

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) && 
        !event.target.closest('a') // Ignore clicks on <a> tags inside the dropdown
      ) {
        setIsOpen(false); // Close the dropdown if the click is outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={toggleDropdown} 
        className="px-4 py-3 rounded-lg text-white cursor-pointer flex items-center gap-2 hover:bg-darkLight transition-all"
      >
        Features <FiChevronDown />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-[3rem] bg-menu rounded-lg py-1 flex items-center flex-col w-[12rem] z-9">
          <Link
            to={'/add-text'}
            className="hover:bg-gray-500 w-full px-4 py-3 transition-all"
          >
            Add text
          </Link>
          <Link
            to={'/black-white'}
            className="hover:bg-gray-500 w-full px-4 py-3 transition-all"
          >
            Black and White
          </Link>
          <Link
            to={'/mirror-flip'}
            className="hover:bg-gray-500 w-full px-4 py-2 transition-all"
          >
            Mirror and flip
          </Link>
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
