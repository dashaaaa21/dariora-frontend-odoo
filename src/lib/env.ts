/**
 * Environment configuration and validation
 */

export const env = {
  // API
  API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  API_TIMEOUT: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '30000'),

  // App
  APP_NAME: 'DARIORA',
  APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',

  // Features
  ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  ENABLE_DEBUG: process.env.NEXT_PUBLIC_ENABLE_DEBUG === 'true',
} as const;

/**
 * Validate required environment variables
 */
export function validateEnv(): void {
  const required = ['NEXT_PUBLIC_API_URL'];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}
