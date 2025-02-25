// A custom collapsible component using Tailwind and Framer Motion (without shadcn/ui)
// Demonstrates an animated dropdown section that expands/collapses.

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { DragHandleDots1Icon, DragHandleDots2Icon, DragHandleVerticalIcon } from '@radix-ui/react-icons';

interface CustomCollapsibleProps {
    headerText: string;
    headerRight: React.ReactNode;
    collapsibleContent: React.JSX.Element;
    defaultOpen?: boolean;
    isDraggable?: boolean;
}

export default function CustomCollapsible({ headerText, headerRight, collapsibleContent, defaultOpen, isDraggable }: CustomCollapsibleProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen || false);

    const toggle = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div className="w-full border rounded-lg shadow-md">
            {/* Header / Trigger */}
            <button
                onClick={toggle}
                className="flex items-center justify-between w-full px-4 py-3 focus:outline-none bg-white rounded-md"
            >
                <div className='flex items-center gap-3'>
                    {isDraggable && <DragHandleDots2Icon />}
                    <span className="font-semibold text-lg">{headerText}</span>

                </div>
                <div className='flex items-center gap-3'>
                    {headerRight}
                    <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className='p-1 hover:bg-gray-100 rounded-full flex items-center justify-center'>
                            <ChevronDown className="w-5 h-5" />
                        </div>
                    </motion.span>

                </div>
            </button>

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
