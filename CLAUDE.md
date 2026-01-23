# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` - Start development server (Vite)
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Architecture

This is a React + Vite music player app styled as a retro walkman with a 90s aesthetic (yellow plastic body, turquoise cassette, pink accents).

### Key Components

- **Walkman** (`src/components/Walkman.jsx`) - Main container component, renders the walkman device with cassette and controls. Includes decorative pink stars in the background.
- **Cassette** (`src/components/Cassette.jsx`) - Visual cassette labeled "Retro" with animated spinning spools when playing. Turquoise color scheme with white window.
- **Controls** (`src/components/Controls.jsx`) - Playback buttons (rewind 10s, play/pause, fast-forward 10s). Uses text symbols (◀◀, ▶▶) instead of emojis for color customization.

### State Management

- **useAudioPlayer** (`src/hooks/useAudioPlayer.js`) - Custom hook managing HTML5 Audio playback, exposes `isPlaying`, `togglePlay`, `rewind` (10s back), `fastForward` (10s forward)

### Data

- **playlist** (`src/data/playlist.js`) - Array of track objects with `id`, `title`, `artist`, `url`
- Audio files stored in `/public/music/`

### Styling

Component-specific CSS files in `src/styles/`:
- `walkman.css` - Main device styling, yellow plastic appearance, pink stars
- `cassette.css` - Turquoise cassette with white window, spinning spool animations
- `controls.css` - Pink buttons with white icons
- `display.css` - Track display (currently unused)

Uses Pacifico font from Google Fonts for "Música de Julieta" branding.
