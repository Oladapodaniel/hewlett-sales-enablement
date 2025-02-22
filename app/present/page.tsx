'use client';

import BodyPageOne from '@/components/themes/purple_theme/BodyPageOne';
import EndPageProps from '@/components/themes/purple_theme/EndPage';
import StartPage from '@/components/themes/purple_theme/StartPage';
import { head } from 'framer-motion/client';
// import { Button } from '@/components/ui/button';
import React from 'react';

const Page: React.FC = () => {
    const [currentSlide, setCurrentSlide] = React.useState(0);
    const purple_theme = {
        slides: [
            {
                header: {
                    text: 'Microsoft Sales Proposal',
                    fontSize: '9xl',
                    fontWeight: 'bold',
                    gradient: {
                        from: '#9886FC',
                        to: '#5E9BFB'
                    }
                },
                body: {
                    text: 'Here is where your presentation begins',
                    fontSize: '2xl',
                    gradient: {
                        from: '#4AA1FA',
                        to: '#C2DFFD'
                    }
                },
                footer: {
                    text: '20XX-XX-XX',
                    fontSize: '4xl'
                },
                bg: '../assets/img/start_deck_bg.png',
                logo: 'YOUR LOGO',
                logoFontSize: '4xl',
                logoFontWeight: 'medium',
                logoColor: 'white'
            },
            {
                header: {
                    text: 'Pricing Model',
                    fontSize: '2xl',
                    fontWeight: 'bold'
                },
                body: {
                    text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis porro voluptates sit exercitationem iste sed commodi hic possimus, quas, est consequuntur laborum quis, deleniti voluptatum officiis incidunt tempore expedita explicabo.',
                    fontSize: '2xl'
                },
                header2: {
                    text: 'Discount Structure',
                    fontSize: '2xl',
                    fontWeight: 'bold'
                },
                body2: {
                    text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis porro voluptates sit exercitationem iste sed commodi hic possimus, quas, est consequuntur laborum quis, deleniti voluptatum officiis incidunt tempore expedita explicabo.',
                    fontSize: '2xl'
                },
                bg: '../assets/img/banner_bg.svg'
            },
            {
                header: {
                    text: 'Pricing Model',
                    fontSize: '2xl',
                    fontWeight: 'bold'
                },
                body: {
                    text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis porro voluptates sit exercitationem iste sed commodi hic possimus, quas, est consequuntur laborum quis, deleniti voluptatum officiis incidunt tempore expedita explicabo.',
                    fontSize: '2xl'
                },
                header2: {
                    text: 'Discount Structure',
                    fontSize: '2xl',
                    fontWeight: 'bold'
                },
                body2: {
                    text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis porro voluptates sit exercitationem iste sed commodi hic possimus, quas, est consequuntur laborum quis, deleniti voluptatum officiis incidunt tempore expedita explicabo.',
                    fontSize: '2xl'
                },
                bg: '../assets/img/banner_bg.svg'
            },
            {
                header: {
                    text: 'Pricing Model',
                    fontSize: '2xl',
                    fontWeight: 'bold'
                },
                body: {
                    text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis porro voluptates sit exercitationem iste sed commodi hic possimus, quas, est consequuntur laborum quis, deleniti voluptatum officiis incidunt tempore expedita explicabo.',
                    fontSize: '2xl'
                },
                header2: {
                    text: 'Discount Structure',
                    fontSize: '2xl',
                    fontWeight: 'bold'
                },
                body2: {
                    text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis porro voluptates sit exercitationem iste sed commodi hic possimus, quas, est consequuntur laborum quis, deleniti voluptatum officiis incidunt tempore expedita explicabo.',
                    fontSize: '2xl'
                },
                bg: '../assets/img/banner_bg.svg'
            }
        ]
    }

    React.useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            console.log(purple_theme.slides.length - 1)
            if ((event.key === 'ArrowRight' || event.key === 'ArrowDown') && currentSlide >= 0 && currentSlide < purple_theme.slides.length - 1) {
                setCurrentSlide((prev) => prev + 1);
            }
        };
        const handleKeyUp = (event: KeyboardEvent) => {

            if ((event.key === 'ArrowLeft' || event.key === 'ArrowUp') && currentSlide > 0) {
                setCurrentSlide((prev) => prev - 1);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [currentSlide]);

    return (
        <div>
            {currentSlide === 0 && <StartPage mode="presenting" />}
            {currentSlide === 1 && <BodyPageOne mode="presenting" />}
            {currentSlide === 2 && <BodyPageOne mode="presenting" />}
            {currentSlide === 3 && <EndPageProps mode='presenting' />}
        </div>
    );
};

export default Page;