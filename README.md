# Playwright — Project

This is a beginner-friendly Playwright test automation project built using **Plain JavaScript**, **Chromium browser**, and the **Sauce Demo** public practice website. The project scripts and guide lessons feature Roman Urdu comments to make learning automation highly accessible.

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally on your system:

1. **Install Node.js:** Ensure you have **Node.js 22** or newer installed.
2. **Open Terminal:** Open your terminal or command prompt inside this project folder.
3. **Install Dependencies:** Clean install the required packages by running:
   ```bash
   npm ci
   ```
4. **Install Browser:** Download the required Chromium browser binaries for Playwright:
   ```bash
   npx playwright install chromium
   ```
5. **Run Tests:** Execute the test suite to ensure everything is working correctly:
   ```bash
   npm test
   ```


## 🛠️ Execution & Reporting Commands

Use these commands to run your tests in different environments or to inspect test executions:

```bash
# Run tests in headed mode (opens the physical browser window)
npm run test:headed

# Open Playwright UI Mode (interactive execution and time-travel debugging)
npm run test:ui

# Run tests in debug mode
npm run test:debug

# View the generated HTML test report
npm run report

# Run a single, specific test file
npx playwright test tests/02-data-driven.spec.js
```
---

## ⚠️ Important Notes

*   **Internet Connection:** An active internet connection is required since the tests interact directly with a public web application.
*   **Website Stability:** Because it targets a live public demo website, elements may occasionally change or become temporarily unavailable.
*   **Credentials:** Demo credentials are intentionally kept in the open data file for practice purposes. **Never store real or personal passwords in this repository.**
*   **DOM Modifications:** UI modifications executed during the DOM tests only alter the browser's local state and layout. They do not constitute proof of backend or server-side behavior.

---

## 📁 Folder Structure

```text
├── playwright.config.js       # Global browser settings and reporting setup
├── data/                      # Input rows and structured test data (JSON)
├── pages/                     # Page Object Models (Locators & reusable actions)
├── tests/                     # Runnable test suite examples

```

---

## 🔗 Official References

For deeper context and advanced documentation, consult the official Playwright resources:
*   [Playwright Installation & Intro Guide](https://playwright.dev)
*   [Data Parameterization in Playwright](https://playwright.dev)
*   [Page Object Models (POM)](https://playwright.dev)
*   [Evaluating JavaScript & Navigating DOM](https://playwright.dev)
