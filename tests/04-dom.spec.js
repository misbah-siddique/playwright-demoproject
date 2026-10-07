const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test('DOM: read, modify, and verify original state upon reload', async ({ page }, testInfo) => {
  const login = new LoginPage(page);
  await login.open();
  await login.login('standard_user', 'secret_sauce');
  
  const title = page.getByTestId('title');
  await expect(title).toHaveText('Products');
  
  const names = await page.getByTestId('inventory-item-name').allTextContents();
  expect(names).toHaveLength(6);
  
  await testInfo.attach('product-names', { body: JSON.stringify(names, null, 2), contentType: 'application/json' });
  await testInfo.attach('before-dom', { body: await page.screenshot(), contentType: 'image/png' });
  
  // This executes inside the browser context. Node.js variables are not directly accessible here.
  await title.evaluate((element, newText) => {
    element.textContent = newText;
    element.style.backgroundColor = '#ffdc80';
  }, 'My Practice Shop');
  
  await expect(title).toHaveText('My Practice Shop');
  await testInfo.attach('after-dom', { body: await page.screenshot(), contentType: 'image/png' });
  
  // Only the local DOM has been modified. Server-side or actual product behavior remains unchanged.
  await page.reload();
  await expect(title).toHaveText('Products');
});

test('dropdown: sort price from low to high', async ({ page }) => {
  const login = new LoginPage(page);
  await login.open();
  await login.login('standard_user', 'secret_sauce');
  
  await page.getByTestId('product-sort-container').selectOption('lohi');
  
  const prices = await page.getByTestId('inventory-item-price').allTextContents();
  const numbers = prices.map(text => Number(text.replace('$', '')));
  
  expect(numbers).toEqual([...numbers].sort((a, b) => a - b));
});
