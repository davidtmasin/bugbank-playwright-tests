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

    test('CT02 - Usar uma conta com saldo suficiente para transferir R$100 para uma conta inválida', async ({ page, originAccount, destinyAccount }) => {
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
            accountNumber: '123',
            accountDigit: '4',
            transferValue: '100',
            transferDescription: 'transferência de teste'
        });
        await transfer.submitTransfer();

        const msg = await page.textContent('#modalText');
        expect(msg).toContain('Conta inválida ou inexistente');
    });

    test('CT03 - Transferir dinheiro para uma conta válida, estando com saldo insuficiente', async ({ page, originAccount, destinyAccount }) => {
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
            transferValue: '1001',
            transferDescription: 'teste de transferência com saldo insuficiente'
        });
        await transfer.submitTransfer();

        const msg = await page.textContent('#modalText');
        expect(msg).toContain('Você não tem saldo suficiente para essa transação');
    });

    test('CT04 - Transferir dinheiro para uma conta inválida, estando com saldo insuficiente', async ({ page, originAccount, destinyAccount }) => {
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
            accountNumber: '123',
            accountDigit: '4',
            transferValue: '1001',
            transferDescription: 'teste de transferência com saldo insuficiente'
        });
        await transfer.submitTransfer();

        const msg = await page.textContent('#modalText');
        expect(msg).toContain('Conta inválida ou inexistente');
    });

    test('CT05 - Realizar uma transferência com valor zero', async ({ page, originAccount, destinyAccount }) => {
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
            transferValue: '0',
            transferDescription: 'teste de transferência de R$0,00'
        });
        await transfer.submitTransfer();

        const msg = await page.textContent('#modalText');
        expect(msg).toContain('Valor da transferência não pode ser 0 ou negativo');
    });

    test('CT06 - Realizar uma transferência com valor menor que zero', async ({ page, originAccount, destinyAccount }) => {
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
            transferValue: '-1',
            transferDescription: 'teste de transferência de -R$1,00'
        });
        await transfer.submitTransfer();

        const msg = await page.textContent('#modalText');
        expect(msg).toContain('Valor da transferência não pode ser 0 ou negativo');
    });

    test('CT07 - Realizar uma transferência sem preencher o campo obrigatório de descrição @failed', async ({ page, originAccount, destinyAccount }) => {
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
            transferValue: '10',
            transferDescription: ''
        });
        await transfer.submitTransfer();

        const msg = await page.textContent('#modalText');
        expect(msg).toContain('Descrição não pode ser vazio');
    });

    test('CT08 - Realizar uma transferência sem preencher a conta de destino @failed', async ({ page, originAccount }) => {
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
            accountNumber: '',
            accountDigit: '',
            transferValue: '100',
            transferDescription: 'transferência de teste'
        });
        await transfer.submitTransfer();

        const msg = await page.textContent('#modalText');
        expect(msg).toContain('Número da conta não pode ser vazio');
    });

    test('CT08.1 - Realizar uma transferência sem preencher a conta de destino @failed', async ({ page, destinyAccount, originAccount }) => {
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
            accountNumber: '',
            accountDigit: '',
            transferValue: '100',
            transferDescription: 'transferência de teste'
        });
        await transfer.submitTransfer();

        const msg = await page.textContent('#modalText');
        expect(msg).toContain('Número da conta não pode ser vazio');
    });

    test('CT09 - Realizar uma transferência sem fornecer o valor @failed', async ({ page, originAccount, destinyAccount }) => {
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
            transferValue: '',
            transferDescription: 'transferência sem valor'
        });
        await transfer.submitTransfer();

        const msg = await page.textContent('//form/div[2]/p');
        expect(msg).toContain('Valor da transferência não pode ser vazio');
    });

    test('CT10 - Realizar transferência sem fornecer todas as informações @failed', async ({ page, originAccount }) => {
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
            accountNumber: '',
            accountDigit: '',
            transferValue: '',
            transferDescription: ''
        });
        await transfer.submitTransfer();

        // const msg = await page.textContent('//form/div[2]/p');
        // expect(msg).toContain('Valor da transferência não pode ser vazio');
        await expect(page.locator('#modalText')).toBeVisible();
    });

});