module.exports = {

  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/test-setup-helper.ts'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '!**/__tests__/test-setup-helper.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/.cursor/',
    '/.nvm/',
    '/.vscode/',
    '/dist/',
    '/build/',
    '/elasticsearch-',
    '/google-cloud-sdk/',
    '/neo4j/',
    '<rootDir>/src/__tests__/test-data-source.ts',
    '\\.d\\.ts$' // Ignore TypeScript declaration files
  ],
};
