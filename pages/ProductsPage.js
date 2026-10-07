class ProductsPage {
  constructor(page) {
    this.page = page;
    this.items = page.getByTestId('inventory-item');
    this.cart = page.getByTestId('shopping-cart-link');
    this.badge = page.getByTestId('shopping-cart-badge');
  }
  
  async addProduct(name) {
    // First locate the correct item card, then click its button.
    const card = this.items.filter({ has: this.page.getByTestId('inventory-item-name').filter({ hasText: name }) });
    await card.getByRole('button', { name: 'Add to cart', exact: true }).click();
  }
  
  async openCart() { await this.cart.click(); }
}

module.exports = { ProductsPage };
