# Project Visual Assets Guide

This directory contains visual assets for portfolio projects including thumbnails, screenshots, diagrams, and videos.

## Directory Structure

```
assets/
├── img/
│   └── projects/
│       ├── [project-id]-thumb.jpg      # Main thumbnail (400x220px recommended)
│       ├── [project-id]-1.jpg          # Additional screenshots
│       ├── [project-id]-2.jpg
│       └── [project-id]-diagram.png    # Architecture diagrams
└── video/
    └── [project-id]-demo.mp4           # Demo videos
```

## Image Optimization Guidelines

### 1. Image Formats

**Primary Format: WebP**
- Modern, efficient format with excellent compression
- Supported by all modern browsers
- Use for all new images

**Fallback Format: JPEG**
- For compatibility with older browsers
- Use quality setting of 80-85%

**For Diagrams: PNG**
- Lossless compression for text and diagrams
- Use when transparency is needed

### 2. Recommended Dimensions

**Thumbnails:**
- Size: 400x220px (16:9 aspect ratio)
- Format: WebP with JPEG fallback
- Max file size: 50KB

**Screenshots:**
- Size: 800x600px or 1200x900px
- Format: WebP with JPEG fallback
- Max file size: 150KB per image

**Diagrams:**
- Size: 1000x800px (or as needed)
- Format: PNG or SVG
- Max file size: 200KB

**Videos:**
- Resolution: 1280x720px (720p)
- Format: MP4 (H.264 codec)
- Max file size: 5MB
- Duration: 30-60 seconds recommended

### 3. Optimization Tools

**Online Tools:**
- [TinyPNG](https://tinypng.com/) - PNG/JPEG compression
- [Squoosh](https://squoosh.app/) - WebP conversion and optimization
- [CloudConvert](https://cloudconvert.com/) - Format conversion

**Command Line Tools:**
```bash
# Convert JPEG to WebP
cwebp -q 85 input.jpg -o output.webp

# Optimize JPEG
jpegoptim --max=85 --strip-all input.jpg

# Optimize PNG
optipng -o7 input.png

# Compress video
ffmpeg -i input.mp4 -vcodec h264 -acodec aac -b:v 1M output.mp4
```

**Node.js Tools:**
```bash
npm install -g sharp-cli
sharp -i input.jpg -o output.webp --webp
```

### 4. Alt Text Guidelines

All images MUST have descriptive alt text for accessibility and SEO:

**Good Alt Text Examples:**
- `"AI Voice Agent dashboard showing real-time transcription and response generation"`
- `"Fantasy Team Simulation architecture diagram with ML pipeline components"`
- `"Email Classifier interface displaying categorized inbox with priority labels"`

**Bad Alt Text Examples:**
- `"image1"` (not descriptive)
- `"screenshot"` (too generic)
- `""` (empty - never use!)

### 5. Lazy Loading Implementation

Images are automatically lazy-loaded using the native `loading="lazy"` attribute:

```html
<img src="project-thumb.jpg" 
     alt="Descriptive alt text" 
     loading="lazy"
     onerror="this.src='fallback.jpg'">
```

### 6. Conditional Rendering by Project Type

The system automatically determines visual asset types based on project characteristics:

**Voice-AI Projects:**
- Show: Thumbnail + Video demo
- Example: AI Voice Agent, Live OCR

**UI Projects:**
- Show: Thumbnail + Multiple screenshots
- Example: Calculator, Web applications

**Backend/API Projects:**
- Show: Thumbnail + API documentation screenshot
- Example: HSN Validation, REST APIs

**Complex/ML Projects:**
- Show: Thumbnail + Architecture diagram
- Example: Fantasy Team Simulation, Loan Prediction

**NLP Projects:**
- Show: Thumbnail + Example inputs/outputs
- Example: Email Classifier

### 7. Image Naming Convention

Use kebab-case with project ID prefix:

```
ai-voice-agent-thumb.jpg
ai-voice-agent-1.jpg
ai-voice-agent-2.jpg
ai-voice-agent-diagram.png
fantasy-team-thumb.jpg
fantasy-team-architecture.png
```

### 8. Performance Checklist

Before adding images to the portfolio:

- [ ] Images are compressed and optimized
- [ ] File sizes are within recommended limits
- [ ] WebP format is used with JPEG fallback
- [ ] Dimensions are appropriate for display size
- [ ] Alt text is descriptive and meaningful
- [ ] Images are named following convention
- [ ] Lazy loading is enabled
- [ ] Error fallback is configured

### 9. Accessibility Requirements

**WCAG 2.1 Compliance:**
- All images must have alt text
- Decorative images should use `alt=""`
- Complex diagrams should have detailed descriptions
- Color contrast should meet AA standards (4.5:1)
- Images should not be the only way to convey information

### 10. Testing

Test images across:
- Desktop browsers (Chrome, Firefox, Safari, Edge)
- Mobile devices (iOS Safari, Chrome Mobile)
- Different screen sizes (320px to 1920px)
- Slow network conditions (3G simulation)
- Screen readers (NVDA, JAWS, VoiceOver)

### 11. Placeholder Images

For development, use placeholder services:
- `https://via.placeholder.com/400x220/667eea/ffffff?text=Project+Name`
- `https://placehold.co/400x220/png?text=Project+Name`

### 12. Copyright and Attribution

Ensure all images:
- Are original work or properly licensed
- Include attribution if required
- Do not contain sensitive information
- Have appropriate usage rights

## Quick Start

1. **Prepare your image:**
   ```bash
   # Resize to correct dimensions
   # Compress to reduce file size
   # Convert to WebP
   ```

2. **Name the file:**
   ```
   [project-id]-thumb.webp
   ```

3. **Add to projects.json:**
   ```json
   {
     "thumbnail": "assets/img/projects/project-id-thumb.jpg",
     "images": ["assets/img/projects/project-id-1.jpg"],
     "video": "assets/video/project-id-demo.mp4"
   }
   ```

4. **Test:**
   - Load the page
   - Check image displays correctly
   - Verify lazy loading works
   - Test on mobile devices
   - Validate alt text with screen reader

## Support

For questions or issues with visual assets, refer to:
- Design document: `.kiro/specs/portfolio-restructure/design.md`
- Requirements: `.kiro/specs/portfolio-restructure/requirements.md`
- Task list: `.kiro/specs/portfolio-restructure/tasks.md`
