import { test } from "@playwright/test";
import { text } from "node:stream/consumers";


test.beforeEach(async ({ page }) => {
    await page.goto('https://playground.bondaracademy.com/');
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click(); 
});

test("Locator Syntax Rules", async ({page}) => {

    // Find by tag name
    page.locator('input');

    // Find by ID:
    page.locator('#inputEmail1');

    // Find by class value
    page.locator('.shape-rectangle');

    // Find by any attribute
    page.locator('[placeholder="Email"]');

    // Find by full class value
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]');

    // Find by several selectors
    page.locator('input[placeholder="Email"].shape-rectangle');
    page.locator('input[placeholder="Email"][nbinput]');

    // Find by Xpath (NOT RECOMMENDED by pw documentation)
    page.locator('//*[@id=inputEmail1"]');

    // Find by partial text match
    page.locator(':text=("Using")');

    // Find by exact text match
    page.locator(':text is=("Using t he Grid")');
        
});

test('User-visible locators', async ({page}) => {
   await page.getByRole('button', {name: 'Sign in'}).first().click();
   await page.getByRole('textbox', {name: "Email"}).first().fill('test@test.com');

   await page.getByLabel('Email').first().fill('some Email'); 

   await page.getByPlaceholder('Jane Doe').fill('Jeany Doe');
   
   await page.getByText('Submit').first().click();

   await page.getByTestId('inputEmail1').fill('test@test.com');

   await page.getByTitle('IoT Dashboard').click();
});


test('Locating child elements', async ({page}) => {
    await page.locator('nb-card').locator('nb-radio-group').locator(':text-is("Option 1")').click();
    await page.locator('nb-card nb-radio-group :text-is("Option 2")').click();

    await page.locator('nb-card').getByRole('button', {name: 'Sign in'}).first().click();
    await page.locator('nb-card').nth(3).getByRole('button').click();
});

test('Locating parent elements', async ({page}) => {
    await page.locator('nb-card', {hasText: 'Using The Grid'}).getByRole('button').click();
    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('button').click();

    await page.locator('nb-card').filter({hasText: 'Using The Grid'}).getByRole('button').click();

    await page.locator('nb-card')
        .filter({has: page.locator('nb-checkbox')})
        .filter({hasText: 'Sign in'})
        
});


   