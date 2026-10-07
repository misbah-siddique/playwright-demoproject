const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ProductsPage } = require('../pages/ProductsPage');

test.beforeEach(async ({ page }) => {
  const login = new LoginPage(page);
  await login.open();
  await login.login('standard_user', 'secret_sauce');
});

test('page models: from product selection to order placement', async ({ page }) => {
  const products = new ProductsPage(page);

  await test.step('Add backpack to cart', async () => {
    await products.addProduct('Sauce Labs Backpack');
    await expect(products.badge).toHaveText('1');
    await products.openCart();
    await expect(page).toHaveURL(/cart.html$/);
    await expect(page.getByTestId('title')).toHaveText('Your Cart');
    await expect(page.getByTestId('inventory-item-name')).toHaveText('Sauce Labs Backpack');
  });

  await test.step('Fill in your demo details', async () => {
    await page.getByRole('button', { name: 'Checkout', exact: true }).click();
    await page.getByPlaceholder('First Name').fill('Ali');
    await page.getByPlaceholder('Last Name').fill('Khan');
    await page.getByPlaceholder('Zip/Postal Code').fill('54000');
    await page.getByRole('button', { name: 'Continue', exact: true }).click();
    await expect(page).toHaveURL(/checkout-step-two.html$/);
  });

  await test.step('Verify order details and finish', async () => {
    await expect(page.getByTestId('inventory-item-name')).toHaveText('Sauce Labs Backpack');
    await expect(page.getByTestId('subtotal-label')).toHaveText('Item total: $29.99');
    await page.getByRole('button', { name: 'Finish', exact: true }).click();
    await expect(page.getByTestId('complete-header')).toHaveText('Thank you for your order!');
  });
});

test('remove product from cart', async ({ page }) => {
  const products = new ProductsPage(page);
  await products.addProduct('Sauce Labs Backpack');
  await products.openCart();
  await expect(page).toHaveURL(/cart.html$/);
  await expect(page.getByTestId('title')).toHaveText('Your Cart');
  await page.getByRole('button', { name: 'Remove', exact: true }).click();
  await expect(page.getByTestId('inventory-item')).toHaveCount(0);
  await expect(products.badge).toHaveCount(0);
});
