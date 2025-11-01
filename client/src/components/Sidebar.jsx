import React from 'react';

const Sidebar = ({ selectedCategory, onCategoryChange }) => {
  const categories = ['All', 'Cricket', 'Clothing', 'Accessories'];

  return (
    <aside className="bg-white rounded-lg shadow-md p-6 h-fit sticky top-24">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Categories</h2>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category}>
            <button
              onClick={() => onCategoryChange(category)}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-primary-500 to-secondary-600 text-white font-semibold'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>

      {/* Filter Section */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Price Range</h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer">
            <input type="checkbox" className="rounded text-primary-500 focus:ring-primary-500" />
            <span>Under $25</span>
          </label>
          <label className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer">
            <input type="checkbox" className="rounded text-primary-500 focus:ring-primary-500" />
            <span>$25 - $50</span>
          </label>
          <label className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer">
            <input type="checkbox" className="rounded text-primary-500 focus:ring-primary-500" />
            <span>$50 - $100</span>
          </label>
          <label className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer">
            <input type="checkbox" className="rounded text-primary-500 focus:ring-primary-500" />
            <span>Over $100</span>
          </label>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Rating</h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer">
              <input type="checkbox" className="rounded text-primary-500 focus:ring-primary-500" />
              <span className="flex items-center">
                {rating}
                <svg className="w-4 h-4 text-yellow-400 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                & up
              </span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
