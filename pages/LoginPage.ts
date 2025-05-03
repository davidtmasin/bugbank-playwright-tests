import { Locator, Page } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly email: Locator;
    readonly password: Locator;
    readonly btnAcess: Locator;
    readonly btnExit: Locator;


    constructor(page: Page) {
        this.page = page;
        this.email = page.locator('div:nth-child(2) > input');
        this.password = page.locator('div:nth-child(4) > div > input');
        this.btnAcess = page.getByText('Acessar');
        this.btnExit = page.locator('#btnExit');
    }

    async goto() {
        await this.page.goto('/');
    }

    async signup({
        email,
        name,
        password,
        passwordConfirmation
    }: {
        name: string,
        email: string,
        password: string,
        passwordConfirmation: string
    }){
        await this.page.getByText('Registrar').click();
        
        await this.email.fill(email);
        await this.page.getByPlaceholder('Informe seu Nome').fill(name);
        await this.password.fill(password);
        await this.page.getByPlaceholder('Informe a confirmação da senha').fill(passwordConfirmation);

        await this.page.getByText('Cadastrar').click();
        await this.page.getByText('Fechar').click();
        await this.page.goto('/');
    }

    async logon({
        email,
        password
    }: {
        email: string,
        password: string
    }){
        await this.email.fill(email);
        await this.password.fill(password);
    }

    async logout(){
        await this.btnExit.click();
    }

    async access(){
        await this.btnAcess.click();
    }
}