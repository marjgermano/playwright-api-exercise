import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  reporter: "html",
  use: {
    // Fixed: Appended /notes/api so it routes directly to the Notes Microservice micro-app
    baseURL: "https://practice.expandtesting.com/notes/api/",
    extraHTTPHeaders: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  },
  testIgnore: ["**/src/**"],
});
