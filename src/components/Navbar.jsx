import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import toast from "react-hot-toast";
import Web3 from "web3";
import { useRecoilState } from "recoil";
import { accountNameState } from "../utils/State";

const Navbar = ({ isSidebarOpen, setSidebarOpen }) => {
  const [account, setAccount] = useRecoilState(accountNameState);

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });

        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        const selectedAccount = accounts[0];

        setAccount(selectedAccount);
        localStorage.setItem('walletAccountName', selectedAccount);
        toast.success("Wallet connected successfully!");
      } else {
        toast.error(
          "MetaMask not installed. Please install MetaMask to connect your wallet."
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to connect wallet. Please try again later.");
    }
  };

  const disconnectWallet = () => {
    setAccount("");
    toast.success("Wallet disconnected successfully!");
  };

  return (
    <div className="fixed top-0 w-screen bg-[#111827] text-white h-[80px] flex items-center justify-between">
      <span
        className="text-white text-4xl top-5 left-4 cursor-pointer m-2"
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      >
        <RxHamburgerMenu className="px-2 bg-gray-900 rounded-md" />
      </span>
      {account === '' ? (
        <button
          className="mr-12 bg-blue-500 p-2 rounded-lg	hover:bg-violet-600 duration-300 hover:scale-110 font-semibold"
          onClick={connectWallet}
        >
          Connect to Wallet
        </button>
      ) : (
        <button
          className="mr-12 bg-red-500 p-2 rounded-lg	hover:bg-red-600 duration-300 hover:scale-110 font-semibold"
          onClick={disconnectWallet}
        >
          Disconnect
        </button>
      )}
    </div>
  );
};

export default Navbar;
