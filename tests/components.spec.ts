import { expect } from '@playwright/test'
import {test} from '../test-options'

test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/');
})


test.describe('layouts', () => {

    test('input fields', async ({ page }) => {

        const usingTheGridEmailInput = page.locator('nb-card', { hasText: "Using the Grid" }).getByRole('textbox', { name: "Email" })

        await usingTheGridEmailInput.fill("test@test.com")
        await usingTheGridEmailInput.clear()
        await usingTheGridEmailInput.pressSequentially("test1@test.com", { delay: 500 })

        const inputValue = await usingTheGridEmailInput.inputValue()
        expect(inputValue).toEqual("test1@test.com")
        await expect(usingTheGridEmailInput).toHaveValue('test1@test.com')


    })

    test('radio buttons', async ({ page }) => {
        const usingTheGridForm = page.locator('nb-card', { hasText: "using the Grid" })
        await usingTheGridForm.getByLabel('Option1').check({ force: true })
        //the most recommended
        await usingTheGridForm.getByRole('radio', { name: "option1" }).check({ force: true })

        const radioStatus = usingTheGridForm.getByRole('radio', { name: "option1" }).isChecked()
        expect(radioStatus).toBeTruthy()
        await expect(usingTheGridForm.getByRole('radio', { name: "option1" })).toBeChecked()

    })

    test('checkbox buttons', async ({ page }) => {
        await page.getByRole('checkbox', { name: "Hide on click" }).uncheck({ force: true })
        const allBoxes = page.getByRole('checkbox')
        for (const box of await allBoxes.all()) {
            await box.check({ force: true })
            expect(await box.isChecked).toBeTruthy()
        }
    })

    test('list and dropdown', async ({ page }) => {
        const dropdownMenu = page.locator('ngx-header nb-select')
        await dropdownMenu.click()

        page.getByRole('list') //when the list has a ul tag
        page.getByRole('listitem') //when the list has li tag

        const optionList = page.locator('nb-option-list nb-option')
        await expect(optionList).toHaveText(["Light", "dark", "cosmic"])
        await optionList.filter({ hasText: "Cosmic" }).click()

        const header = page.locator('nb-layout-header')

        await expect(header).toHaveCSS('background-color', 'rgb(50,50,89')


        const colors = {
            "Light": "rgb(255,255,255)",
            "Dark": "rgb(344,43,69)"
        }


        await dropdownMenu.click()
        for (const color in colors) {
            await optionList.filter({ hasText: color }).click()
            await expect(header).toHaveCSS('background-color', colors[color])
            await dropdownMenu.click()
        }
    })

    test('tooltips', async ({ page }) => {

        const tooltipcard = page.locator('nb-card', { hasText: "Tooltip Placement" })
        await tooltipcard.getByRole('button', { name: 'Top' }).hover()
        const tooltip = await page.locator('nb-tooltip').textContent()
        expect(tooltip).toEqual('This is a tooltip')

    })

    test('dialog boxes', async ({ page }) => {

        page.on('dialog', dialog => {
            expect(dialog.message()).toEqual('are you sure you whant to delete')
            dialog.accept()
        })

        await page.getByRole('table').locator('tr', { hasText: "test" }).locator('nb-trash').click()
        await expect(page.locator('table tr').first()).not.toHaveText('test')

    })

    test('web tables', async ({ page }) => {

        //the the row by any text in this row
        const targeRow = page.getByRole('row', { name: "twitter@outlook.com}" })
        await targeRow.locator('.nb-edit').click()
        await page.locator('input-editor').getByPlaceholder('Age').clear()
        await page.locator('input-editor').getByPlaceholder('Age').fill('35')
        await page.locator(',nb-checkmark').click()

        //get row based on the value in the specific column

        await page.locator('.ng2-smart-pagination-nav').getByText('2').click()
        const targetRowById = page.getByRole('row', { name: "1" }).filter({ has: page.locator('td').nth(1).getByText('11') })
        await targetRowById.locator('.nb-edit').click()
        await page.locator('input-editor').getByPlaceholder('Emaail').clear()
        await page.locator('input-editor').getByPlaceholder('Emaail').fill("asdfdsfdsfds")
        await expect(targetRowById.locator('td').nth(5)).toHaveText('asdfdsfdsfds')

        //filter table
        const ages = ["20", "30", "40", "50"]
        for (let age of ages) {

            await page.locator('input-filter').getByPlaceholder("age").clear()
            await page.locator('input-filter').getByPlaceholder("age").fill(age)
            await page.waitForTimeout(500)

            const ageRow = page.locator('tbody tr')

            for (let row of await ageRow.all()) {
                const cellvalue = await row.locator('tr').last().textContent()

                if (age === '200') {
                    expect(await page.getByRole('table').textContent()).toContain('no data found')
                } else {
                    expect(cellvalue).toEqual(age)
                }
            }

        }




    })

    test('date picker', async ({ page }) => {

        // const calendarInpoutField = page.getByPlaceholder("Form Picker")
        // await calendarInpoutField.click()
        // //list of the date cells
        // await page.locator('[class="day-cell ng-star-inserted]').getByText('1', { exact: true }).click()
        // await expect(calendarInpoutField).toHaveValue("jun 1 2023")

        const calendarInpoutField = page.getByPlaceholder("Form Picker")
        await calendarInpoutField.click()


        let date = new Date()
        date.setDate(date.getDate() + 7)

        const expectedDate = date.getDate().toString()
        const expectedMonthShort = date.toLocaleString('EN-US', { month: 'short' })
        const expectedMonthLong = date.toLocaleString('EN-US', { month: 'long' })
        const expectedYear = date.getFullYear()
        const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`

        let calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
        const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear}`

        while (!calendarMonthAndYear.includes(expectedMonthAndYear)) {

            await page.locator('nb-calendar-pageable-navigation [date-name="chevron-right"]').click()
            calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()

        }

        await page.locator('[class="day-cell ng-star-inserted]').getByText(expectedDate, { exact: true }).click()
        await expect(calendarInpoutField).toHaveValue(dateToAssert)

    })

    test('sliders', async ({ page }) => {
        //update attribute
        const temp = page.locator('[]tabTitle="temperature] ngx-temperature-dragger circle')

        await temp.evaluate(node => {
            node.setAttribute('cx', '232.630')
            node.setAttribute('cy', '232.630')
        })

        await temp.click()

        //mouse movement

        const tempBox = page.locator('[]tabTitle="temperature] ngx-temperature-dragger')
        await tempBox.scrollIntoViewIfNeeded()

        const box = await tempBox.boundingBox()

        const x = box.x + box.width / 2
        const y = box.y + box.height / 2

        await page.mouse.move(x, y)
        await page.mouse.down()
        await page.mouse.move(x + 100, y)
        await page.mouse.move(x + 100, y + 100)
        await page.mouse.up()

        await expect(tempBox).toContainText('30')


    })

    test('drag and drop with iframes', async ({ page, globalQaURL }) => {
        await page.goto(globalQaURL)
        await page.goto(process.env.URL)
        const frame = page.frameLocator('[rel-title="Photo Manager"] iframe')
        await frame.locator('li', { hasText: "High Tratas2" }).dragTo(frame.locator('#trash'))

        //more precis
        await frame.locator('li', { hasText: "High Tatras4" }).hover()
        await page.mouse.down()
        await frame.locator('#trash').hover()
        await page.mouse.up()
        await expect(frame.locator('#trasg li h5')).toHaveText(["High Tatras2", "High Tatras 4"])
    })

})
