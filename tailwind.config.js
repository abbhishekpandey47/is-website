/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  daisyui: {
    logs: false,
    // Only include themes in use to reduce CSS bundle
    themes: ["light", "dark"],
    // Disable unused components to save CSS bundle size
    styled: true,
    base: true,
    utils: true,
    prefix: "",
  },
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        termina: ['"Termina Demi"', "sans-serif"],
        geist: ['"Geist"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      screens: {
        xxs: "200px",
        xs: "480px",
        '3xl':"1920px",
        '4xl':"2560px"
      },
      perspective: {
        '1000': '1000px',
      },
      transformStyle: {
        'preserve-3d': 'preserve-3d',
      },
      rotate: {
        'y-12': 'rotateY(12deg)',
        'y-15': 'rotateY(15deg)',
        'x-5': 'rotateX(5deg)',
        'x-8': 'rotateX(8deg)',
      },
      typography: {
        DEFAULT: {
          css: {
            p: { "@apply quicksand-light": "" },
            li: { "@apply quicksand-light": "" },
            h1: { "@apply quicksand-bold": "" },
            h2: { "@apply quicksand-semibold": "" },
          },
        },
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        btnprimary: "#3c61e2",
        btnprimaryhov: "#3c60e2dc",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        approved: { DEFAULT: "hsl(var(--approved))", foreground: "hsl(var(--approved-foreground))" },
        pending: { DEFAULT: "hsl(var(--pending))", foreground: "hsl(var(--pending-foreground))" },
        rejected: { DEFAULT: "hsl(var(--rejected))", foreground: "hsl(var(--rejected-foreground))" },
        live: { DEFAULT: "hsl(var(--live))", foreground: "hsl(var(--live-foreground))" },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        // Semantic accent tokens
        "accent-green": "#34d399",
        "accent-yellow": "#fbbf24",
        "accent-purple": "#9382ff",
        "accent-red": "#f87171",
        "accent-blue": "#60a5fa",
      },
      boxShadow: {
        navshadow: "0 15px 20px #0000004d",
        purpleshadow: "0 0 40px #c41dff80",
      },
      backgroundImage: {
        purpleImage: "linear-gradient(#fff0 45%, #643dad 90%)",
        heroImage:
          'url("https://sweep.dev/static/media/circles.2a0760e98e7330fb3bd16edaf39c8bff.svg")',
        marqueeGrad: "linear-gradient(90deg, #D7E1EC 0%, #FFFFFF 100%)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        orbit: {
          "0%": {
            transform:
              "rotate(0deg) translateY(calc(var(--radius) * 1px)) rotate(0deg)",
          },
          "100%": {
            transform:
              "rotate(360deg) translateY(calc(var(--radius) * 1px)) rotate(-360deg)",
          },
        },
        "border-beam": {
          "100%": { "offset-distance": "100%" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "rotate-border": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        "scale-slow": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { opacity: "0", transform: "translateX(-8px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "drop-in": {
          "0%": { opacity: "0", transform: "translateY(-4px) scale(0.98)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
      },
      animation: {
        orbit: "orbit calc(var(--duration)*1s) linear infinite",
        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
        marquee: "marquee var(--duration) infinite linear",
        "marquee-vertical":
          "marquee-vertical var(--duration) linear infinite",
        "accordion-down": "accordion-down 0.3s ease-out",
        "accordion-up": "accordion-up 0.3s ease-out",
        "rotate-border": "rotate-border 1s linear infinite",
        float: "float 1s ease-in-out infinite",
        "float-delay-1": "float 1s ease-in-out infinite 1s",
        "float-delay-2": "float 1s ease-in-out infinite 2s",
        "pulse-slow": "pulse-slow 1s ease-in-out infinite",
        "scale-slow": "scale-slow 1s ease-in-out infinite",
        "fade-up": "fade-up 0.4s ease-out both",
        "fade-up-delay-1": "fade-up 0.4s ease-out 0.05s both",
        "fade-up-delay-2": "fade-up 0.4s ease-out 0.1s both",
        "fade-up-delay-3": "fade-up 0.4s ease-out 0.15s both",
        "fade-up-delay-4": "fade-up 0.4s ease-out 0.2s both",
        "slide-in": "slide-in 0.3s ease-out both",
        "drop-in": "drop-in 0.2s ease-out both",
      },
    },
  },
  plugins: [
    require("daisyui"),
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("tailwind-scrollbar"),
  ],
};
