/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
      './pages/**/*.{js,jsx}',
      './components/**/*.{js,jsx}',
      './app/**/*.{js,jsx}',
      './src/**/*.{js,jsx}',
    ],
    prefix: "",
    theme: {
    	container: {
    		center: true,
    		padding: '2rem',
    		screens: {
    			'2xl': '1400px'
    		}
    	},
    	extend: {
    		colors: {
    			// Brand Colors from Logo - Godha Collections
    			peacock: {
    				50: '#e6f4f8',
    				100: '#b3dde8',
    				200: '#80c6d8',
    				300: '#4dafc8',
    				400: '#2698b8',
    				500: '#1a7a91',
    				600: '#155f71',
    				700: '#0f4452',
    				800: '#0a2a33',
    				900: '#041114',
    			},
    			royal: {
    				50: '#eef3f7',
    				100: '#d5e0eb',
    				200: '#a8c1d6',
    				300: '#7ba2c1',
    				400: '#4e83ac',
    				500: '#1e3a5f',
    				600: '#183050',
    				700: '#122541',
    				800: '#0c1b32',
    				900: '#061023',
    			},
    			gold: {
    				50: '#fefce8',
    				100: '#fef9c3',
    				200: '#fef08a',
    				300: '#fde047',
    				400: '#facc15',
    				500: '#d4a017',
    				600: '#b8860b',
    				700: '#a16207',
    				800: '#854d0e',
    				900: '#713f12',
    			},
    			lotus: {
    				50: '#fdf4f7',
    				100: '#fbe8ef',
    				200: '#f8d1df',
    				300: '#f4b0c9',
    				400: '#ed7fa8',
    				500: '#e8a4b8',
    				600: '#d68fa3',
    				700: '#be6b8a',
    				800: '#9d4a6b',
    				900: '#7d3a56',
    			},
    			teal: {
    				50: '#f0fdfa',
    				100: '#ccfbf1',
    				200: '#99f6e4',
    				300: '#5eead4',
    				400: '#2dd4bf',
    				500: '#0d9488',
    				600: '#0f766e',
    				700: '#115e59',
    				800: '#134e4a',
    				900: '#042f2e',
    			},
    			ivory: {
    				50: '#fffefb',
    				100: '#fffdf7',
    				200: '#fffaeb',
    				300: '#fef6dc',
    				400: '#fdf1c7',
    				500: '#faf5eb',
    				600: '#f5edd9',
    				700: '#ebe0c4',
    				800: '#d4c9a8',
    				900: '#b8a87c',
    			},
    			wood: {
    				50: '#fdf8f6',
    				100: '#f2e8e5',
    				200: '#e0cec7',
    				300: '#d2bab0',
    				400: '#b08968',
    				500: '#8b5a2b',
    				600: '#744210',
    				700: '#5c3d0e',
    				800: '#44310d',
    				900: '#2c250c',
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			},
    			sidebar: {
    				DEFAULT: 'hsl(var(--sidebar-background))',
    				foreground: 'hsl(var(--sidebar-foreground))',
    				primary: 'hsl(var(--sidebar-primary))',
    				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
    				accent: 'hsl(var(--sidebar-accent))',
    				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
    				border: 'hsl(var(--sidebar-border))',
    				ring: 'hsl(var(--sidebar-ring))'
    			}
    		},
    		fontFamily: {
    			display: ['Playfair Display', 'Georgia', 'serif'],
    			body: ['Inter', 'system-ui', 'sans-serif'],
    			elegant: ['Cormorant Garamond', 'Georgia', 'serif'],
    			luxury: ['Bodoni Moda', 'Playfair Display', 'serif'],
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)',
    			'2xl': '1rem',
    			'3xl': '1.5rem',
    			'4xl': '2rem',
    		},
    		boxShadow: {
    			'elegant': '0 4px 20px -2px rgba(30, 58, 95, 0.08)',
    			'elegant-lg': '0 10px 40px -4px rgba(30, 58, 95, 0.12)',
    			'elegant-xl': '0 20px 60px -8px rgba(30, 58, 95, 0.15)',
    			'gold': '0 4px 20px -2px rgba(212, 160, 23, 0.2)',
    			'gold-lg': '0 10px 40px -4px rgba(212, 160, 23, 0.25)',
    			'card': '0 2px 12px -2px rgba(0, 0, 0, 0.06)',
    			'card-hover': '0 20px 50px -12px rgba(30, 58, 95, 0.18)',
    			'luxury': '0 10px 40px -10px rgba(30, 58, 95, 0.12), 0 20px 60px -20px rgba(212, 160, 23, 0.08)',
    			'luxury-lg': '0 20px 60px -15px rgba(30, 58, 95, 0.18), 0 30px 80px -25px rgba(212, 160, 23, 0.12)',
    			'inner-glow': 'inset 0 2px 4px 0 rgba(212, 160, 23, 0.06)',
    		},
    		keyframes: {
    			'accordion-down': {
    				from: { height: '0' },
    				to: { height: 'var(--radix-accordion-content-height)' }
    			},
    			'accordion-up': {
    				from: { height: 'var(--radix-accordion-content-height)' },
    				to: { height: '0' }
    			},
    			'fade-in': {
    				from: { opacity: '0', transform: 'translateY(10px)' },
    				to: { opacity: '1', transform: 'translateY(0)' }
    			},
    			'fade-in-up': {
    				from: { opacity: '0', transform: 'translateY(20px)' },
    				to: { opacity: '1', transform: 'translateY(0)' }
    			},
    			'slide-in-right': {
    				from: { opacity: '0', transform: 'translateX(20px)' },
    				to: { opacity: '1', transform: 'translateX(0)' }
    			},
    			'scale-in': {
    				from: { opacity: '0', transform: 'scale(0.95)' },
    				to: { opacity: '1', transform: 'scale(1)' }
    			},
    			'shimmer': {
    				from: { backgroundPosition: '200% 0' },
    				to: { backgroundPosition: '-200% 0' }
    			},
    			'float': {
    				'0%, 100%': { transform: 'translateY(0)' },
    				'50%': { transform: 'translateY(-10px)' }
    			},
    		},
    		animation: {
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out',
    			'fade-in': 'fade-in 0.5s ease-out forwards',
    			'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
    			'slide-in-right': 'slide-in-right 0.5s ease-out forwards',
    			'scale-in': 'scale-in 0.3s ease-out forwards',
    			'shimmer': 'shimmer 2s linear infinite',
    			'float': 'float 3s ease-in-out infinite',
    		},
    		backgroundImage: {
    			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
    			'gradient-peacock': 'linear-gradient(135deg, #1e3a5f 0%, #0f766e 50%, #d4a017 100%)',
    			'gradient-royal': 'linear-gradient(135deg, #1e3a5f 0%, #183050 100%)',
    			'gradient-gold': 'linear-gradient(135deg, #d4a017 0%, #facc15 100%)',
    			'gradient-lotus': 'linear-gradient(135deg, #e8a4b8 0%, #f9a8d4 100%)',
    		},
    	}
    },
    plugins: [require("tailwindcss-animate")],
  }