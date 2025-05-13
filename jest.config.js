export default {
    preset: "ts-jest/presets/default-esm",
    extensionsToTreatAsEsm: [".ts"],
    transform: {
      "^.+\\.ts$": [
        "ts-jest",
        {
          tsconfig: "tsconfig.jest.json",
          useESM: true,
        },
      ],
    },
    moduleNameMapper: {
      "^(\\.{1,2}/.*)\\.js$": "$1",
    },
  };
  