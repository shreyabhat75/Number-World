import { motion } from 'framer-motion';

export default function DownloadButtons({ topicSlug, topicLabel }) {
  return (
    <div className="download-buttons-section">
      <span className="download-buttons-label">📚 Take it offline</span>
      <div className="download-buttons-row">
        <motion.a
          className="download-btn notes"
          href={`/downloads/notes/${topicSlug}-notes.pdf`}
          download
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          📄 Download Notes (PDF)
        </motion.a>
        <motion.a
          className="download-btn slides"
          href={`/downloads/slides/${topicSlug}-slides.pptx`}
          download
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          📊 Download Slides (PPTX)
        </motion.a>
      </div>
    </div>
  );
}
