import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { faker } from '@faker-js/faker/locale/en'
import { PASSWORD, USERNAME } from '../../config/env-data'

let loginPage: LoginPage

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page)
  await loginPage.open()
})

test('signIn button disabled when incorrect data inserted', async ({}) => {
  await loginPage.usernameField.fill(faker.lorem.word(2))
  await loginPage.passwordField.fill(faker.lorem.word(7))
  await expect(loginPage.signInButton).toBeDisabled()
})

test('error message displayed when incorrect credentials used', async ({}) => {
  await loginPage.usernameField.fill('wrongUserName')
  await loginPage.passwordField.fill('wrongUserPassword')
  await loginPage.signInButton.click()
  await expect(loginPage.incorrectCredentials).toBeVisible()
})

test('login with correct credentials and verify order creation page', async ({}) => {
  const orderCreationPage = await loginPage.signIn(USERNAME, PASSWORD)
  await expect(orderCreationPage.statusButton).toBeVisible()
  await expect(orderCreationPage.createOrderButton).toBeVisible()
})

test('login and create order', async ({}) => {
  const orderCreationPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.customerName.fill(faker.lorem.word(2))
  await orderCreationPage.customerPhone.fill('55555567')
  await orderCreationPage.createOrderButton.click()
  await expect(orderCreationPage.orderCreatedButton).toBeVisible()
})
