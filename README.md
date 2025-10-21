# Brain.fm Timeless Scrub Concept

A React-based landing page demonstrating a proposed "Timeless Scrub Bar" enhancement for the Brain.fm app. This concept introduces a minimal, distraction-free scrub control to allow users to restart tracks or seek within them without cluttering the interface.

## Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Routing**: React Router DOM (though not heavily used here)
- **Linting**: ESLint with React plugins
- **Animation**: Tailwind's built-in animations (via `tw-animate-css`)

## Features

- **Landing Page**: Explains the rationale behind the scrub bar concept, highlighting friction in Brain.fm's current controls.
- **Interactive Mobile Mockup**: A responsive phone frame displaying a simulated Brain.fm player.
- **Player Controls**:
  - Play/Pause button with visual state.
  - Prev button: Instantly restarts the track (sets progress to 0%).
  - Next button: Jumps to the end (sets progress to 100%).
  - Timeless Scrub Bar: Drag or tap to seek; no time labels for minimal distraction.
- **Modal Interaction**: Click to open a larger, interactive modal for testing the scrub functionality.
- **Responsive Design**: Desktop shows a static preview; mobile/tablet opens modal by default.
- **Accessibility**: ARIA labels, keyboard support (ESC to close modal), touch-friendly drag.
- **Visual Simulation**: Progress auto-advances when playing; no actual audio playback.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/CoreyMcCoy/brainfm-timeless-scrub.git
   cd brainfm-timeless-scrub
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser.

## Usage

- **Desktop**: View the landing page; click "Open the mockup" to interact with the player in a modal.
- **Mobile**: The mockup is hidden; tap the link to open the interactive modal.
- **Interacting**: Use the scrub bar to drag and seek. Prev/Next buttons simulate restart and end-jump. Play/Pause toggles visual progress.

## Screenshots

_(Add images here if available)_

- Landing page on desktop.
- Mobile mockup in modal with scrub bar interaction.

## Author

Built by [Corey McCoy](https://coreymccoy.com). Inspired by Brain.fm's minimalist design.

## License

This project is for demonstration purposes. No license specified.
