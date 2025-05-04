import { Locator, Page } from "@playwright/test";

export class SignUpPage {
    readonly page: Page;
    readonly name: Locator;
    readonly email: Locator;
    readonly password: Locator;
    readonly passwordConfirmation: Locator;
    readonly btnSignUp: Locator;
    readonly toggleAddBalance: Locator;
    readonly btnRegister: Locator;
    readonly btnClose: Locator;

    constructor(page: Page) {
        this.page = page;
        this.name = page.getByPlaceholder('Informe seu Nome');
        this.email = page.locator('div:nth-child(2) > input');
        this.password = page.locator('div:nth-child(4) > div > input');
        this.passwordConfirmation = page.getByPlaceholder('Informe a confirmação da senha');
        this.btnSignUp = page.getByText('Registrar')
        this.toggleAddBalance = page.locator('#toggleAddBalance');
        this.btnRegister = page.getByText('Cadastrar');
        this.btnClose = page.getByText('Fechar');
    }

    async goto() {
        await this.page.goto('/');
        await this.btnSignUp.click();
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
        await this.email.fill(email);
        await this.name.fill(name);
        await this.password.fill(password);
        await this.passwordConfirmation.fill(passwordConfirmation);

        if (initialBalance) {
            await this.toggleAddBalance.click();
        }
    }

    async submit() {
        await this.btnRegister.click();
    }

    async duplicatedRegister({
        email,
        name,
        password,
        passwordConfirmation
    }: {
        name: string,
        email: string,
        password: string,
        passwordConfirmation: string
    }) {
        await this.email.fill(email);
        await this.name.fill(name);
        await this.password.fill(password);
        await this.passwordConfirmation.fill(passwordConfirmation);

        await this.btnRegister.click();
        await this.btnClose.click();
        await this.btnSignUp.click();
        await this.btnRegister.click();

    }

}