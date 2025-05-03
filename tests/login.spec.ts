import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";


test.describe("C02 - Login na Plataforma", () => {
    test('CT01 - Login com as credenciais de e-mail e senha válidas', async ({ page }) => {
        const login = new LoginPage(page);

        const data = {
            email: 'xablau@teste.com.br',
            name: 'Xablau Master',
            password: 'S3cr3TP@55w0rd',
            passwordConfirmation: 'S3cr3TP@55w0rd'
        };

        await login.goto();

        await login.signup({
            email: data.email,
            name: data.name,
            password: data.password,
            passwordConfirmation: data.passwordConfirmation
        });

        await login.logon({
            email: data.email,
            password: data.password
        });

        await login.access();

        await expect(page).toHaveURL('/home')
        await expect(page.locator("//p[contains(.,'bem vindo ao BugBank :)')]")).toBeVisible();

    });

    test('CT02 - Login com senha incorreta', async ({ page }) => {
        const login = new LoginPage(page);

        const data = {
            email: 'xablau@teste.com.br',
            password: '123'
        };

        await login.goto();


        await login.logon({
            email: data.email,
            password: data.password
        });

        await login.access();

        await expect(page.locator("#modalText")).toBeVisible();
        await expect(page.locator("#modalText")).toContainText('Usuário ou senha inválido. Tente novamente ou verifique suas informações!');

    });

    test('CT03 - Login com email não cadastrado', async ({ page }) => {
        const login = new LoginPage(page);

        const data = {
            email: 'alguma@coisa.com.br',
            password: 'S3cr3TP@55w0rd'
        };

        await login.goto();


        await login.logon({
            email: data.email,
            password: data.password
        });

        await login.access();

        await expect(page.locator("#modalText")).toBeVisible();
        await expect(page.locator("#modalText")).toContainText('Usuário ou senha inválido. Tente novamente ou verifique suas informações!');

    });

    test('CT04 - Login com email em formato inválido', async ({ page }) => {
        const login = new LoginPage(page);

        const data = {
            email: 'alguma@c',
            password: 'S3cr3TP@55w0rd'
        };

        await login.goto();


        await login.logon({
            email: data.email,
            password: data.password
        });

        await login.access();

        await expect(page.getByText("Formato inválido")).toBeVisible();

    });

    test('CT05 - Login sem fornecer e-mail e senha', async ({ page }) => {
        const login = new LoginPage(page);

        await login.goto();

        await login.access();

        await expect(page.getByText("É campo obrigatório")).toHaveCount(2);
    });

    test('CT06 - Deve realizar o Logout com sucesso', async ({ page }) => {
        const login = new LoginPage(page);

        const data = {
            email: 'xablau@teste.com.br',
            name: 'Xablau Master',
            password: 'S3cr3TP@55w0rd',
            passwordConfirmation: 'S3cr3TP@55w0rd'
        };

        await login.goto();

        await login.signup({
            email: data.email,
            name: data.name,
            password: data.password,
            passwordConfirmation: data.passwordConfirmation
        });

        await login.access();

        await expect(page).toHaveURL('/')

    });


});