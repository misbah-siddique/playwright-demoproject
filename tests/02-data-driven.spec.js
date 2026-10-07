const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const cases = require('../data/login-cases.json');

// Each row creates its own separate test; every test receives a fresh browser context.
for (const row of cases) {
  test(`login data: ${row.name}`, async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await login.login(row.username, row.password);
    if (row.success) {
      await expect(page).toHaveURL(/inventory.html\$/);
      await expect(page.getByTestId('title')).toHaveText('Products');
    } else {
      await expect(login.error).toContainText(row.error);
      await expect(login.button).toBeVisible();
    }
  });
}
