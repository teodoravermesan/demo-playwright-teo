import { Page, expect } from "@playwright/test"
import { HelperBase } from "./helperBase"
export class DatePickerPage extends HelperBase {

    constructor(page: Page) {
        super(page)

    }

    async selectDate(numberOfDaysFromToday: number) {
        const calendarInpoutField = this.page.getByPlaceholder('Form Picker')
        await calendarInpoutField.click()
        await this.selectDateInCalendar(numberOfDaysFromToday)
        const dateToAssert = await this.selectDateInCalendar(numberOfDaysFromToday)
        await expect(calendarInpoutField).toHaveValue(dateToAssert)
    }

    async selectDateWithrange(startDayFromToday: number, endDateFromToday: number) {
        const calendarInpoutField = this.page.getByPlaceholder('Range Picker')
        await calendarInpoutField.click()
        const dateToAssertStart = await this.selectDateInCalendar(startDayFromToday)
        const dateToAssertEnd = await this.selectDateInCalendar(endDateFromToday)

        const dateToAssert = `${dateToAssertStart} - ${dateToAssertEnd}`
        await expect(calendarInpoutField).toHaveValue(dateToAssert)
    }


    private async selectDateInCalendar(numberOfDaysFromToday: number) {
        let date = new Date()
        date.setDate(date.getDate() + numberOfDaysFromToday)

        const expectedDate = date.getDate().toString()
        const expectedMonthShort = date.toLocaleString('En-US', { month: 'short' })
        const expectedMonthLong = date.toLocaleString('En-US', { month: 'long' })
        const expectedYear = date.getFullYear()
        const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`

        let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear}`

        while (!calendarMonthAndYear.includes(expectedMonthAndYear)) {

            await this.page.locator('nb-calendar-pageable-navigation [date-name="chevron-right"]').click()
            calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()

        }

        await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDate, { exact: true }).click()
        return dateToAssert
    }

}