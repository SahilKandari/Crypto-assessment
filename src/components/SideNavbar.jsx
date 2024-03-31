import React, { useState } from 'react';
import { BsAppIndicator } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { IoArrowBack, IoHome, IoBookmarks, IoLogOutSharp, IoChatbubbleEllipses } from "react-icons/io5";
import { MdCurrencyBitcoin } from "react-icons/md";

const SideNavbar = ({ active, setActive, isSidebarOpen, setSidebarOpen }) => {
  const [isSubMenuOpen, setSubMenuOpen] = useState(false);

  const toggleSubMenu = () => {
    setSubMenuOpen(!isSubMenuOpen);
  };

  return (
    <div className={`sidebar ${isSidebarOpen ? "open" : ""} duration-500`}>
      <div className="sidebar-content p-2 w-[300px] overflow-y-auto text-center bg-gray-900 h-[calc(100vh-80px)]">
        <div className="text-gray-100 text-xl">
          <div className="p-2.5 mt-1 flex items-center">
            <MdCurrencyBitcoin className="px-0.5 py-0.5 rounded-md bg-blue-600 text-lg" />
            <h1 className="font-bold text-gray-200 text-[15px] ml-3">Crypto</h1>
            <IoArrowBack className="bi-x cursor-pointer ml-auto" onClick={() => setSidebarOpen(!isSidebarOpen)} />
          </div>
          <div className="my-2 bg-gray-600 h-[1px]"></div>
        </div>
        <div className="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700 text-white">
          <CiSearch />
          <input type="text" placeholder="Search" className="text-[15px] ml-4 w-full bg-transparent focus:outline-none" />
        </div>
        <div onClick={() => setActive(0)} className={`p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-500 text-white ${active === 0 ? 'bg-blue-600' : ''}`}>
          <IoHome  />
          <span className="text-[15px] ml-4 text-gray-200 font-bold">Home</span>
        </div>
        <div onClick={() => setActive(1)} className={`p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-500 text-white ${active === 1 ? 'bg-blue-600' : ''}`}>
          <MdCurrencyBitcoin  />
          <span className="text-[15px] ml-4 text-gray-200 font-bold">Crypto Currency</span>
        </div>
        <div className="my-4 bg-gray-600 h-[1px]"></div>
        <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-500 text-white" onClick={toggleSubMenu}>
          <IoChatbubbleEllipses />
          <div className="flex justify-between w-full items-center">
            <span className="text-[15px] ml-4 text-gray-200 font-bold">Chatbox</span>
            <span className={`text-sm ${isSubMenuOpen ? "rotate-180" : ""}`}>
              <BsAppIndicator />
            </span>
          </div>
        </div>
        <div className={`text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold ${isSubMenuOpen ? "" : "hidden"}`} id="submenu">
          <h1 onClick={() => setActive(3)} className={`cursor-pointer p-2 hover:bg-blue-500 rounded-md mt-1 ${active === 3 ? 'bg-blue-600' : ''}`}>Social</h1>
          <h1 onClick={() => setActive(4)} className={`cursor-pointer p-2 hover:bg-blue-500 rounded-md mt-1 ${active === 4 ? 'bg-blue-600' : ''}`}>Personal</h1>
          <h1 onClick={() => setActive(5)} className={`cursor-pointer p-2 hover:bg-blue-500 rounded-md mt-1 ${active === 5 ? 'bg-blue-600' : ''}`}>Friends</h1>
        </div>
        <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-500 text-white">
          <IoLogOutSharp />
          <span className="text-[15px] ml-4 text-gray-200 font-bold">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default SideNavbar;
