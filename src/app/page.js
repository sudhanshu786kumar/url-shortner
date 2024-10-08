'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import UrlShortener from './components/UrlShortener'
import UrlList from './components/UrlList'
import AppDescription from './components/AppDescription'
import Footer from './components/Footer'
import PageLoader from './components/PageLoader'

export default function Home() {
  const [urls, setUrls] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000) // Simulating page load
  }, [])

  const addUrl = (url) => {
    setUrls([...urls, url])
  }

  return (
    <AnimatePresence>
      {isLoading ? (
        <PageLoader key="loader" />
      ) : (
        <motion.main
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex flex-col"
        >
          <div className="container mx-auto px-4 py-8 flex-grow">
            <motion.h1 
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-extrabold text-center text-white mb-8"
            >
              Modern URL Shortener
            </motion.h1>
            <AppDescription />
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow-2xl p-4 md:p-8"
            >
              <UrlShortener onUrlAdded={addUrl} />
              <UrlList urls={urls} />
            </motion.div>
          </div>
          <Footer />
        </motion.main>
      )}
    </AnimatePresence>
  )
}