module.exports = {
    testEnvironment: 'node',

    transform: {
        '^.+\\.js$': 'babel-jest',
    },

    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.js'],

    coverageThreshold: {
        global: {
            lines: 100,
            statements: 100,
            functions: 100,
            branches: 100,
        },
    },
};
