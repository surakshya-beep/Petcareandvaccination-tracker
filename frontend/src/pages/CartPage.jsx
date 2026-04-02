import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Trash2, Plus, Minus, ShoppingCart, ArrowLeft } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import useCartStore from '../store/cartStore'

const CartPage = () => {
  const cart = useCartStore(state => state.cart)
  const removeFromCart = useCartStore(state => state.removeFromCart)
  const updateQuantity = useCartStore(state => state.updateQuantity)
  const clearCart = useCartStore(state => state.clearCart)

  // Calculate totals
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  const tax = subtotal * 0.13
  const shipping = cart.length > 0 ? 150 : 0
  const total = subtotal + tax + shipping

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Navbar />

      <div className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold mb-6"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Shop
            </Link>

            <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
              Shopping Cart
            </h1>
          </motion.div>

          {cart.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-slate-900">
                      Items ({cart.length})
                    </h2>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={clearCart}
                      className="text-sm text-danger-600 hover:text-danger-700 font-semibold"
                    >
                      Clear Cart
                    </motion.button>
                  </div>

                  <div className="space-y-4">
                    {cart.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200 hover:shadow-md transition"
                      >
                        {/* Product Image */}
                        <div className="flex-shrink-0 w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center text-4xl">
                          {item.image}
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900 mb-1">
                            {item.name}
                          </h3>
                          <p className="text-sm text-slate-600 mb-2">
                            {item.category}
                          </p>
                          <p className="text-lg font-bold text-primary-600">
                            Rs. {item.price.toLocaleString('en-IN')}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex-shrink-0 flex flex-col items-end gap-4">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 hover:bg-slate-200 rounded-lg transition"
                          >
                            <Trash2 className="w-5 h-5 text-danger-600" />
                          </motion.button>

                          <div className="flex items-center gap-2 bg-white border border-slate-300 rounded-lg">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:bg-slate-100"
                            >
                              <Minus className="w-4 h-4 text-slate-600" />
                            </motion.button>
                            <span className="px-3 font-semibold text-slate-900 min-w-[2rem] text-center">
                              {item.quantity}
                            </span>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:bg-slate-100"
                            >
                              <Plus className="w-4 h-4 text-slate-600" />
                            </motion.button>
                          </div>

                          <p className="font-semibold text-slate-900">
                            Rs. {(item.price * item.quantity).toLocaleString('en-IN')}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="card p-6 h-fit sticky top-24"
              >
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6 pb-6 border-b border-slate-200">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Subtotal</span>
                    <span className="font-semibold text-slate-900">
                      Rs. {subtotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Tax (13%)</span>
                    <span className="font-semibold text-slate-900">
                      Rs. {tax.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Shipping</span>
                    <span className="font-semibold text-slate-900">
                      Rs. {shipping.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between mb-6 text-xl font-bold text-slate-900">
                  <span>Total</span>
                  <span className="text-primary-600">
                    Rs. {total.toLocaleString('en-IN')}
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary w-full py-3 font-semibold mb-3"
                >
                  Proceed to Checkout
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-4 py-3 bg-slate-200 hover:bg-slate-300 text-slate-900 font-semibold rounded-lg transition"
                >
                  Continue Shopping
                </motion.button>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-slate-600">
                    ✨ <span className="font-semibold">Free shipping</span> on orders over Rs. 5000!
                  </p>
                </div>
              </motion.div>
            </div>
          ) : (
            /* Empty Cart */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card p-12 text-center"
            >
              <ShoppingCart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-2xl text-slate-600 font-semibold mb-2">
                Your cart is empty
              </p>
              <p className="text-slate-500 mb-6">
                Start shopping to add items to your cart
              </p>
              <Link to="/shop">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Continue Shopping
                </motion.button>
              </Link>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default CartPage
