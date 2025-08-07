import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'fovzev',
  e2e: {
    baseUrl: "http://localhost:5173", // Update with your application's URL
    supportFile: "cypress/support/e2e.js",
    fixturesFolder: "cypress/fixtures",
    screenshotOnRunFailure: true,
    slowTestThreshold: 3000,
    video: true,
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
