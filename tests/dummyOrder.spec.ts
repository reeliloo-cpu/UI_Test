import { test, expect, Locator, PlaywrightTestArgs, PlaywrightTestOptions } from "@playwright/test";

// scenarios to implement


// 5 - button disabled with fields

test.beforeEach(async ({ page }: PlaywrightTestArgs & PlaywrightTestOptions): Promise<void> => {
    const path = require('path');
    const filepath = `file://${path.resolve('html/dummy-order.html')}`;
    await page.goto(filepath);
});

test('All elements are visible', async ({ page }: PlaywrightTestArgs & PlaywrightTestOptions): Promise<void> => {
    const orderButton: Locator = page.getByTestId('submit-order');
    const usernameField: Locator = page.getByTestId('username');
    const emailField: Locator = page.getByTestId('email');

    await expect(orderButton).toBeVisible();
    await expect(usernameField).toBeVisible();
    await expect(emailField).toBeVisible();
    await expect(orderButton).toBeDisabled();
});

test('Submit order', async ({ page }: PlaywrightTestArgs & PlaywrightTestOptions): Promise<void> => {
    const orderButton: Locator = page.getByTestId('submit-order');
    const usernameField: Locator = page.getByTestId('username');
    const emailField: Locator = page.locator('#email');
    const popupOK: Locator = page.locator('#popup-message');

    await usernameField.fill('MyUsername');
    await emailField.fill('test@test.com');
    await orderButton.click();
    await expect(popupOK).toBeVisible();
});

test('Submit with invalid e-mail- order cant be placed', async ({ page }: PlaywrightTestArgs & PlaywrightTestOptions): Promise<void> => {
    const orderButton: Locator = page.getByTestId('submit-order');
    const usernameField: Locator = page.getByTestId('username');
    const emailField: Locator = page.getByTestId('email');

    await usernameField.fill('MyUsername');
    await emailField.fill('test@test'); // invalid email format

    await expect(orderButton).toBeDisabled();
});

test('Order cant be submitted- empty username field', async ({ page }: PlaywrightTestArgs & PlaywrightTestOptions): Promise<void> => {
    const orderButton: Locator = page.getByTestId('submit-order');
    const emailField: Locator = page.getByTestId('email');


    await emailField.fill('test@test.com');

    await expect(orderButton).toBeDisabled();
});

test('Order cant be submitted- empty e-mail field', async ({ page }: PlaywrightTestArgs & PlaywrightTestOptions): Promise<void> => {
    const orderButton: Locator = page.getByTestId('submit-order');
    const usernameField: Locator = page.getByTestId('username');


    await usernameField.fill('MyUsername');

    await expect(orderButton).toBeDisabled();
});