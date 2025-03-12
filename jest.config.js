export default {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.[jt]sx?$": "babel-jest"
    },
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",  // Map `@/` to `src/`
        "\\.(css|scss)$": "identity-obj-proxy",
        "\\.(png|jpg|jpeg|gif|svg)$": "<rootDir>/__mocks__/fileMock.js"
    }
};