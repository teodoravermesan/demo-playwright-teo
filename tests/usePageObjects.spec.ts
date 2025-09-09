import { test } from '../test-options'
import { PageManager } from '../page-objects/pageManager';
import { faker } from '@faker-js/faker'
import { argosScreenshot } from "@argos-ci/playwright"

test.describe.configure({ mode: 'parallel' })

test('navigate to form page', async ({pageManager }) => {
    await pageManager.navigateTo().datePickerPage()
    await pageManager.navigateTo().smartTablePage()
    await pageManager.navigateTo().toastPage()
    await pageManager.navigateTo().tooltipPage()
});
test('login', async ({ page, pageManager}) => {
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`
    await pageManager.navigateTo().formLayoutsPage()
    await pageManager.onFormLayoutsPage().submitForm(process.env.USERNAME, process.env.PASSWORD, "Option 1")
    await page.screenshot({ path: 'screenshots/formsLayoutsPage.png' })
    await pageManager.onFormLayoutsPage().submitForm1(randomFullName, randomEmail, false)
    await page.locator('nb-card', { hasText: "Inline form" }).screenshot({ path: 'screenshots/locator.png' })
    await pageManager.navigateTo().datePickerPage()
    //await pm.onDatePickerPage().selectDate(5)
    await pageManager.onDatePickerPage().selectDateWithrange(6, 15)
});


test('test @smoke', async ({ pageManager }) => {
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`
    await pageManager.onFormLayoutsPage().submitForm(process.env.USERNAME, process.env.PASSWORD, "Option 1")
    await pageManager.onFormLayoutsPage().submitForm1(randomFullName, randomEmail, false)
});

test('testing with argos ci', async ({ page , pageManager}) => {
    await pageManager.navigateTo().formLayoutsPage()
    await argosScreenshot(page, "form layots page")
    await pageManager.navigateTo().datePickerPage()
    await argosScreenshot(page, "this is date picker page")
})
