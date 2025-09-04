import { Page} from "@playwright/test";


export class HelperBase {

    readonly page: Page

    constructor (page: Page) {
        this.page = page
    }

    async waitForSeconds (timeiInSeconds: number) {
        await this.page.waitForTimeout(timeiInSeconds * 1000)
    }
}