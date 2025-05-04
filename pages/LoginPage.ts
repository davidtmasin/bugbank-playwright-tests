import { Locator, Page } from "@playwright/test";
import { SignUpPage } from "./SignUpPage";

export class LoginPage {
    readonly page: Page;
    readonly email: Locator;
    readonly password: Locator;
    readonly btnAcess: Locator;
    readonly btnExit: Locator;


    constructor(page: Page) {
        this.page = page;
        this.email = page.locator('//form/div[1]/input');
        this.password = page.locator('//form/div[2]/div/input');
        this.btnAcess = page.getByText('Acessar');
        this.btnExit = page.locator('#btnExit');
    }

    async goto() {
        await this.page.goto('/');
    }

    async credentials({
        email,
        password
    }: {
        email: string,
        password: string
    }){
        await this.email.fill(email);
        await this.password.fill(password);
    }
    
    async access(){
        await this.btnAcess.click();
    }

    async logout(){
        await this.btnExit.click();
    }

}