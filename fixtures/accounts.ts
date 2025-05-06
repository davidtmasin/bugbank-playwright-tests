import { test as base } from '@playwright/test';

type Account = {
    number: string;
    digit: string;
};

type Fixtures = {
    originAccount: Account;
    destinyAccount: Account;
};


export const test = base.extend<Fixtures>({
    originAccount: async ({ page }, use) => {

        await page.goto('/');
        await page.click('text=Registrar');

        await page.fill('div:nth-child(2) > input', 'conta-com-saldo@teste.com');
        await page.getByPlaceholder('Informe seu Nome').fill('Conta A');
        await page.fill('div:nth-child(4) > div > input', 'S3cr3TP@55w0rd');
        await page.getByPlaceholder('Informe a confirmação da senha').fill('S3cr3TP@55w0rd');
        await page.locator('#toggleAddBalance').click();

        await page.locator('text=Cadastrar').click();

        const message = await page.textContent('#modalText');
        const match = message?.match(/(\d+)-(\d+)/);
        const account = {
            number: match?.[1] || '',
            digit: match?.[2] || '',
        };

        // await page.locator('text=Fechar').click({ delay: 1000 });
        // await page.locator("//a[contains(.,'x')]").click({ delay: 1000 });
        await page.goto('/');

        await use(account);
    },

    destinyAccount: async ({ page }, use) => {

        await page.goto('/');
        await page.click('text=Registrar');

        await page.fill('div:nth-child(2) > input', 'conta-sem-saldo@teste.com');
        await page.getByPlaceholder('Informe seu Nome').fill('Conta B');
        await page.fill('div:nth-child(4) > div > input', 'S3cr3TP@55w0rd');
        await page.getByPlaceholder('Informe a confirmação da senha').fill('S3cr3TP@55w0rd');

        await page.locator('text=Cadastrar').click();

        const message = await page.textContent('#modalText');
        const match = message?.match(/(\d+)-(\d+)/);
        const account = {
            number: match?.[1] || '',
            digit: match?.[2] || '',
        };

        // await page.locator('text=Fechar').click({ delay: 1000 });
        // await page.locator("//a[contains(.,'x')]").click({ delay: 1000 });
        await page.goto('/');

        await use(account);
    }
})


export { expect } from '@playwright/test';