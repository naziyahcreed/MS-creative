import { motion } from 'framer-motion'
import { useReducedMotion } from '../../../hooks/useReducedMotion'

export default function CurtainReveal({ active }) {
  const reduced = useReducedMotion()
  if (!active || reduced) return null

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[110] overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 0.85 }}
    >
      <motion.div
        className="absolute inset-x-[8%] top-[12%] bottom-[12%] origin-center rounded-sm border border-gold-line/30 bg-[#f7f2ea]"
        initial={{ scaleY: 1, scaleX: 1, opacity: 1 }}
        animate={{ scaleY: 0.02, scaleX: 1.05, opacity: 0 }}
        transition={{ duration: 0.85, ease: [0.65, 0, 0.35, 1] }}
      />
      {[...Array(16)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-gold-line"
          style={{
            left: `${10 + (i % 8) * 10}%`,
            top: `${20 + Math.floor(i / 8) * 45}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1.8, 0], y: [0, -20] }}
          transition={{ duration: 1.1, delay: 0.2 + i * 0.04 }}
        />
      ))}
    </motion.div>
  )
}
