import React from 'react';
import { motion } from 'framer-motion';


const Elipsis: React.FC = () => {
    return (
            <motion.span
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-[60px] mt-8 text-center leading-[4rem]"
            >
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [1, 1, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, times: [0, 0.33, 0.66, 1] }}
                >
                    .
                </motion.span>
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, times: [0, 0.33, 0.66, 1] }}
                >
                    .
                </motion.span>
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, times: [0, 0.33, 0.66, 1] }}
                >
                    .
                </motion.span>
            </motion.span>
    );
};

export default Elipsis;