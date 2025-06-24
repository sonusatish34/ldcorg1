'use client'
import { useEffect, useState } from 'react';

const tabs = ['overview', 'details', 'itinerary', 'operator', 'reviews'];

export default function StickyTabs() {
  const [activeTab, setActiveTab] = useState('Overview');

 useEffect(() => {
  const handleScroll = () => {
    const offsets = tabs.map(tab => {
      const el = document.getElementById(tab.toLowerCase());
      return { tab, offset: el?.getBoundingClientRect().top ?? Infinity };
    });

    const visibleSections = offsets.filter(({ offset }) => offset < 100);
    if (visibleSections.length > 0) {
      const current = visibleSections[visibleSections.length - 1];
      setActiveTab(current.tab);
    }
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);


  const scrollToSection = (id) => {
    const section = document.getElementById(id.toLowerCase());
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  console.log(activeTab, 'activeTab');
  // console.log(tab, '-------tab');
  

  return (
    <div className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <div className="flex overflow-x-auto scrollbar-hide text-sm sm:text-base">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => scrollToSection(tab)}
            className={`flex-1 text-center py-3 px-4 font-medium capitalize ${
              activeTab === tab ? 'border-b-2 border-black text-black' : 'text-gray-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
