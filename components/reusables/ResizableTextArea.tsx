import React, { ChangeEvent, useState } from 'react';
import { Textarea } from '../ui/textarea';

interface ResizableTextAreaProps {
    value: string;
    onChange: (value: string) => void;
    className?: string;
}

const ResizableTextArea: React.FC<ResizableTextAreaProps> = ({ value, onChange, className }) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const MAX_HEIGHT = 200; // in px

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        onChange(e.target.value);

        // Make sure the textarea ref exists and then reset / recalc the height
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'; // Reset the height
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set it to the scrollHeight

            const { scrollHeight } = textareaRef.current;
            // Only expand up to MAX_HEIGHT.
            if (scrollHeight <= MAX_HEIGHT) {
                textareaRef.current.style.height = `${scrollHeight}px`;
            } else {
                textareaRef.current.style.height = `${MAX_HEIGHT}px`;
            }

        }
    };

    return (
        <Textarea
            className={`rounded-[15px] border-2 border-[rgb(204_204_204)] ${className}`}
            placeholder="Key Strategies for Remote Team Collaboration"
            rows={1}
            onChange={handleChange}
            ref={textareaRef}
            value={value}
            
        />
    );
};

export default ResizableTextArea;