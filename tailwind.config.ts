import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
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
				/* Core System Colors */
				border: {
					DEFAULT: 'hsl(var(--border))',
					hover: 'hsl(var(--border-hover))',
				},
				input: {
					DEFAULT: 'hsl(var(--input))',
					focus: 'hsl(var(--input-focus))',
				},
				ring: 'hsl(var(--ring))',
				background: {
					DEFAULT: 'hsl(var(--background))',
					secondary: 'hsl(var(--background-secondary))',
				},
				foreground: 'hsl(var(--foreground))',
				
				/* Premium Card System */
				card: {
					DEFAULT: 'hsl(var(--card))',
					secondary: 'hsl(var(--card-secondary))',
					foreground: 'hsl(var(--card-foreground))',
					hover: 'hsl(var(--card-hover))',
				},
				
				/* Elite Primary Palette */
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					hover: 'hsl(var(--primary-hover))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))',
				},
				
				/* Sophisticated Secondary */
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					hover: 'hsl(var(--secondary-hover))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				
				/* Premium Status Colors */
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				success: {
					DEFAULT: 'hsl(var(--success))',
					foreground: 'hsl(var(--success-foreground))',
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					foreground: 'hsl(var(--warning-foreground))',
				},
				
				/* Refined Muted Tones */
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					hover: 'hsl(var(--muted-hover))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				
				/* Premium Accent Colors */
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					hover: 'hsl(var(--accent-hover))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				
				/* Popover System */
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				
				/* AI Agent Colors */
				agent: {
					orchestrator: 'hsl(var(--agent-orchestrator))',
					ui: 'hsl(var(--agent-ui))',
					backend: 'hsl(var(--agent-backend))',
					database: 'hsl(var(--agent-database))',
					testing: 'hsl(var(--agent-testing))',
					deployment: 'hsl(var(--agent-deployment))',
				},
				
				/* Sidebar System */
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))',
				},
			},
			
			/* Premium Typography */
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				mono: ['JetBrains Mono', 'Fira Code', 'Cascadia Code', 'monospace'],
			},
			
			/* Elite Border Radius */
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			
			/* Premium Box Shadows */
			boxShadow: {
				glow: 'var(--shadow-glow)',
				premium: 'var(--shadow-premium)',
			},
			
			/* Elite Animations */
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				glow: {
					'0%': { boxShadow: '0 0 20px hsl(var(--primary) / 0.4)' },
					'100%': { boxShadow: '0 0 30px hsl(var(--primary) / 0.6)' },
				},
				float: {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				shimmer: {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' },
				},
				typewriter: {
					from: { width: '0' },
					to: { width: '100%' },
				},
				blink: {
					'0%, 100%': { borderColor: 'transparent' },
					'50%': { borderColor: 'hsl(var(--primary))' },
				},
				'slide-in-from-left': {
					'0%': { transform: 'translateX(-100%)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' },
				},
				'slide-in-from-right': {
					'0%': { transform: 'translateX(100%)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' },
				},
				'fade-in-up': {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' },
				},
				'scale-in': {
					'0%': { transform: 'scale(0.9)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' },
				},
			},
			
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				glow: 'glow 2s ease-in-out infinite alternate',
				float: 'float 3s ease-in-out infinite',
				shimmer: 'shimmer 2s infinite',
				typewriter: 'typewriter 3s steps(40, end)',
				blink: 'blink 1s infinite',
				'slide-in-left': 'slide-in-from-left 0.5s ease-out',
				'slide-in-right': 'slide-in-from-right 0.5s ease-out',
				'fade-in-up': 'fade-in-up 0.6s ease-out',
				'scale-in': 'scale-in 0.3s ease-out',
				'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
			},
			
			/* Premium Transitions */
			transitionTimingFunction: {
				'elite': 'cubic-bezier(0.4, 0, 0.2, 1)',
				'bounce-subtle': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
			},
			
			/* Elite Spacing */
			spacing: {
				'18': '4.5rem',
				'88': '22rem',
				'128': '32rem',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
