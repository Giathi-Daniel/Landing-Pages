import { useState } from 'react';

function HoverClickGrid() {
  const [selectedIndex, setSelectedIndex] = useState(null); // Track the selected span index

  const handleClick = (index) => {
    setSelectedIndex(index); // Set the clicked span as selected
  };

  return (
    <div className='w-full'>
        <h1 className='text-white font-semibold text-xl mb-3'>Logo Placement</h1>
        <div className="grid grid-cols-3 border-2 border-borderLight rounded-lg w-full">
            {new Array(9).fill(null).map((_, index) => (
                <div
                key={index}
                className="flex items-center justify-center border border-border w-full h-auto py-5" // Cell for each span
                >
                <span
                    className={`w-4 h-4 cursor-pointer rounded-full 
                    ${selectedIndex === index ? 'bg-secondary' : 'bg-white'} 
                    hover:bg-secondary transition-all duration-200`}
                    onClick={() => handleClick(index)} // Handle the click event for each span
                />
                </div>
            ))}
            </div>
    </div>
  );
}

export default HoverClickGrid;
