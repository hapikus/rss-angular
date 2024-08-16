module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  globalSetup: 'jest-preset-angular/global-setup',
  testEnvironment: 'jsdom',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'lcov', 'text'],
  moduleNameMapper: {
    '^@services/(.*)$': '<rootDir>/src/app/services/$1',
    '^@models/(.*)$': '<rootDir>/src/app/models/$1',
    '^@shared/(.*)$': '<rootDir>/src/app/shared/$1',
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  transformIgnorePatterns: [
    'node_modules/(?!.*\\.mjs$)'
  ]
};