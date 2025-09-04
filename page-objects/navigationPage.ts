import { Locator, Page } from "@playwright/test"
import { HelperBase } from "./helperBase"
export class NavigationPage extends HelperBase {

    readonly fromLayoutsMenuItem: Locator
    readonly tooltipMenuItem: Locator
    readonly datePickerMenuItem: Locator
    readonly smartTableMenuItem: Locator
    readonly toastrMenuItem: Locator


    constructor(page: Page) {
        super(page)
        this.fromLayoutsMenuItem = page.getByText('Form Layouts')
        this.datePickerMenuItem = page.getByText('Datepicker')
        this.smartTableMenuItem = page.getByText('Smart Table')
        this.toastrMenuItem = page.getByText('Toastr')
        this.tooltipMenuItem = page.getByText('Tooltip')
    }

    async formLayoutsPage() {
        await this.selectGroupMenuItem('Forms')
        await this.waitForSeconds(2)
        await this.fromLayoutsMenuItem.click()
        await this.waitForSeconds(2)

    }
    async datePickerPage() {
        await this.selectGroupMenuItem('Forms')
        await this.datePickerMenuItem.click()

    }
    async smartTablePage() {
        await this.selectGroupMenuItem('Tables & Data')
        await this.smartTableMenuItem.click()

    }
    async toastPage() {
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.toastrMenuItem.click()

    }
    async tooltipPage() {
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.tooltipMenuItem.click()

    }

    private async selectGroupMenuItem(groupItemTitle: string) {
        const groupMenuItem = this.page.getByTitle(groupItemTitle)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')
        if (expandedState == 'false') {
            await groupMenuItem.click()
        }
    }
}
