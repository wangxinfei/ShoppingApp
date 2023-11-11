import { test, expect } from '@playwright/test';


test('test cart button', async ({ page }) => {
  await page.goto('http://localhost:4200/');

  // enter the page with cart amount 0, cart disables
  const cartButton = await page.locator('#cartButton');
  await expect(cartButton).toBeDisabled;

  // increment one item, cart enables
  await page.locator('//*[@id="Phone XL"]/app-cart-counter/button[1]').click();
  // const numProducts = await page.locator('//*[@id="Phone XL"]/app-cart-counter/p');
  // await expect(numProducts).toHaveText('You have added: 1 products');
  await expect(cartButton).toBeEnabled;

  // click cart button, ensure go to correct route
  await cartButton.click();
  await expect(page).toHaveURL('http://localhost:4200/cart');
})

  









