import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await page.getByText("Get Started").click()
})


test.describe('tauite1', () => {

    test('the first test ', async ({ page }) => {
        await page.getByText("Get Started").click()
    })

})


test.describe('tauite2', () => {
    test('the first test ', async ({ page }) => {
        await page.getByText("Get Started").click()
    })

})


test('the first test ', async ({ page }) => {
    //tag name
    page.locator('input')
    //id
    page.locator('#inputEmail')
    //class value
    page.locator('.shape')
    //attribute
    page.locator('[placeholder="Email"]')
    //class value full
    page.locator('[class="sedfdsfdsfds]')
    //diff combi
    page.locator('input[placeholder="Email"]')
    //exact test
    page.locator(':text-is("Using")')
})

test('User facing locator', async ({ page }) => {
    await page.getByRole('textbox', { name: "Email" }).first().click()
    await page.getByRole('button', { name: "Sign in" }).first().click()
    await page.getByLabel('Email').first().click()
    await page.getByPlaceholder('Jane').click()
    await page.getByText("Using the grid").click()
    await page.getByTitle("sdfdsfd").click()
})

test('locating child elements ', async ({ page }) => {
    await page.locator('nb-card nb-radio :text-is("Option1")').click()
    await page.locator('nb-card').locator(':text-is("Optional")').click()
    await page.locator('nb-card').getByRole('button', { name: "Sign in" }).first().click()
    await page.locator('nb-card').nth(3).click()
})

test('locating parent elements ', async ({ page }) => {
    await page.locator('nb-card', { hasText: "Using the Grid" }).getByRole('textbox', { name: "Email" }).click()
    await page.locator('nb-card').filter({ hasText: "Basic form" }).getByRole('textbox', { name: "Email" }).click()
    await page.locator('nb-card').filter({ has: page.locator('.status-danger') }).getByRole('textbox', { name: "Password" }).click()
    await page.locator('nb-card').filter({ has: page.locator('.status-danger') }).filter({ hasText: "Sign in" }).getByRole('textbox', { name: "Password" }).click()

})


test('reusing locators ', async ({ page }) => {
    const basicForm = page.locator('nb-card').filter({ hasText: "Basic form" })
    const email = basicForm.getByRole('textbox', { name: "Email" })
    await email.fill("sfdfdsfdsfds")
    await basicForm.getByRole('textbox', { name: "Password" }).fill("bnbvnbv")
    await basicForm.getByRole('button').click()
    await expect(email).toHaveValue("sdfdgfdsgfd")
})

test('extract', async ({ page }) => {
    //single text values
    const basicForm = page.locator('nb-card').filter({ hasText: "Basic form" })
    const buttonText = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')

    //all text values
    const allRadio = await page.locator('nb-radio').allTextContents()
    expect(allRadio).toContain("option1")

    //input value
    const emailField = basicForm.getByRole('textbox', { name: "Email" })
    await emailField.fill('sefdsfdsfds')
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('asdsasadsa')

    const placeHoldervalue = await emailField.getAttribute('placeholder')
    expect(placeHoldervalue).toEqual('Email')

})


test('assert', async ({ page }) => {
    const basicForm = page.locator('nb-card').filter({ hasText: "Basic form" })
    const email = basicForm.getByRole('textbox', { name: "Email" })
    await email.fill("sfdfdsfdsfds")
    await basicForm.getByRole('textbox', { name: "Password" }).fill("bnbvnbv")
    await basicForm.getByRole('button').click()
    await expect(email).toHaveValue("sdfdgfdsgfd")
})


test('auto waiting', async ({ page }) => {
    const succesButton = page.locator('.bg-success')
    await expect(succesButton).toHaveText("sdfdsfdsfsdf", { timeout: 2000 })
}
)


test('alternative waiting', async ({ page }) => {
    const succesButton = page.locator('.bg-success')
    //wait for element
    await page.waitForSelector('.bg-success')

    //wait for particvular response
    const text = await succesButton.allTextContents()
    expect(text).toContain('dfsfds')

}
)


test('timeouts', async ({ page }) => {
    const succesButton = page.locator('.bg-success')
    await succesButton.click({ timeout: 16000 })
}
)