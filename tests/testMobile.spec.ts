import { test } from '../test-options'
import { PageManager } from '../page-objects/pageManager';
import {faker} from '@faker-js/faker'


test('test test @smoke', async ({ pageManager , formLayoutsPage}) => {
 const randomFullName = faker.person.fullName()
 const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`
    await pageManager.onFormLayoutsPage().submitForm(process.env.USERNAME, process.env.PASSWORD, "Option 1")
    await pageManager.onFormLayoutsPage().submitForm1(randomFullName, randomEmail, false)
});
