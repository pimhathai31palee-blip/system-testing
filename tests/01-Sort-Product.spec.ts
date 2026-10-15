import { test, expect } from '@playwright/test';

test('ST-01: Sort Product ราคาต่ำไปสูงต้องเรียงถูกต้อง', async ({ page }) => {
  
    await page.goto('/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.locator('.inventory_item')).toHaveCount(6);

    await page
        .locator('[data-test="product-sort-container"]')
        .selectOption('lohi');

    const priceTexts = await page
        .locator('.inventory_item_price')
        .allTextContents();

    const prices = priceTexts.map((text) => Number(text.replace('$', '')));

    expect(prices).toHaveLength(6);

    const expected = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(expected);

    await expect(page.locator('.inventory_item_name').first())
        .toHaveText('Sauce Labs Onesie');
});