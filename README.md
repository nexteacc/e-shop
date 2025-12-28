

## 🚀 Tech Stack

### Core Framework
- **React**: 19.2.3 - UI library
- **React DOM**: 19.2.3 - React rendering
- **TypeScript**: 5.8.3 - Type safety
- **Vite**: 6.4.1 - Build tool and dev server

### UI & Styling
- **Tailwind CSS**: Via CDN - Utility-first CSS framework
- **Lucide React**: 0.562.0 - Icon library
- **Google Fonts**: Inter (sans-serif), Playfair Display (serif)

### Development Tools
- **@vitejs/plugin-react**: 5.1.2 - Vite plugin for React
- **@types/node**: 22.19.3 - TypeScript definitions for Node.js

### Deployment
- **Platform**: Vercel
- **Module System**: ESM (ES Modules)
- **Package Manager**: npm

## 📦 Installation

**Prerequisites:** Node.js (v18 or higher recommended)

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set the `GEMINI_API_KEY` in `.env.local` to your Gemini API key (optional, for AI Studio integration)

3. Run the app:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview production build:
   ```bash
   npm run preview
   ```

## 🔧 Available Scripts

### Development
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Dependency Management
- `npm run audit` - Check for security vulnerabilities
- `npm run audit:fix` - Fix automatically fixable vulnerabilities
- `npm run outdated` - Check for outdated packages
- `npm run deps:check` - Check both outdated packages and security issues
- `npm run deps:update` - Update packages within version ranges
- `npm run deps:install` - Install/update dependencies

## 📋 Dependency Management

This project uses `package-lock.json` to ensure consistent dependency versions across all environments.

### Best Practices
- ✅ **Always commit `package-lock.json`** to version control
- ✅ **Run `npm install`** after pulling changes to sync dependencies
- ✅ **Use `npm run audit`** regularly to check for security issues
- ✅ **Review updates** before running `npm run deps:update`

### Version Update Strategy
- **Patch updates** (x.x.1): Safe to update automatically
- **Minor updates** (x.1.x): Review changelog before updating
- **Major updates** (1.x.x): Requires thorough testing and may need code changes

### Current Dependency Status
- All dependencies are up to date within their specified version ranges
- No known security vulnerabilities
- Lock file is synchronized with `package.json`

## 🏗️ Project Structure

```
e-shop/
├── public/              # Static assets (images)
├── App.tsx             # Main application component
├── index.tsx           # Application entry point
├── index.html          # HTML template
├── vite.config.ts      # Vite configuration
├── tsconfig.json       # TypeScript configuration
├── package.json        # Dependencies and scripts
├── package-lock.json   # Dependency lock file
└── vercel.json        # Vercel deployment configuration
```

## 🌐 Deployment

This project is configured for deployment on Vercel:

1. Push your code to a Git repository
2. Connect the repository to Vercel
3. Vercel will automatically detect Vite and configure the build
4. The `vercel.json` file ensures proper routing for the SPA

### Build Configuration
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node Version**: Auto-detected

## 📝 Notes

- Images in the `public/` folder are automatically served at the root path (e.g., `/chantecaille.png`)
- The project uses Tailwind CSS via CDN for styling
- All React dependencies are loaded via ESM import map in development
