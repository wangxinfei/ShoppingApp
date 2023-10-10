import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('http://localhost:4200/');
  
    await expect(page).toHaveTitle('Shopping App');
  });

  test('cart disabled', async ({ page }) => {
    await page.goto('http://localhost:4200/');

    const cartButton = await page.locator('#cartButton');
  
    await expect(cartButton).toBeDisabled;
  });

test('increment', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.locator('//*[@id="Phone XL"]/app-cart-counter/button[1]').click();

  const numProducts = await page.locator('//*[@id="Phone XL"]/app-cart-counter/p');
  await expect(numProducts).toHaveText('You have added: 1 products');
  
})



