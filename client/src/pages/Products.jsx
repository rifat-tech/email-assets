import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../services/api';
import Sidebar from '../components/Sidebar';
import ProductGrid from '../components/ProductGrid';

const Products = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');
    
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    
    fetchProducts(categoryParam || selectedCategory, searchParam);
  }, [searchParams]);

  useEffect(() => {
    if (!searchParams.get('category')) {
      fetchProducts(selectedCategory);
    }
  }, [selectedCategory, sortBy]);

  const fetchProducts = async (category = 'All', search = '') => {
    try {
      setLoading(true);
      const params = {};
      
      if (category && category !== 'All') {
        params.category = category;
      }
      
      if (search) {
        params.search = search;
      }
      
      if (sortBy) {
        params.sort = sortBy;
      }

      const response = await getProducts(params);
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">All Products</h1>
          <p className="text-gray-600">
            Browse our complete collection of sports equipment and gear
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <Sidebar
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="text-gray-600">
                {loading ? (
                  <span>Loading products...</span>
                ) : (
                  <span>
                    Showing <strong>{products.length}</strong> products
                  </span>
                )}
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-gray-700 font-medium">
                  Sort by:
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={handleSortChange}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Default</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            {/* Products Grid */}
            <ProductGrid products={products} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
