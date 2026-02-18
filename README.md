# Clarify - Pre-Launch Landing Page

A visually stunning, cinematic landing page for Clarify, an AI-powered authenticity detection platform that scans videos, images, and audio in real time to detect deepfakes and manipulated media.

## ✨ Features

- **Immersive 3D Effects**: Interactive particle field using Three.js and React Three Fiber
- **Smooth Animations**: Framer Motion for fluid, cinematic transitions
- **Responsive Design**: Optimized for both desktop and mobile experiences
- **Functional Forms**: Working waitlist and beta tester sign-up forms
- **Performance Optimized**: Dynamic imports and lazy loading for optimal performance
- **Modern Stack**: Built with Next.js 14 App Router, TypeScript, and Tailwind CSS

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
clarify-landing/
├── app/
│   ├── api/
│   │   ├── waitlist/route.ts    # Waitlist form API endpoint
│   │   └── beta/route.ts        # Beta form API endpoint
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Main landing page
│   └── globals.css              # Global styles
├── components/
│   ├── Hero.tsx                 # Hero section
│   ├── ParticleBackground.tsx   # 3D particle effects
│   ├── ProblemSection.tsx       # Problem statement section
│   ├── SolutionSection.tsx      # Solution features section
│   ├── WaitlistForm.tsx         # Waitlist sign-up form
│   ├── BetaForm.tsx             # Beta tester application form
│   └── Footer.tsx               # Footer component
├── public/                      # Static assets
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
└── next.config.mjs              # Next.js configuration
```

## 🎨 Design Features

### Visual Effects
- Dynamic 3D particle field with cursor interaction
- Smooth scroll-based animations
- Glassmorphism UI elements
- Gradient text effects
- Glowing button animations
- Atmospheric fog and depth of field

### Sections
1. **Hero**: Full-screen immersive introduction with 3D particles
2. **Problem**: Explains the challenge of synthetic media
3. **Solution**: Showcases Clarify's features with animated UI mock
4. **Waitlist**: Functional sign-up form for early access
5. **Beta Program**: Application form for beta testers
6. **Footer**: Minimal footer with links

## 🔧 Customization

### Colors
Edit the color scheme in [tailwind.config.ts](tailwind.config.ts):

```typescript
colors: {
  'clarify-dark': '#050505',
  'clarify-blue': '#00d4ff',
  'clarify-ice': '#e0f7ff',
}
```

### Content
- Update text content in component files
- Modify form fields in `WaitlistForm.tsx` and `BetaForm.tsx`
- Adjust animations in respective component files

### API Integration
The forms currently use mock API routes. To integrate with a real backend:

1. Update API routes in `app/api/waitlist/route.ts` and `app/api/beta/route.ts`
2. Add database integration (PostgreSQL, MongoDB, etc.)
3. Connect to email service (Mailchimp, ConvertKit, etc.)
4. Add proper validation and error handling

## 📱 Mobile Optimization

The site is fully responsive with:
- Reduced particle count on mobile for better performance
- Touch-optimized interactions
- Responsive typography and spacing
- Stack layout for smaller screens
- Full-width buttons on mobile

## 🚀 Deployment

### Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com):

```bash
npm install -g vercel
vercel
```

### Other Platforms

Build the production version:

```bash
npm run build
npm start
```

The site can be deployed to any platform that supports Next.js (Netlify, AWS, DigitalOcean, etc.).

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **3D Graphics**: Three.js, React Three Fiber, Drei
- **Font**: Inter (Google Fonts)

## 📝 License

This project is proprietary and confidential.

## 🤝 Support

For questions or support, contact: contact@clarify.ai

---

Built with ❤️ for Clarify
