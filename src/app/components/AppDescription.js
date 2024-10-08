import { motion } from 'framer-motion'

export default function AppDescription() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="text-white text-center mb-12"
    >
      <h2 className="text-2xl font-bold mb-4">Why Use Our URL Shortener?</h2>
      <ul className="list-disc list-inside">
        <li>Create concise, shareable links</li>
        <li>Track click statistics for your shortened URLs</li>
        <li>Customize short links for brand consistency</li>
        <li>Improve link aesthetics for social media sharing</li>
      </ul>
    </motion.div>
  )
}
