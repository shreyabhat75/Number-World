import { motion } from 'framer-motion';

export default function FractionVisualizer({ num, den, color = '#a78bfa', shape = 'bar' }) {
  const safeDen = Math.max(1, den);
  const parts = Array.from({ length: safeDen }, (_, i) => i);
  const fillCount = Math.min(Math.abs(num), safeDen);

  if (shape === 'pie') {
    const radius = 70;
    const cx = 80, cy = 80;
    const anglePer = 360 / safeDen;

    const polarToCartesian = (angle) => {
      const rad = ((angle - 90) * Math.PI) / 180;
      return [cx + radius * Math.cos(rad), cy + radius * Math.sin(rad)];
    };

    const slices = parts.map((i) => {
      const startAngle = i * anglePer;
      const endAngle = startAngle + anglePer;
      const [x1, y1] = polarToCartesian(startAngle);
      const [x2, y2] = polarToCartesian(endAngle);
      const largeArc = anglePer > 180 ? 1 : 0;
      const path = safeDen === 1
        ? `M ${cx} ${cy - radius} A ${radius} ${radius} 0 1 1 ${cx - 0.01} ${cy - radius} Z`
        : `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
      return { path, filled: i < fillCount };
    });

    return (
      <svg width="160" height="160" viewBox="0 0 160 160" className="fraction-pie">
        {slices.map((slice, i) => (
          <motion.path
            key={i}
            d={slice.path}
            fill={slice.filled ? color : '#e5e7eb'}
            stroke="white"
            strokeWidth="2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.03 }}
          />
        ))}
      </svg>
    );
  }

  return (
    <div className="fraction-bar">
      {parts.map(i => (
        <motion.div
          key={i}
          className="fraction-bar-segment"
          style={{ background: i < fillCount ? color : '#e5e7eb', borderColor: color }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: i * 0.03, type: 'spring' }}
        />
      ))}
    </div>
  );
}
