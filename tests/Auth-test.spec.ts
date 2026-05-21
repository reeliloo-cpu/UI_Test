import {expect, Locator, PlaywrightTestArgs, PlaywrightTestOptions, test} from "@playwright/test";


test('With incorrect credentials check auth error', async ({ page }: PlaywrightTestArgs & PlaywrightTestOptions): Promise<void> => {

    const URL ='https://fe-delivery.tallinn-learning.ee/signin'
    await page.goto(URL)

    const username: Locator = page.getByTestId('username-input');
    const password: Locator = page.getByTestId('password-input');
    const signIn: Locator = page.getByTestId('signIn-button');
    const error: Locator = page.getByTestId('authorizationError-popup');

    await username.fill('random-name');
    await password.fill('random-1234');
    await signIn.click();

    await expect(error).toBeVisible();
});

