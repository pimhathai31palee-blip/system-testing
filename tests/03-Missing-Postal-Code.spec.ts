import { test, expect } from '@playwright/test';

test('ST-03: Checkout ต้องแจ้งเตือนเมื่อไม่กรอก Postal Code', async ({ page }) => {

  await page.goto('/');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();
  await expect(page).toHaveURL(/inventory\.html/);

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  await page.locator('.shopping_cart_link').click();
  await expect(page).toHaveURL(/cart\.html/);

  await page.locator('[data-test="checkout"]').click();
  await expect(page).toHaveURL(/checkout-step-one\.html/);

  await page.locator('#first-name').fill('John');
  await page.locator('#last-name').fill('Doe');
  await page.locator('[data-test="continue"]').click();

  await expect(page.locator('[data-test="error"]'))
    .toContainText('Postal Code is required');

  await expect(page).toHaveURL(/checkout-step-one\.html/);

  await expect(page.locator('#first-name')).toHaveValue('John');
  await expect(page.locator('#last-name')).toHaveValue('Doe');
});