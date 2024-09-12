module.exports = {
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.ts$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
    '^.+\\.js$': ['babel-jest', { 
      presets: ['@babel/preset-env', '@babel/preset-react']
    }],
  },
  testMatch: [
    '**/__tests__/**/*.ts',
    '**/__tests__/**/*.js',
    '**/?(*.)+(spec|test).[tj]s'
  ],
  transformIgnorePatterns: [
    '/node_modules/',  // Ignore transforming files inside node_modules by default
  ],
};
