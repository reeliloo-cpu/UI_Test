import { Locator, Page } from '@playwright/test'

export class OrderPage {
  readonly page: Page
  readonly statusButton: Locator
  readonly customerName: Locator
  readonly customerPhone: Locator
  readonly createOrderButton: Locator
  readonly orderCreatedButton: Locator
  readonly logoutButton: Locator
  // add more locators here

  constructor(page: Page) {
    this.page = page
    this.statusButton = page.getByTestId('openStatusPopup-button')
    this.customerName = page.getByTestId('username-input')
    this.customerPhone = page.getByTestId('phone-input')
    this.createOrderButton = page.getByTestId('createOrder-button')
    this.orderCreatedButton = page.getByTestId('orderSuccessfullyCreated-popup-ok-button')
    this.logoutButton = page.getByTestId('logout-button')
  }
}
