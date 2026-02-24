import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900 bg-opacity-75 backdrop-blur-sm">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-yellow-400 border-l-transparent border-r-transparent"></div>
    </div>
  );
};

export default Loader;
