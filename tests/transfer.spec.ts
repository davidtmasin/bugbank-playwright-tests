import { test, expect } from '../fixtures/accounts';
import { LoginPage } from "../pages/LoginPage";
import { TransferPage } from "../pages/TransferPage";


test.describe("C03 - Transferência de Valores", () => {

    test.beforeEach(async ({ page }, testInfo) => {
        await page.screenshot({ path: `screenshots/transferencia/C03-${testInfo.title}-ANTES.png`, fullPage: true });
    });

    test.afterEach(async ({ page }, testInfo) => {
        await page.screenshot({ path: `screenshots/transferencia/C03-${testInfo.title}-DEPOIS.png`, fullPage: true });
    });

    test('CT01 - Usar uma conta com saldo suficiente para transferir R$100 para uma conta válida', async ({ page, originAccount, destinyAccount }) => {
        const data = {
            email: 'conta-com-saldo@teste.com',
            password: 'S3cr3TP@55w0rd'
        };
        const login = new LoginPage(page);
        const transfer = new TransferPage(page);

        // Login na conta com saldo
        await login.credentials({
            email: data.email,
            password: data.password
        });
        await login.access();

        // Ir para transferência
        await transfer.gotToTransferPage();
        await transfer.fillTransferForm({
            accountNumber: destinyAccount.number,
            accountDigit: destinyAccount.digit,
            transferValue: '100',
            transferDescription: 'transferência de teste'
        });
        await transfer.submitTransfer();

        const msg = await page.textContent('#modalText');
        expect(msg).toContain('Transferencia realizada com sucesso');

        // await page.locator('text=Fechar').click();
        // await expect(page).toHaveURL('/bank-statement')
    });

});