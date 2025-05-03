import { Page } from "@playwright/test";

export class LoginPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
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
        
        await this.page.locator("div:nth-child(2) > input").fill(email);
        await this.page.getByPlaceholder('Informe seu Nome').fill(name);
        await this.page.locator('div:nth-child(4) > div > input').fill(password);
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
        await this.page.locator('//form/div[1]/input').fill(email);
        await this.page.locator('//form/div[2]/div/input').fill(password);
    }

    async logout(){
        await this.page.locator('#btnExit').click();
    }

    async access(){
        await this.page.getByText('Acessar').click();
    }
}