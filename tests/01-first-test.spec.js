const { test, expect } = require('@playwright/test');

test('First test Login and logout', async ({ page }) => {
  // await: Wait for the browser action to complete.
  await page.goto('/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  
  // expect: Verify the result. Just clicking the button is not enough.
  await expect(page).toHaveURL(/inventory.html$/);
  await expect(page.getByTestId('title')).toHaveText('Products');
  
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.getByRole('button', { name: 'Logout', exact: true }).click();
  await expect(page.getByPlaceholder('Username')).toBeVisible();
});

