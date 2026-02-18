# AI Face Generation Instructions

## 🎨 Generate Your Human Face

Use one of these AI image generators to create a hyper-realistic human face:

### Recommended Tools:
- **Midjourney** (Best quality): https://midjourney.com
- **DALL-E 3** (via ChatGPT Plus): https://chat.openai.com
- **Leonardo.ai**: https://leonardo.ai
- **Stable Diffusion XL**: https://stablediffusionweb.com

---

## 📝 AI Image Prompt

Copy and paste this prompt into your AI image generator:

```
Cinematic portrait of a young professional in their late 20s, direct eye contact with camera, subtle confident expression, perfect skin detail with natural texture, studio lighting with dramatic chiaroscuro, rim lighting creating edge glow, dark moody background fading to black, high fashion photography style, shot on Hasselblad X2D, 100mm lens, f/2.8, ultra detailed facial features, professional color grading, slightly desaturated colors with blue-cyan tint, tech aesthetic, cyberpunk undertones, hyper-realistic, 8K resolution, RAW photography --ar 3:4 --style raw --v 6
```

### Key Requirements:
- **Aspect Ratio**: 3:4 (portrait orientation)
- **Style**: Cinematic, high-fashion, tech-forward
- **Lighting**: Dramatic with dark background
- **Quality**: Hyper-realistic, ultra-detailed
- **Color**: Slightly desaturated with blue/cyan tones to match the Clarify brand

---

## 💾 Add Your Face to the Website

### Step 1: Save Your Generated Image
1. Download the AI-generated face image
2. Name it `face.jpg` or `face.png`
3. Save it to: `/public/face.jpg`

### Step 2: Update the Component
Open: `/components/AnymaFace.tsx`

Find line ~72:
```tsx
<img
  src="/api/placeholder/800/1000"
  alt="Human face"
  className="w-full h-full object-cover"
```

Replace with:
```tsx
<img
  src="/face.jpg"
  alt="Human face"
  className="w-full h-full object-cover"
```

### Step 3: Refresh Your Browser
The face will now appear with all the Anyma-style animations!

---

## 🎭 Alternative: Use Stock Photography

If you prefer to use a stock photo:
- **Unsplash**: https://unsplash.com/s/photos/portrait-face
- **Pexels**: https://www.pexels.com/search/portrait/

Search for: "cinematic portrait dark background professional"

---

## ✨ What You'll Get

Your custom face will have these Anyma-inspired effects:
- ✅ Particle fragmentation on hover (50 particles)
- ✅ Digital grid overlay with pulsing animation
- ✅ Glitch effect lines
- ✅ Breathing pulse (4-second cycle)
- ✅ Continuous scanning line
- ✅ Orbiting geometric circles
- ✅ 3D parallax following cursor
- ✅ Floating data particles (20 particles)
- ✅ Corner frame accents
- ✅ "Authenticity Verified" badge

All synchronized and timed for maximum visual impact!
