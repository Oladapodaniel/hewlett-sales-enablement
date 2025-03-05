// A custom collapsible component using Tailwind and Framer Motion (without shadcn/ui)
// Demonstrates an animated dropdown section that expands/collapses.

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CustomCollapsibleProps {
    header: React.ReactNode;
    collapsibleContent: React.JSX.Element;
    defaultOpen?: boolean;
}

export default function CustomCollapsibleReusable({ header, collapsibleContent, defaultOpen }: CustomCollapsibleProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen || false);

    const toggle = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div>
            <span onClick={toggle}>{header}</span>
            {/* Content Area */}
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: [0.42, 0, 0.58, 1] }}
                        className="overflow-hidden px-4 bg-white rounded-b-md"
                    >
                        <div className="pb-5 pt-3">
                            {collapsibleContent}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
