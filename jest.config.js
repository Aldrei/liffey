/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './src',
  collectCoverageFrom: [
    '<rootDir>/**/*.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  modulePathIgnorePatterns: [
    '/dist/',
    '/node_modules/',
    '<rootDir>/database/docker-entrypoint-initdb.d'
  ],
  coverageDirectory: '_coverage',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1'
  }
};