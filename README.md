# PlantGuard

PlantGuard is a plant health assistant that helps you detect diseases from leaf images, get treatment recommendations, check weather-based care tips, and find nearby nurseries.

## Features
- Disease detection from images using a TensorFlow.js model
- Treatment advice sourced from Supabase and local data
- Weather-based care guidance for your location
- Nursery locator and plant care advisor
- Clean UI built with React, Tailwind CSS, and shadcn-ui components

## Tech Stack
- Vite
- React + TypeScript
- Tailwind CSS + shadcn-ui
- Supabase (Auth and data)
- TensorFlow.js

## Requirements
- Node.js and npm
- Supabase project (for auth and treatments data)

## Setup
1. Clone the repository
2. Install dependencies
3. Configure environment variables
4. Start the development server

```bash
git clone https://github.com/suraj4507-svg/PlantGuard.git
cd PlantGuard
npm install
npm run dev
```

## Environment Variables
Create a file named `.env.local` in the project root:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Scripts
- npm run dev: Start the development server
- npm run build: Build for production
- npm run preview: Preview the production build
- npm run test: Run tests
- npm run lint: Run ESLint

## Testing
- Uses Vitest and Testing Library
- Test setup is under `src/test`

## Deployment
- Build with `npm run build`
- Serve the `dist` folder with your preferred host

## License
- MIT (unless otherwise specified)
