import type { Config } from 'jest'

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  preset: 'ts-jest',
  testPathIgnorePatterns: [
    '/node_modules/',
    '/e2e/' // Exclude e2e directory
  ],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^.+\\.svg$': 'jest-svg-transformer',
    '^.+\\.(css|less|scss)$': 'identity-obj-proxy'
  }
}

export default config
