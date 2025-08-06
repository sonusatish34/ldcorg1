'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, Menu } from 'lucide-react';
import Link from 'next/link';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from 'next/router';

export default function Hamb() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter()
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <header className="flex justify-between items-center px-4 py-3 bg-white shadow-md fixed top-0 left-0 right-0 z-50">
        <div className='flex items-center gap-4'>
          <p onClick={() => { router.back() }} className=''><IoMdArrowRoundBack size={30} /></p>
          <button onClick={toggleMenu} className="text-black">
            <Menu className="w-6 h-6" />
          </button>
        </div>


        <Link href={'/trip-advisor'} className="flex items-center space-x-2">
          <img
            src="https://t3.ftcdn.net/jpg/02/69/42/36/360_F_269423638_jepNihmU5FTioV01TkLIxZA5fuEKQcD0.jpg"
            alt="Logo"
            width={35}
            height={35}
            className='scale-150'
          />
        </Link>

        <h3>Login</h3>
      </header>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={toggleMenu}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-[80%] max-w-xs bg-white shadow-lg z-50 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <div className="text-sm font-medium">🌍 India, EN | INR</div>
          <button onClick={toggleMenu}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-4   text-gray-800 font-medium">
          <ul className="flex flex-col gap-y-3">
            <li>Write a Review</li>
            <li>Trips</li>
            <li>Travellers' Choice</li>
            <li>Travel Stories</li>
            {/* <li className="border-t pt-2">Hotels</li> */}
            <li>Things to Do</li>
            <li>Holiday Homes</li>
            <li className="border-t pt-2">Post Photos</li>
            <li>Contact Us</li>
            <li>About</li>
            <li>Forums</li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
