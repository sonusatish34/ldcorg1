// components/Popup.js

import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';  // Import SweetAlert2

const Popup = () => {
  const [isVisible, setIsVisible] = useState(true);

  // Show SweetAlert2 popup after 5 seconds (or on any event you prefer)
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        Swal.fire({
          title: 'Download our app!',
          text: 'Get 500 off on your first booking!',
          icon: 'info',
          showCancelButton: true,
          confirmButtonText: 'Download Now',
          cancelButtonText: 'Close',
          customClass: {
            popup: 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white',
            confirmButton: 'bg-purple-600 hover:bg-purple-700',
            cancelButton: 'bg-transparent text-white hover:bg-white hover:text-gray-700',
          },
        }).then((result) => {
          if (result.isConfirmed) {
            // Action for when the user clicks "Download Now"
            window.location.href = '#'; // Replace with actual download link
          }
        });
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return null; // No need to render anything, SweetAlert2 takes over
};

export default Popup;
