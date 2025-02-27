import { purple_theme_thumbnail } from "@/lib/images"
import { StaticImageData } from "next/image"

export interface ThemesInterface {
    id: string,
    name: string,
    preview: StaticImageData,
    colors: {
        background: string,
        text: string,
        accent: string
    },
    font: string,
    layout: string,
    animations: string,
    styles: {
        slide: {
            borderRadius: string,
            boxShadow: string,
            padding: string
        },
        header: {
            fontSize: string,
            fontWeight: string,
            textAlign: string,
            textTransform?: string,
            letterSpacing?: string
        },
        body: {
            fontSize: string,
            textAlign: string,
            lineHeight?: string
        },
        image: {
            borderRadius: string,
            boxShadow: string
        }
    },
    selected?: boolean,
    slides: {
        header: {
            text: string,
            fontSize: string,
            fontWeight: string,
            gradient?: {
                from: string,
                to: string
            }
        },
        body: {
            text: string,
            fontSize: string,
            gradient?: {
                from: string,
                to: string
            }
        },
        header2: {
            text: string,
            fontSize: string,
            fontWeight: string
        },
        body2: {
            text: string,
            fontSize: string
        },
        footer?: {
            text: string,
            fontSize: string
        },
        bg?: string,
        logo?: string,
        logoFontSize?: string,
        logoFontWeight?: string,
        logoColor?: string
    }[]
    
}


export const themes: ThemesInterface[] = [
    {
        "id": "modern",
        "name": "Modern",
        "preview": purple_theme_thumbnail,
        "colors": {
            "background": "#1E1E1E",
            "text": "#FFFFFF",
            "accent": "#FF5733"
        },
        "font": "Inter",
        "layout": "centered",
        "animations": "fade-in",
        "styles": {
            "slide": {
                "borderRadius": "10px",
                "boxShadow": "0px 4px 6px rgba(0, 0, 0, 0.1)",
                "padding": "20px"
            },
            "header": {
                "fontSize": "2rem",
                "fontWeight": "bold",
                "textAlign": "center"
            },
            "body": {
                "fontSize": "1.2rem",
                "textAlign": "center"
            },
            "image": {
                "borderRadius": "10px",
                "boxShadow": "0px 4px 6px rgba(0, 0, 0, 0.1)"
            }
        },
        "slides": [
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
                    text: '',
                    fontSize: ''
                },
                header2: {
                    text: '',
                    fontSize: '',
                    fontWeight: ''
                },
                body2: {
                    text: '',
                    fontSize: ''
                },
                bg: '../assets/img/HPE_theme_assets/start_deck_bg.png',
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
            }
        ]
    },
    {
        "id": "modern",
        "name": "Modern",
        "preview": purple_theme_thumbnail,
        "colors": {
            "background": "#1E1E1E",
            "text": "#FFFFFF",
            "accent": "#FF5733"
        },
        "font": "Inter",
        "layout": "centered",
        "animations": "fade-in",
        "styles": {
            "slide": {
                "borderRadius": "10px",
                "boxShadow": "0px 4px 6px rgba(0, 0, 0, 0.1)",
                "padding": "20px"
            },
            "header": {
                "fontSize": "2rem",
                "fontWeight": "bold",
                "textAlign": "center"
            },
            "body": {
                "fontSize": "1.2rem",
                "textAlign": "center"
            },
            "image": {
                "borderRadius": "10px",
                "boxShadow": "0px 4px 6px rgba(0, 0, 0, 0.1)"
            }
        },
        "slides": [
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
                header2: {
                    text: '',
                    fontSize: '',
                    fontWeight: ''
                },
                body2: {
                    text: '',
                    fontSize: ''
                },
                bg: '../assets/img/HPE_theme_assets/start_deck_bg.png',
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
            }
        ]
    },
    {
        "id": "modern",
        "name": "Modern",
        "preview": purple_theme_thumbnail,
        "colors": {
            "background": "#1E1E1E",
            "text": "#FFFFFF",
            "accent": "#FF5733"
        },
        "font": "Inter",
        "layout": "centered",
        "animations": "fade-in",
        "styles": {
            "slide": {
                "borderRadius": "10px",
                "boxShadow": "0px 4px 6px rgba(0, 0, 0, 0.1)",
                "padding": "20px"
            },
            "header": {
                "fontSize": "2rem",
                "fontWeight": "bold",
                "textAlign": "center"
            },
            "body": {
                "fontSize": "1.2rem",
                "textAlign": "center"
            },
            "image": {
                "borderRadius": "10px",
                "boxShadow": "0px 4px 6px rgba(0, 0, 0, 0.1)"
            }
        },
        "slides": [
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
                header2: {
                    text: '',
                    fontSize: '',
                    fontWeight: ''
                },
                body2: {
                    text: '',
                    fontSize: ''
                },
                bg: '../assets/img/HPE_theme_assets/start_deck_bg.png',
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
            }
        ]
    },
    {
        "id": "modern",
        "name": "Modern",
        "preview": purple_theme_thumbnail,
        "colors": {
            "background": "#1E1E1E",
            "text": "#FFFFFF",
            "accent": "#FF5733"
        },
        "font": "Inter",
        "layout": "centered",
        "animations": "fade-in",
        "styles": {
            "slide": {
                "borderRadius": "10px",
                "boxShadow": "0px 4px 6px rgba(0, 0, 0, 0.1)",
                "padding": "20px"
            },
            "header": {
                "fontSize": "2rem",
                "fontWeight": "bold",
                "textAlign": "center"
            },
            "body": {
                "fontSize": "1.2rem",
                "textAlign": "center"
            },
            "image": {
                "borderRadius": "10px",
                "boxShadow": "0px 4px 6px rgba(0, 0, 0, 0.1)"
            }
        },
        "slides": [
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
                header2: {
                    text: '',
                    fontSize: '',
                    fontWeight: ''
                },
                body2: {
                    text: '',
                    fontSize: ''
                },
                bg: '../assets/img/HPE_theme_assets/start_deck_bg.png',
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
            }
        ]
    },
]