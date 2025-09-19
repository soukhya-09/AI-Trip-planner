import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { PageContext } from './Pagecontext';
import { motion } from 'framer-motion';

// Hero component with nicer UI, gradient background, subtle motion and accessible markup
export default function Home() {
  const { currentPage, setCurrentPage } = useContext(PageContext);

  const container = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 0.08, duration: 0.6 } }
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { ease: 'easeOut', duration: 0.5 } }
  }

  const buttonTap = { scale: 0.98 }

  return (
    <motion.div
      className="min-h-[62vh] flex items-center justify-center p-6 bg-gradient-to-b from-indigo-50 via-sky-50 to-rose-50"
      initial="hidden"
      animate="show"
      variants={container}
    >
      <motion.section
        variants={fadeUp}
        className="w-full max-w-4xl rounded-3xl shadow-2xl bg-white/80 backdrop-blur-md border border-white/60 p-8 md:p-12"
        aria-labelledby="home-heading"
      >
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Left column: text */}
          <div className="flex-1">
            <motion.h1
              variants={fadeUp}
              id="home-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-gradient bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(90deg,#0ea5e9,#7c3aed,#fb7185)'
              }}
            >
              Jobs fill your pockets — adventures fill your soul.
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-4 text-gray-700 text-lg md:text-xl tracking-wide">
              Welcome to your AI-powered travel companion! Whether it's a calm beach, a wild trek or a budget-friendly escape,
              our planner builds smart itineraries tailored to you.
            </motion.p>

            <motion.p variants={fadeUp} className="mt-3 text-gray-600">
              Tell us where you want to go and let AI craft the perfect trip. 🌍✨
            </motion.p>

            <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-3 items-center">
              <Link to="/planner" onClick={() => setCurrentPage('planner')}>
                <motion.button whileTap={buttonTap} whileHover={{ scale: 1.02 }} className="inline-flex items-center gap-3 bg-gradient-to-r from-sky-600 to-violet-600 text-white px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-sky-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                    <path d="M10.94 2.94a1 1 0 00-1.88 0l-1 2.5A1 1 0 009 7h2a1 1 0 00.94-.56l1-2.5zM6 9a2 2 0 00-2 2v5a1 1 0 001 1h10a1 1 0 001-1v-5a2 2 0 00-2-2H6z" />
                  </svg>
                  Get started — it's free
                </motion.button>
              </Link>

              <motion.a
                href="#learn-more"
                variants={fadeUp}
                className="text-sm text-slate-700 hover:underline"
              >
                Learn how it works →
              </motion.a>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-gray-600">
              <div className="p-3 rounded-lg bg-white/60 border border-white/50">AI itinerary in minutes</div>
              <div className="p-3 rounded-lg bg-white/60 border border-white/50">Budget & duration aware</div>
              <div className="p-3 rounded-lg bg-white/60 border border-white/50">Local tips & maps</div>
            </motion.div>
          </div>

          {/* Right column: decorative card with tiny animation */}
          <div className="w-full md:w-80 lg:w-96">
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="rounded-2xl overflow-hidden shadow-2xl border border-white/50 bg-gradient-to-br from-white to-sky-50"
            >
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold text-sky-600">Sample 3-day trip</p>
                    <h3 className="text-lg font-bold text-slate-800">Goa — Sun, sand & seafood</h3>
                  </div>
                  <div className="text-right text-sm text-gray-500">Est. budget<br /><span className="font-bold text-slate-800">₹12,500</span></div>
                </div>

                <ul className="mt-4 space-y-3 text-sm text-gray-700">
                  <li className="flex items-center gap-3">
                    <span className="inline-block px-2 py-1 rounded bg-sky-100 text-sky-700 text-xs">Day 1</span>
                    Beach day + sunset cruise
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="inline-block px-2 py-1 rounded bg-rose-100 text-rose-600 text-xs">Day 2</span>
                    Spice farm & local market
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="inline-block px-2 py-1 rounded bg-violet-100 text-violet-700 text-xs">Day 3</span>
                    Water sports & chill
                  </li>
                </ul>

                <div className="mt-5 flex items-center justify-between">
                  <div className="text-xs text-gray-500">Customizable • AI suggestions</div>
                  <motion.button whileTap={buttonTap} className="px-3 py-1 bg-white rounded-full text-sm border">Preview</motion.button>
                </div>
              </div>
            </motion.div>

            <motion.div className="mt-4 text-center text-xs text-gray-500">Tip: Try different moods (Relaxing, Adventure, Budget) for varied plans.</motion.div>
          </div>
        </div>

        {/* Decorative separator */}
        <div id="learn-more" className="mt-8 border-t border-dashed border-gray-200 pt-6">
          <motion.h4 variants={fadeUp} className="text-sm text-slate-600">How it works</motion.h4>
          <motion.p variants={fadeUp} className="mt-2 text-gray-600 text-sm">Answer a few quick questions and our AI produces a day-by-day plan, packing list and budget estimates — ready to export or edit.</motion.p>
        </div>
      </motion.section>
    </motion.div>
  )
}
