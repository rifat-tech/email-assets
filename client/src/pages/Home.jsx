import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/api';
import ProductGrid from '../components/ProductGrid';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      const response = await getProducts({ sort: 'rating' });
      setProducts(response.data.slice(0, 6));
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-500 to-secondary-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Welcome to SPORTY
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Your ultimate destination for premium sports equipment, clothing, and accessories
            </p>
            <Link
              to="/products"
              className="inline-block px-8 py-4 bg-white text-primary-600 font-bold rounded-lg hover:bg-gray-100 transition-colors text-lg"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cricket */}
            <Link
              to="/products?category=Cricket"
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
            >
              <div className="h-64 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-3xl font-bold mb-2">Cricket</h3>
                  <p className="text-lg">Bats, Balls & More</p>
                </div>
              </div>
            </Link>

            {/* Clothing */}
            <Link
              to="/products?category=Clothing"
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
            >
              <div className="h-64 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-3xl font-bold mb-2">Clothing</h3>
                  <p className="text-lg">Jerseys, Tees & Hoodies</p>
                </div>
              </div>
            </Link>

            {/* Accessories */}
            <Link
              to="/products?category=Accessories"
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
            >
              <div className="h-64 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-3xl font-bold mb-2">Accessories</h3>
                  <p className="text-lg">Bags, Caps & Gear</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
            <Link
              to="/products"
              className="text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-2"
            >
              View All
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <ProductGrid products={products} loading={loading} />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Products</h3>
              <p className="text-gray-600">Premium sports equipment from trusted brands</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Best Prices</h3>
              <p className="text-gray-600">Competitive pricing on all products</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick and reliable shipping nationwide</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
