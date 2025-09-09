import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:50596/');
    await page.getByText("Forms").click()
    await page.getByText("Form Layouts").click()
})


test.describe('suite1', () => {
    test('the first test ', async ({ page }) => {

    })

    test('the second test ', async ({ page }) => {

    })

})


test('locators', async ({ page }) => {
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
    await page.getByPlaceholder('Jane Doe').click()
    await page.getByText("Using the Grid").click()
    await page.getByTitle("IoT Dashboard").click()
})

test('Locating child elements ', async ({ page }) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card').locator(':text-is("Option 2")').click()
    await page.locator('nb-card').getByRole('button', { name: "Sign in" }).first().click()
    await page.locator('nb-card').nth(3).click()
})

test('Locating parent elements ', async ({ page }) => {
    await page.locator('nb-card', { hasText: "Using the Grid" }).getByRole('textbox', { name: "Email" }).click()
    await page.locator('nb-card', { has: page.locator('#inputEmail1') }).getByRole('textbox', { name: "Email" }).click()
    await page.locator('nb-card').filter({ hasText: "Basic form" }).getByRole('textbox', { name: "Email" }).click()
    await page.locator('nb-card').filter({ has: page.locator('.status-danger') }).getByRole('textbox', { name: "Password" }).click()
    await page.locator('nb-card').filter({ has: page.locator('nb-checkbox') }).filter({ hasText: "Sign in" }).getByRole('textbox', { name: "Email" }).click()
    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', { name: "Email" }).click()
})


test('Reusing locators ', async ({ page }) => {
    const basicForm = page.locator('nb-card').filter({ hasText: "Basic form" })
    const email = basicForm.getByRole('textbox', { name: "Email" })
    await email.fill("test")
    await basicForm.getByRole('textbox', { name: "Password" }).fill("test")
    await basicForm.getByRole('button').click()
    await expect(email).toHaveValue("test")
})

test('Extract locators', async ({ page }) => {
    //single text values
    const basicForm = page.locator('nb-card').filter({ hasText: "Basic form" })
    const buttonText = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')

    //all text values
    const allRadio = await page.locator('nb-radio').allTextContents()
    expect(allRadio).toContain("Option 1")

    //input value
    const emailField = basicForm.getByRole('textbox', { name: "Email" })
    await emailField.fill('sefdsfdsfds')
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('sefdsfdsfds')

    const placeHoldervalue = await emailField.getAttribute('placeholder')
    expect(placeHoldervalue).toEqual('Email')
})

test('Assertions', async ({ page }) => {
    const basicForm = page.locator('nb-card').filter({ hasText: "Basic form" })
    const email = basicForm.getByRole('textbox', { name: "Email" })
    await email.fill("sfdfdsfdsfds")
    await basicForm.getByRole('textbox', { name: "Password" }).fill("bnbvnbv")
    await basicForm.getByRole('button').click()
    await expect(email).toHaveValue("sfdfdsfdsfds")
})


test('Auto Waiting', async ({ page }) => {
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering Ajax Request').click()
    const succesButton = page.locator('.bg-success')
    await expect(succesButton).toHaveText('Data loaded with AJAX get request.', { timeout: 20000 })
}
)

test('Alternative Waiting', async ({ page }) => {
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering Ajax Request').click()
    const succesButton = page.locator('.bg-success')
    //wait for element
    await page.waitForSelector('.bg-success')

    //wait for particular response
    const text = await succesButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')

}
)

test('Timeouts', async ({ page }) => {
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering Ajax Request').click()
    const succesButton = page.locator('.bg-success')
    await succesButton.click({ timeout: 20000 })
}
)