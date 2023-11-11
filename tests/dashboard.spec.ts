import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('http://localhost:4200/');
  
    await expect(page).toHaveTitle('Shopping App');
  });

  test.describe('test adding/deleting product', () => {
    test('test add product', async ({ page }) => {
        await page.goto('http://localhost:4200/');
        const addButton = page.locator('//*[@id="Phone XL"]/app-cart-counter/button[1]')

        // when there is 0 item, add button enabled
        await expect(addButton).toBeEnabled;
      
        // increment one item, word changes
        await addButton.click();
        const numProducts = await page.locator('//*[@id="Phone XL"]/app-cart-counter/p');
        await expect(numProducts).toHaveText('You have added: 1 products');
    
      })

    test('test delete product', async ({ page }) => {
        await page.goto('http://localhost:4200/');

        // when there is 0 item, delete button disabled
        const deleteButton = page.locator('//*[@id="Phone XL"]/app-cart-counter/button[2]')
        await expect(deleteButton).toBeDisabled;
      
        // increment one item, delete button enabled
        const addButton = page.locator('//*[@id="Phone XL"]/app-cart-counter/button[1]')
        await addButton.click();
        await expect(deleteButton).toBeEnabled;
        
        // delete one item, words changes
        await deleteButton.click();
        const numProducts = await page.locator('//*[@id="Phone XL"]/app-cart-counter/p');
        await expect(numProducts).toHaveText('You have added: 0 products');

        // delete button became disabled when back to 0
        await expect(deleteButton).toBeDisabled;
      })

    
    
  })
  

