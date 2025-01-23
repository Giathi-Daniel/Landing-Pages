import { useState } from "react";

const CustomCheckBox = () => {
  const [checked, setChecked] = useState(false);
  const toggleChecked = () => {
    setChecked(!checked);
  };

  return (
    <label className="flex items-center space-x-2 cursor-pointer">
        <input 
        type="checkbox" 
        name="pixel" 
        className="hidden" 
        checked={checked} 
        onChange={toggleChecked}
        />
        <div
        className={`w-[1.5rem] h-[1.5rem] rounded-md flex items-center justify-center relative 
            ${checked ? "bg-secondary border-none" : "bg-transparent border-2 border-border"}`}
        >
        {/* Visible checkmark when checked */}
        {checked && (
            <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-4 h-4 text-white"
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
        )}
        </div>

    </label>
  )
}

export default CustomCheckBox