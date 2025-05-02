import { test, expect } from "@playwright/test";
import { SignUpPage } from "../pages/SignUpPage";


test.describe("C01 - Cadastro de Usuário", () => {
    test('CT01 - Cadastrar novo usuário com sucesso (sem saldo)', async ({ page }) => {
        const signup = new SignUpPage(page);
        await signup.goto();
        await signup.fillForm({
            email: 'xablau@master.com',
            name: 'Xablau Master',
            password: 'S3cr3TP@55w0rd',
            passwordConfirmation: 'S3cr3TP@55w0rd',
            initialBalance: false
        });
        await signup.submit();
        await expect(page.locator('#modalText')).toBeVisible();
        await expect(page.locator('#modalText')).toContainText('criada com sucesso');
    });
});