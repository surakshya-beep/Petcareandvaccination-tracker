import React from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Star, Heart } from 'lucide-react'
import useCartStore from '../store/cartStore'

const ProductCard = ({ product }) => {
  const addToCart = useCartStore(state => state.addToCart)
  const [isFavorited, setIsFavorited] = React.useState(false)

  const handleAddToCart = () => {
    addToCart(product)
  }

  return (
    <motion.div
      whileHover={{ y: -8, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}
      className="card overflow-hidden bg-white h-full flex flex-col transition-all duration-300"
    >
      {/* Product Image Section */}
      <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center overflow-hidden group">
        <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
          {product.image}
        </span>
        
        {/* Stock Badge */}
        <div className="absolute top-3 right-3">
          {product.inStock ? (
            <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              In Stock
            </span>
          ) : (
            <span className="bg-slate-400 text-white text-xs font-bold px-3 py-1 rounded-full">
              Out of Stock
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorited(!isFavorited)}
          className="absolute top-3 left-3 p-2 bg-white rounded-full shadow-md hover:bg-slate-50 transition"
        >
          <Heart
            className={`w-5 h-5 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-slate-400'}`}
          />
        </button>
      </div>

      {/* Product Details */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Category */}
        <span className="text-xs font-semibold text-primary-600 uppercase tracking-wide mb-2">
          {product.category}
        </span>

        {/* Product Name */}
        <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-600 mb-3 line-clamp-2 flex-1">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-slate-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-slate-600">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price and Button */}
        <div className="flex items-center justify-between gap-3 mt-auto pt-4 border-t border-slate-200">
          <div>
            <p className="text-2xl font-bold text-slate-900">
              Rs. {product.price.toLocaleString('en-IN')}
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`p-3 rounded-lg transition ${
              product.inStock
                ? 'bg-primary-600 hover:bg-primary-700 text-white'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard
