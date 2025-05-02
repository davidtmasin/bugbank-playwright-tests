import { Page } from "@playwright/test";

export class SignUpPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('https://bugbank.netlify.app');
        await this.page.getByText('Registrar').click();
    }

    async fillForm({
        email,
        name,
        password,
        passwordConfirmation,
        initialBalance
    }: {
        name: string,
        email: string,
        password: string,
        passwordConfirmation: string,
        initialBalance: boolean
    }) {
        await this.page.locator("div:nth-child(2) > input").fill(email);
        await this.page.getByPlaceholder('Informe seu Nome').fill(name);
        await this.page.locator('div:nth-child(4) > div > input').fill(password);
        await this.page.getByPlaceholder('Informe a confirmação da senha').fill(passwordConfirmation);

        if (initialBalance) {
            await this.page.locator('#toggleAddBalance').click();

            //getByLabel('Cadastrar com saldo inicial').check();
        }
    };

    async submit() {
        await this.page.getByText('Cadastrar').click();
    }
}