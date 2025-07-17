# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Studio Pickens is a production-ready React TypeScript application for a high-end creative studio website. It features a comprehensive content management system, responsive design, and premium interactions.

## Development Commands

- `npm start` - Start React development server (http://localhost:3000)
- `node server.js` - Start Express API server (http://localhost:3001)
- `./start-app.sh` - Start complete application with MongoDB (requires sudo)
- `npm test` - Run tests in interactive watch mode
- `npm run build` - Build for production
- `npm run eject` - Remove CRA abstraction (one-way operation)

## Architecture

- **Frontend Framework**: React 19 with TypeScript
- **Styling**: Tailwind CSS with extensive custom configuration
- **Backend**: Express.js API with JSON file storage
- **Build Tool**: Create React App (react-scripts 5.0.1)
- **Testing**: Jest with React Testing Library
- **Routing**: Custom client-side routing system
- **Data Management**: Custom React hooks with RESTful API

## Key Directories

- `src/pages/` - Main application pages (Home, Work, Process, Story, Locations, Contact, FAQ)
- `src/components/` - Reusable UI components organized by category
- `src/admin/` - Complete admin panel with TypeScript editors
- `src/hooks/` - Custom data fetching hooks for each content section
- `src/constants/` - Configuration, typography, and animation constants
- `data/` - JSON data files for all content sections
- `public/images/` - Static assets organized by content type

## Admin System

The project includes a comprehensive admin panel at `/admin` with:
- Live preview editing for all content sections
- Image upload and management system
- Transform controls for positioning and scaling
- TypeScript interfaces for data validation
- Real-time updates and save functionality

## API Endpoints

- `GET/PUT /api/hero` - Hero section management
- `GET/PUT /api/work` - Work gallery management
- `GET/PUT /api/process` - Process page management
- `GET/PUT /api/story` - Story page management
- `GET/PUT /api/locations` - Locations management
- `GET/PUT /api/contact` - Contact information
- `GET/POST/DELETE /api/faq` - FAQ management
- `POST /api/upload` - Image upload functionality

## Data Management

- JSON-based file storage in `data/` directory
- Custom React hooks for data fetching and state management
- Real-time admin updates with optimistic UI
- Image management with upload and browsing capabilities
- TypeScript interfaces for data structure validation

## Testing

Tests use Jest and React Testing Library. Test files should follow the pattern `*.test.tsx` or be placed in `__tests__` directories.


# Claude Project Prompt — Studio Pickens Website

## 👋 Introduction
You are an expert frontend developer helping me build a production-ready website for a high-end creative studio. The design is premium, interactive, and rooted in subtle transitions and aesthetic typography.

Build this project using **React and Tailwind CSS**. All code must be written in JSX with Tailwind classes. The tone is clean, efficient, and focused on polish and responsiveness.

---

## 🎯 Site Overview
Build a responsive, scroll-animated website for **Studio Pickens**.

Pages:
- Home (Hero, Polaroids, Scroll Interactions)
- Work
- Process
- Story
- Locations
- Contact
- FAQ

---

## 🧠 Design System

**Typography**
- Font: Proxima Nova Extra Wide
- Weight: 700
- Size: 14px
- Letter Spacing: 3%
- Transform: UPPERCASE

**Spacing**
- 8pt spacing system (4px, 8px, 16px, 32px, etc.)

**Colors**
- Background: `#F8F7F7`
- Primary Text: `#0025B8`
- Underline: `linear-gradient(0deg, #FF7E46, #FF7E46)`
- Link Hover: Blue text + orange underline

**Micro-Interactions**
- Scroll-based layout transitions
- Subtle sine-based floating
- Hover and active feedback for all interactive elements

---

## 🧩 Navbar Behavior

1. Navbar has 3 links on the left (WORK, PROCESS, STORY) and 3 on the right (LOCATIONS, CONTACT, FAQ).
2. These links are evenly spaced on initial render.
3. On scroll, the site title "STUDIO PICKENS" animates from below (inside hero) to the center of the navbar.
4. The two link groups slide left/right to make space for the centered title.
5. Underline animation on hover/active should use orange linear-gradient.
6. Responsive: flex-col for mobile, flex-row for desktop (`md:flex-row`), with touch targets at least 44px.

---

## 📦 File & Component Structure
- `components/Navbar.jsx`
- `components/Hero.jsx`
- `components/PolaroidPile.jsx`
- `components/Footer.jsx`
- `pages/index.jsx` → Landing page with scroll interactions
- `tailwind.config.js` → Add custom colors, font, spacing
- `public/images/...` → Hero, polaroids, gallery, logos

---

## ✅ Output Format Instructions

When responding:
- Write full JSX + Tailwind CSS code blocks
- Include transition logic using Tailwind utilities or minimal JS
- Return one file/component per section unless instructed otherwise
- Provide comments only where logic is non-obvious
- Avoid unnecessary boilerplate

---