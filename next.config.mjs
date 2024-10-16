 // next.config.mjs
export default {
    reactStrictMode: true, // Ensures React runs in strict mode for better error detection.
    
    experimental: {
      appDir: true, // Enables the app directory for Next.js 13 features (optional).
    },
    
    webpack: (config) => {
      // Modify Webpack configuration here if needed
      return config;
    },
  
    // Configure server-side rendering or dynamic imports (if needed)
    eslint: {
      // Ignore ESLint errors during builds (optional)
      ignoreDuringBuilds: true,
    },
    
    // Example for enabling more external image domains, if needed:
    images: {
      domains: ['your-image-domain.com'],
    }
  }
