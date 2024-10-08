import { motion } from 'framer-motion'

export default function UrlList({ urls }) {
  return (
    <ul className="space-y-4">
      {urls.map((url, index) => (
        <motion.li 
          key={url.id} 
          className="bg-white p-4 rounded shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <p className="text-sm text-gray-500">Original URL: {url.originalUrl}</p>
          <p className="text-lg font-semibold">
            Short URL: <a href={`/${url.shortCode}`} target="_blank" rel="noopener noreferrer">{`${window.location.origin}/${url.shortCode}`}</a>
          </p>
        </motion.li>
      ))}
    </ul>
  )
}
