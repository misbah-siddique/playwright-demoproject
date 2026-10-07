const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({
  testDir: './tests',
  workers: 1, // Seekhne ke liye aik waqt mein aik test.
  timeout: 30000,
  expect: { timeout: 10000 },
  retries: 0, // Failure chupane ke bajaye usay samjho.
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'https://www.saucedemo.com',
    browserName: 'chromium',
    testIdAttribute: 'data-test',
    viewport: { width: 1280, height: 800 },
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
  },
});
