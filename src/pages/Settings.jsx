import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Settings({ settings, onSettingsChange, onResetProgress }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleToggle = (key) => {
    onSettingsChange({ ...settings, [key]: !settings[key] });
  };

  return (
    <div className="settings-page">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>⚙️ Settings</h1>
        <p>Customize your Number World experience!</p>
      </motion.div>

      <div className="settings-list">
        <div className="setting-item">
          <div className="setting-info">
            <span className="setting-icon">🔊</span>
            <div>
              <h4>Sound Effects</h4>
              <p>Play sounds for correct answers, achievements, etc.</p>
            </div>
          </div>
          <button
            className={`toggle-btn ${settings.soundEffects ? 'on' : 'off'}`}
            onClick={() => handleToggle('soundEffects')}
            aria-label="Toggle sound effects"
          >
            <motion.div className="toggle-knob" animate={{ x: settings.soundEffects ? 22 : 0 }} />
          </button>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <span className="setting-icon">✨</span>
            <div>
              <h4>Animations</h4>
              <p>Enable smooth animations and transitions</p>
            </div>
          </div>
          <button
            className={`toggle-btn ${settings.animations ? 'on' : 'off'}`}
            onClick={() => handleToggle('animations')}
            aria-label="Toggle animations"
          >
            <motion.div className="toggle-knob" animate={{ x: settings.animations ? 22 : 0 }} />
          </button>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <span className="setting-icon">🐌</span>
            <div>
              <h4>Reduced Motion</h4>
              <p>Minimize animations for accessibility</p>
            </div>
          </div>
          <button
            className={`toggle-btn ${settings.reducedMotion ? 'on' : 'off'}`}
            onClick={() => handleToggle('reducedMotion')}
            aria-label="Toggle reduced motion"
          >
            <motion.div className="toggle-knob" animate={{ x: settings.reducedMotion ? 22 : 0 }} />
          </button>
        </div>
      </div>

      <div className="settings-danger">
        <h3>Danger Zone</h3>
        {!showConfirm ? (
          <motion.button
            className="reset-btn-danger"
            onClick={() => setShowConfirm(true)}
            whileHover={{ scale: 1.02 }}
          >
            Reset All Progress
          </motion.button>
        ) : (
          <motion.div
            className="confirm-dialog"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <p>⚠️ Are you sure? This will reset all your XP, achievements, and progress!</p>
            <div className="confirm-buttons">
              <button
                className="confirm-yes"
                onClick={() => {
                  onResetProgress();
                  setShowConfirm(false);
                }}
              >
                Yes, reset everything
              </button>
              <button
                className="confirm-no"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
