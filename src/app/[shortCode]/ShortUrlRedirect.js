'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSpinner, FaLink, FaExclamationTriangle, FaHome } from 'react-icons/fa';

export default function ShortUrlRedirect({ shortCode }) {
  const router = useRouter();
  const [status, setStatus] = useState('Redirecting...');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/${shortCode}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok');
      })
      .then(data => {
        if (data.originalUrl) {
          setStatus('Redirecting you to your destination...');
          setTimeout(() => {
            window.location.href = data.originalUrl;
          }, 3000); // Delay for animation
        } else {
          setStatus('Short URL not found. Redirecting to home...');
          setTimeout(() => router.push('/'), 3000);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setStatus('An error occurred. Redirecting to home...');
        setTimeout(() => router.push('/'), 3000);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [shortCode, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
      <AnimatePresence>
        {isLoading ? (
          <LoadingAnimation key="loading" />
        ) : (
          <RedirectMessage key="message" status={status} />
        )}
      </AnimatePresence>
    </div>
  );
}

function LoadingAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      className="text-white text-center"
    >
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 1,
          ease: "linear",
          repeat: Infinity,
        }}
        className="text-6xl mb-4"
      >
        <FaSpinner />
      </motion.div>
      <motion.h2
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-2xl font-bold"
      >
        Loading...
      </motion.h2>
    </motion.div>
  );
}

function RedirectMessage({ status }) {
  const getIcon = () => {
    if (status.includes('destination')) return <FaLink />;
    if (status.includes('not found')) return <FaExclamationTriangle />;
    if (status.includes('error')) return <FaExclamationTriangle />;
    return <FaHome />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full mx-4"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="text-5xl mb-4 text-purple-500 flex justify-center"
      >
        {getIcon()}
      </motion.div>
      <motion.h1
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="text-3xl font-bold mb-4 text-gray-800 text-center"
      >
        {status}
      </motion.h1>
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        className="w-16 h-16 border-4 border-purple-500 rounded-full mx-auto mt-6 flex items-center justify-center"
      >
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1,
            ease: "linear",
            repeat: Infinity,
          }}
          className="w-12 h-12 border-4 border-pink-500 rounded-full border-t-transparent"
        />
      </motion.div>
    </motion.div>
  );
}
