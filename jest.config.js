module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',  
  roots: ['<rootDir>/src/'], 
  testMatch: ['**/tests/**/*.test.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json'  
    }
  }, 
  collectCoverage: true,  
  collectCoverageFrom: ['<rootDir>/src/**/*.{ts,js}', '!**/node_modules/**', '!<rootDir>/src/**/*.d.ts'], 
  coverageDirectory: '<rootDir>/coverage/',  
  coverageReporters: ['text', 'lcov'],  
};
