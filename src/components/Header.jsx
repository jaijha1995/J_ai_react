

import React, { useState, useRef, useEffect } from "react";
import { FiBell, FiSearch, FiUser } from "react-icons/fi";
import { MdLightMode } from "react-icons/md";
import { IoLanguage } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { resetLogin } from "../redux/slices/loginSlice";
import { useDispatch } from "react-redux";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Close menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("role");
  dispatch(resetLogin()); // Optional if using Redux
  navigate("/login");
  
};
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow relative">
      {/* Search Bar */}
      <div className="relative w-full max-w-xs">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
          <FiSearch />
        </span>
        <input
          type="text"
          placeholder="Search [CTRL + K]"
          className="w-full pl-10 pr-4 py-2 rounded-md text-black  focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Icons */}
      <div className="flex items-center gap-4 relative">
        <MdLightMode className="text-xl cursor-pointer text-black" />
        <IoLanguage className="text-xl cursor-pointer text-black" />
        <FiBell className="text-xl cursor-pointer text-black" />

        {/* User Icon with Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <FiUser
            className="text-xl cursor-pointer text-black"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          />

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black font-semibold border rounded shadow z-10">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => navigate("/profile")} // Adjust as needed
              >
                Profile
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}



// List some of the commoly command used in shell 
//ls, cp , vim , touch, mkdir, grep , cat, cd , pwd, find, rm mv, echo, 
// history, clear, man 

//write a simple shell script all procees
// ps -ef
// ps -ef | awk -F " " '{print $2}'

// write a script to print only errors from a remote log
// curl "url" | grep "ERROR" > errors.log

// write a script to print the top 10 memory consuming processes
// ps aux --sort=-%mem | head -m 10

// write a script to print the numbers divided by 3 & 5 and not 15
// for i in {1..100}; do
//   if( ((i%3 ==0)) && ((i%5==0)) && ((i%15 !=0))); then
// echo $i
//fi
//done


// write a script to print the current date and time in the format "YYYY-MM-DD HH:MM:SS"
// date +"%Y-%m-%d %H:%M:%S" 


 // wite a script to print numbe of "S" in a string
 // str="Hello, this is a sample String with some S"
 // count=$(echo "$str" | grep -o  "S" | )
 // grep -o "s" <<<$str | wc -l

//how will you debug the shell script
// set -x , set -o , set -e 


// what is the deiffrenace between hard link and soft link
// Hard link: Points to the same inode as the original file, shares the same data blocks, and has the same permissions. Deleting the original file does not delete the hard link.
// Soft link (Symbolic link): Points to the original file's path, can cross file systems, and has its own inode. Deleting the original file makes the soft link invalid.

// you have been assign a vpc architecture for a 2-tier apploication
// The application need to high available and scalbel how would you design the vpc arc 

// Your organization has a VPC with multiple subnets.
// You want to restrict outbound interner access for resources in one subnet 
// but allo allow outbound internet access fro resouce in another
// How would you achive

// You have a VPC with a public and private subnet Instance in the 
// Private subnet neet to access the internet for software updates
// How would you achive to do this 