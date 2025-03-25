/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",

		// Or if using `src` directory:
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
		
	],

	theme: {
    	extend: {
    		screens: {
    			xs: '480px'
    		},
    		typography: {
    			DEFAULT: {
    				css: {
    					p: {
    						'@apply quicksand-light': ''
    					},
    					li: {
    						'@apply quicksand-light': ''
    					},
    					h1: {
    						'@apply quicksand-bold': ''
    					},
    					h2: {
    						'@apply quicksand-semibold': ''
    					}
    				}
    			}
    		},
    		colors: {
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			btnprimary: '#3c61e2',
    			btnprimaryhov: '#3c60e2dc',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			}
    		},
    		boxShadow: {
    			navshadow: '0 15px 20px #0000004d',
    			purpleshadow: '0 0 40px #c41dff80;'
    		},
    		backgroundImage: {
    			purpleImage: 'linear-gradient(#fff0 45%, #643dad 90%);',
    			heroImage: 'url("https://sweep.dev/static/media/circles.2a0760e98e7330fb3bd16edaf39c8bff.svg")'
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		background: {
    			marqueeGrad: 'linear-gradient(90deg, #D7E1EC 0%, #FFFFFF 100%)'
    		},
    		animation: {
    			orbit: 'orbit calc(var(--duration)*1s) linear infinite',
    			'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
    			marquee: 'marquee var(--duration) infinite linear',
    			'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
				'accordion-down': 'accordion-down 1s ease-out',
				'accordion-up': 'accordion-up 1s ease-out',
				'rotate-border': 'rotate-border 1s linear infinite',
				'float': 'float 1s ease-in-out infinite',
				'float-delay-1': 'float 1s ease-in-out infinite 1s',
				'float-delay-2': 'float 1s ease-in-out infinite 2s',
				'pulse-slow': 'pulse-slow 1s ease-in-out infinite',
				'scale-slow': 'scale-slow 1s ease-in-out infinite'
    		},
    		keyframes: {
    			orbit: {
    				'0%': {
    					transform: 'rotate(0deg) translateY(calc(var(--radius) * 1px)) rotate(0deg)'
    				},
    				'100%': {
    					transform: 'rotate(360deg) translateY(calc(var(--radius) * 1px)) rotate(-360deg)'
    				}
    			},
    			'border-beam': {
    				'100%': {
    					'offset-distance': '100%'
    				}
    			},
    			marquee: {
    				from: {
    					transform: 'translateX(0)'
    				},
    				to: {
    					transform: 'translateX(calc(-100% - var(--gap)))'
    				}
    			},
    			'marquee-vertical': {
    				from: {
    					transform: 'translateY(0)'
    				},
    				to: {
    					transform: 'translateY(calc(-100% - var(--gap)))'
    				}
    			},
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'rotate-border': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'pulse-slow': {
					'0%, 100%': { opacity: '0.4' },
					'50%': { opacity: '0.8' }
				},
				'scale-slow': {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.05)' }
				}
    		}
    	}
    },
	plugins: [require('daisyui'), require("tailwindcss-animate"), require('@tailwindcss/typography'), require('tailwind-scrollbar')],

};



  