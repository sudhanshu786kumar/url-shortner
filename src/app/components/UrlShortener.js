'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { db } from '../../lib/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { nanoid } from 'nanoid'
import { FaLink, FaSpinner, FaCheck } from 'react-icons/fa'

export default function UrlShortener({ onUrlAdded }) {
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const shortenUrl = async (e) => {
    e.preventDefault()
    if (!url) return

    setIsLoading(true)
    setIsSuccess(false)

    try {
      const shortCode = nanoid(6)
      await setDoc(doc(db, 'urls', shortCode), {
        originalUrl: url,
        createdAt: new Date().toISOString()
      })

      console.log('URL shortened:', { shortCode, originalUrl: url });
      onUrlAdded({ id: shortCode, originalUrl: url, shortCode })
      setUrl('')
      setIsSuccess(true)
      setTimeout(() => setIsSuccess(false), 3000)
    } catch (error) {
      console.error('Error adding document: ', error.message, error.code);
      // Display error to user
      setIsSuccess(false);
      // You might want to set an error state here and display it in the UI
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={shortenUrl} className="mb-8">
      <div className="relative">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter a URL to shorten"
          className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          required
        />
        <FaLink className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      <motion.button
        type="submit"
        className="mt-4 w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={isLoading || !url}
      >
        {isLoading ? (
          <FaSpinner className="animate-spin mr-2" />
        ) : isSuccess ? (
          <FaCheck className="mr-2" />
        ) : (
          <FaLink className="mr-2" />
        )}
        {isLoading ? 'Shortening...' : isSuccess ? 'URL Shortened!' : 'Shorten URL'}
      </motion.button>
    </form>
  )
}
