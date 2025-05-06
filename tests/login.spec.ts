import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { SignUpPage } from "../pages/SignUpPage";

import { dataTestLogin } from '../fixtures/dataTest';

test.describe("C02 - Login na Plataforma", () => {

    test.beforeEach(async ({ page }, testInfo) => {
        const login = new LoginPage(page);    
        await login.goto();

        await page.screenshot({ path: `screenshots/login/C02-${testInfo.title}-ANTES.png`, fullPage: true });
    });

    test.afterEach(async ({ page }, testInfo) => {
        await page.screenshot({ path: `screenshots/login/C02-${testInfo.title}-DEPOIS.png`, fullPage: true });
    });
    
    test('CT01 - Login com as credenciais de e-mail e senha válidas', async ({ page }) => {    
        const login = new LoginPage(page);     
        const signup = new SignUpPage(page);

        await signup.btnSignUp.click();
        await signup.fillForm({
            email: dataTestLogin.email,
            name: dataTestLogin.name,
            password: dataTestLogin.password,
            passwordConfirmation: dataTestLogin.password,
            initialBalance: false
        });
        await signup.submit();
        // await signup.btnClose.click();
        await login.goto();
        await login.credentials({
            email: dataTestLogin.email,
            password: dataTestLogin.password
        });
        await login.access();

        await expect(page).toHaveURL('/home')
        await expect(page.locator("//p[contains(.,'bem vindo ao BugBank :)')]")).toBeVisible();
    });

    test('CT02 - Login com senha incorreta', async ({ page }) => {
        const login = new LoginPage(page);

        await login.credentials({
            email: dataTestLogin.email,
            password: '123'
        });
        await login.access();

        await expect(page.locator("#modalText")).toBeVisible();
        await expect(page.locator("#modalText")).toContainText('Usuário ou senha inválido. Tente novamente ou verifique suas informações!');
    });

    test('CT03 - Login com email não cadastrado', async ({ page }) => {
        const login = new LoginPage(page);

        await login.credentials({
            email: 'alguma@coisa.com.br',
            password: dataTestLogin.password
        });
        await login.access();

        await expect(page.locator("#modalText")).toBeVisible();
        await expect(page.locator("#modalText")).toContainText('Usuário ou senha inválido. Tente novamente ou verifique suas informações!');
    });

    test('CT04 - Login com email em formato inválido', async ({ page }) => {
        const login = new LoginPage(page);

        await login.credentials({
            email: 'alguma@c',
            password: dataTestLogin.password
        });
        await login.access();

        await expect(page.getByText("Formato inválido")).toBeVisible();
    });

    test('CT05 - Login sem fornecer e-mail e senha', async ({ page }) => {
        const login = new LoginPage(page);

        await login.access();

        await expect(page.getByText("É campo obrigatório")).toHaveCount(2);
    });

    test('CT06 - Deve realizar o Logout com sucesso', async ({ page }) => {
        const login = new LoginPage(page);     
        const signup = new SignUpPage(page);

        await signup.btnSignUp.click();
        await signup.fillForm({
            email: dataTestLogin.email,
            name: dataTestLogin.name,
            password: dataTestLogin.password,
            passwordConfirmation: dataTestLogin.passwordConfirmation,
            initialBalance: false
        });
        await signup.submit();
        // await signup.btnClose.click();
        await login.goto();

        await login.credentials({
            email: dataTestLogin.email,
            password: dataTestLogin.password
        });
        await login.access();
        await login.logout();

        await expect(page).toHaveURL('/')
    });

});