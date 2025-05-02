import { test, expect } from "@playwright/test";
import { SignUpPage } from "../pages/SignUpPage";


test.describe("C01 - Cadastro de Usuário", () => {
    test('CT01 - Cadastrar novo usuário com sucesso (sem saldo)', async ({ page }) => {
        const signup = new SignUpPage(page);

        await signup.goto();
        await signup.fillForm({
            email: 'xablau@teste.com.br',
            name: 'Xablau Master',
            password: 'S3cr3TP@55w0rd',
            passwordConfirmation: 'S3cr3TP@55w0rd',
            initialBalance: false
        });
        await signup.submit();

        await expect(page.locator('#modalText')).toBeVisible();
        await expect(page.locator('#modalText')).toContainText('criada com sucesso');
    });

    test('CT02 - Cadastrar novo usuário com sucesso (com saldo)', async ({ page }) => {
        const signup = new SignUpPage(page);

        await signup.goto();
        await signup.fillForm({
            email: 'xablau@teste.com.br',
            name: 'Xablau Master',
            password: 'S3cr3TP@55w0rd',
            passwordConfirmation: 'S3cr3TP@55w0rd',
            initialBalance: true
        });
        await signup.submit();

        await expect(page.locator('#modalText')).toBeVisible();
        await expect(page.locator('#modalText')).toContainText('criada com sucesso');
    });

    test('CT03 - Cadastrar sem fornecer os dados obrigatórios', async ({ page }) => {
        const signup = new SignUpPage(page);

        await signup.goto();
        await signup.submit();

        await expect(page.locator('div.style__ContainerFieldInput-sc-s3e9ea-0.kOeYBn.input__child > p')).toHaveCount(4);
    });

    test('CT04 - Cadastrar sem fornecer a informação de Nome', async ({ page }) => {
        const signup = new SignUpPage(page);

        await signup.goto();
        await signup.fillForm({
            email: 'xablau@teste.com.br',
            name: '',
            password: 'S3cr3TP@55w0rd',
            passwordConfirmation: 'S3cr3TP@55w0rd',
            initialBalance: false
        });
        await signup.submit();

        await expect(page.locator('#modalText')).toBeVisible();
        await expect(page.locator('#modalText')).toContainText('Nome não pode ser vazio.');
    });

    test('CT05 - Cadastrar sem fornecer a informação de Email', async ({ page }) => {
        const signup = new SignUpPage(page);

        await signup.goto();
        await signup.fillForm({
            email: '',
            name: 'Xablau Master',
            password: 'S3cr3TP@55w0rd',
            passwordConfirmation: 'S3cr3TP@55w0rd',
            initialBalance: false
        });
        await signup.submit();

        await expect(page.locator('#modalText')).toBeVisible();
        await expect(page.locator('#modalText')).toContainText('Email não pode ser vazio.');
    });

    test('CT06 - Cadastrar sem fornecer a informação de Senha', async ({ page }) => {
        const signup = new SignUpPage(page);

        await signup.goto();
        await signup.fillForm({
            email: 'xablau@teste.com.br',
            name: 'Xablau Master',
            password: '',
            passwordConfirmation: 'S3cr3TP@55w0rd',
            initialBalance: false
        });
        await signup.submit();

        await expect(page.locator('#modalText')).toBeVisible();
        await expect(page.locator('#modalText')).toContainText('Senha não pode ser vazio.');
    });

    test('CT07 - Cadastrar sem fornecer a informação de Confirmação de Senha', async ({ page }) => {
        const signup = new SignUpPage(page);

        await signup.goto();
        await signup.fillForm({
            email: 'xablau@teste.com.br',
            name: 'Xablau Master',
            password: 'S3cr3TP@55w0rd',
            passwordConfirmation: '',
            initialBalance: false
        });
        await signup.submit();

        await expect(page.locator('#modalText')).toBeVisible();
        await expect(page.locator('#modalText')).toContainText('Confirmar senha não pode ser vazio.');
    });

    test('CT08 - Cadastrar com divergência nos campos de Senha e Confirmação de Senha', async ({ page }) => {
        const signup = new SignUpPage(page);

        await signup.goto();
        await signup.fillForm({
            email: 'xablau@teste.com.br',
            name: 'Xablau Master',
            password: 'S3cr3TP@55w0rd',
            passwordConfirmation: 'qwerty123',
            initialBalance: false
        });
        await signup.submit();

        await expect(page.locator('#modalText')).toBeVisible();
        await expect(page.locator('#modalText')).toContainText('As senhas não são iguais.');
    });

    test('CT09 - Cadastrar novamente o mesmo usuário', async ({ page }) => {
        const signup = new SignUpPage(page);

        for(let i = 0; i < 2; i++) {
            await signup.goto();
            await signup.fillForm({
                email: 'xablau@teste.com.br',
                name: 'Xablau Master',
                password: 'S3cr3TP@55w0rd',
                passwordConfirmation: 'S3cr3TP@55w0rd',
                initialBalance: false
            });
            await signup.submit();
        }

        await expect(page.locator('#modalText')).toBeVisible();
        await expect(page.locator('#modalText')).toContainText('O e-mail fornecido já em uso.');
    });

});