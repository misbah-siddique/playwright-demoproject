class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.getByPlaceholder('Username');
    this.password = page.getByPlaceholder('Password');
    this.button = page.getByRole('button', { name: 'Login', exact: true });
    this.error = page.getByTestId('error');
  }
  async open() { await this.page.goto('/'); }
  async login(username, password) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.button.click();
  }
}
module.exports = { LoginPage };
