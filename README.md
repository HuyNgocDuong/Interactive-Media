# Interactive Media Slideshow

A modern, interactive slideshow built with HTML, CSS, JavaScript, and GSAP animations for an Interactive Media assignment.

## Features

### 🎨 **Visual Effects**
- **Smooth slide transitions** with GSAP animations
- **3D rotation effects** during slide changes
- **Background gradient transitions** that change with each slide
- **Hover effects** on images and navigation elements
- **Scale and opacity animations** for engaging user experience

### 🎮 **Interactive Elements**
- **Click to open modal** - Click any slide to view image details
- **Navigation controls** - Previous/Next buttons and dot indicators
- **Keyboard navigation** - Use arrow keys to navigate, Escape to close modal
- **Auto-play functionality** - Automatic slide progression (pauses on hover)
- **Responsive design** - Works on desktop, tablet, and mobile devices

### 📱 **Modal Popup**
- **Image details view** with title, description, and metadata
- **Smooth animations** for opening and closing
- **Click outside to close** functionality
- **Image resolution display**

### 🎯 **User Experience**
- **Modern UI design** with glassmorphism effects
- **Smooth animations** throughout the interface
- **Accessibility features** with keyboard navigation
- **Performance optimized** with image preloading

## Technologies Used

- **HTML5** - Semantic structure
- **CSS3** - Modern styling with gradients, animations, and responsive design
- **JavaScript (ES6+)** - Interactive functionality and event handling
- **GSAP (GreenSock)** - Professional-grade animations and transitions

## File Structure

```
Interactive-Media/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and animations
├── script.js           # JavaScript functionality and GSAP animations
└── README.md           # Project documentation
```

## How to Use

1. **Open `index.html`** in a modern web browser
2. **Navigate slides** using:
   - Arrow buttons (left/right)
   - Dot indicators at the bottom
   - Arrow keys on keyboard
3. **Click any slide** to open the modal with image details
4. **Close modal** by:
   - Clicking the × button
   - Pressing Escape key
   - Clicking outside the modal

## Features Breakdown

### Slide Transitions
- Smooth fade and scale animations
- 3D rotation effects for depth
- Background color transitions
- Overlay flash effect during transitions

### Hover Effects
- Image scale on hover
- Content overlay slides up from bottom
- Navigation button scaling
- Dot indicator animations

### Modal System
- Animated popup with scale and fade effects
- Image details display
- Metadata information
- Multiple close methods

### Responsive Design
- Mobile-first approach
- Adaptive navigation layout
- Flexible image sizing
- Touch-friendly controls

## Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ⚠️ Internet Explorer (limited support)

## Performance Features

- **Image preloading** for smooth transitions
- **Optimized animations** with GSAP
- **Efficient event handling**
- **Memory management** for long-running sessions

## Customization

### Adding New Slides
1. Add a new `<div class="slide">` element in `index.html`
2. Include an image and content overlay
3. Update the `data-index` attribute
4. The JavaScript will automatically detect and handle new slides

### Changing Colors
- Modify the gradient arrays in `script.js` for background transitions
- Update CSS variables for consistent theming
- Adjust hover effect colors in `styles.css`

### Animation Timing
- Modify duration values in GSAP animations
- Adjust auto-play delay in the `InteractiveSlideshow` class
- Customize transition easing functions

## Credits

- **Images**: Unsplash (free stock photos)
- **Animations**: GSAP (GreenSock Animation Platform)
- **Icons**: Custom SVG icons
- **Design**: Modern glassmorphism and gradient design

## License

This project is created for educational purposes as part of an Interactive Media assignment.

---

**Created with ❤️ for Interactive Media Assignment**
