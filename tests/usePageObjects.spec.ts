import { test } from '../test-options'
import { PageManager } from '../page-objects/pageManager';
import { faker } from '@faker-js/faker'
import { argosScreenshot } from "@argos-ci/playwright"

test.describe.configure({ mode: 'parallel' })

test.beforeEach(async ({ page }) => {
    await page.goto('/');
})

test('navigate to form page', async ({ page }) => {
    // test.describe.configure({retries:2})
    //test.describe.configure({mode: 'serial'})
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datePickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastPage()
    await pm.navigateTo().tooltipPage()
});
test('login', async ({ page }) => {
    const pm = new PageManager(page)
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`
    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitForm(process.env.USERNAME, process.env.PASSWORD, "Option 1")
    await page.screenshot({ path: 'screenshots/formsLayoutsPage.png' })
    await pm.onFormLayoutsPage().submitForm1(randomFullName, randomEmail, false)
    await page.locator('nb-card', { hasText: "Inline form" }).screenshot({ path: 'screenshots/locator.png' })
    await pm.navigateTo().datePickerPage()
    // await pm.onDatePickerPage().selectDate(5)
    await pm.onDatePickerPage().selectDateWithrange(6, 15)
});


test('test test @smoke', async ({ pageManager, formLayoutsPage }) => {
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`
    await pageManager.onFormLayoutsPage().submitForm(process.env.USERNAME, process.env.PASSWORD, "Option 1")
    await pageManager.onFormLayoutsPage().submitForm1(randomFullName, randomEmail, false)
});

test('testing with argos ci', async ({ page }) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await argosScreenshot(page, "form layots page")
    await pm.navigateTo().datePickerPage()
    await argosScreenshot(page, "date picker page")
})
