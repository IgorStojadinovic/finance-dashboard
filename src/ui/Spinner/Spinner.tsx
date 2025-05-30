import { motion, Variants } from 'motion/react';

const Spinner = () => {
  const dotVariants: Variants = {
    jump: {
      y: -30,
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: 'mirror',
        ease: 'easeInOut',
      },
    },
  };

  return (
    <motion.div
      animate='jump'
      transition={{ staggerChildren: -0.4, staggerDirection: -1 }}
      className='container'
    >
      <motion.div className='dot' variants={dotVariants} />
      <motion.div className='dot' variants={dotVariants} />
      <motion.div className='dot' variants={dotVariants} />
      <StyleSheet />
    </motion.div>
  );
}

/**
 * ==============   Styles   ================
 */
function StyleSheet() {
  return (
    <style>
      {`
            .container {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 10px;
            }

            .dot {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background-color: #82C9D7;
                will-change: transform;
            }
            `}
    </style>
  );
}

export { Spinner };
