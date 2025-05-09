import { test, expect } from '../fixtures/accounts';
import { LoginPage } from "../pages/LoginPage";
import { BankStatementPage } from "../pages/BankStatementPage";
import { TransferPage } from "../pages/TransferPage";

import {dataTest} from '../fixtures/dataTest';


test.describe('C04 - Extrato da Conta', () => {

    test.beforeEach(async ({ page }, testInfo) => {
        await page.screenshot({ path: `screenshots/extrato/C04-${testInfo.title}-ANTES.png`, fullPage: true });
    });

    test.afterEach(async ({ page }, testInfo) => {
        await page.screenshot({ path: `screenshots/extrato/C04-${testInfo.title}-DEPOIS.png`, fullPage: true });
    });

    test('CT01 - Checar registro de abertura de conta no extrato de uma conta criada com saldo', async ({ page, originAccount }) => {
        const login = new LoginPage(page);
        const bankStatement = new BankStatementPage(page);

        // Login na conta com saldo
        await login.credentials({
            email: dataTest.account_email_a,
            password: dataTest.password
        });
        await login.access();

        await bankStatement.gotToBankStatementPage();

        await expect(page).toHaveURL('/bank-statement');

        await bankStatement.checkTransactionAccountOpening(true);
    });

    test('CT02 - Checar registro de abertura de conta no extrato de uma conta criada sem saldo', async ({ page, destinyAccount }) => {
        const login = new LoginPage(page);
        const bankStatement = new BankStatementPage(page);

        // Login na conta sem saldo
        await login.credentials({
            email: dataTest.account_email_b,
            password: dataTest.password
        });
        await login.access();

        await bankStatement.gotToBankStatementPage();

        await expect(page).toHaveURL('/bank-statement');

        await bankStatement.checkTransactionAccountOpening(false);
    });

    test('CT03 - Verificar no extrato se uma transação de entrada está vindo com a descrição', async ({ page, originAccount, destinyAccount }) => {
        const data = {
            typeOfTransaction: 'in',
            transferValue: '10.99',
            transferDescription: 'Transferência Teste 1'
        };
        const login = new LoginPage(page);
        const transfer = new TransferPage(page);
        const bankStatement = new BankStatementPage(page);

        // Login na conta A
        await login.credentials({
            email: dataTest.account_email_a,
            password: dataTest.password
        });
        await login.access();

        // Efetuar transferência
        await transfer.gotToTransferPage();
        await transfer.fillTransferForm({
            accountNumber: destinyAccount.number,
            accountDigit: destinyAccount.digit,
            transferValue: data.transferValue,
            transferDescription: data.transferDescription
        });
        await transfer.submitTransfer();
        await page.locator("//a[contains(.,'x')]").click({ delay: 1000 });

        // Sair da conta A
        await login.logout();

        // Login na conta B
        await login.credentials({
            email: dataTest.account_email_b,
            password: dataTest.password
        });
        await login.access();

        // Acessar o extrato
        await bankStatement.gotToBankStatementPage();

        await expect(page).toHaveURL('/bank-statement');

        await bankStatement.checkTransationOnStatement({
            transferValue: data.transferValue,
            transferDescription: data.transferDescription,
            typeOfTransaction: data.typeOfTransaction
        });
    });

    test('CT04 - Verificar no extrato se uma transação de saída está vindo com a descrição', async ({ page, originAccount, destinyAccount }) => {
        const data = {
            typeOfTransaction: 'out',
            transferValue: '10.99',
            transferDescription: 'Transferência Teste 2'
        };
        const login = new LoginPage(page);
        const transfer = new TransferPage(page);
        const bankStatement = new BankStatementPage(page);

        // Login na conta A
        await login.credentials({
            email: dataTest.account_email_a,
            password: dataTest.password
        });
        await login.access();

        // Efetuar transferência
        await transfer.gotToTransferPage();
        await transfer.fillTransferForm({
            accountNumber: destinyAccount.number,
            accountDigit: destinyAccount.digit,
            transferValue: data.transferValue,
            transferDescription: data.transferDescription
        });
        await transfer.submitTransfer();
        await page.locator("//a[contains(.,'x')]").click({ delay: 1000 });

        // Acessar o extrato
        await bankStatement.gotToBankStatementPage();

        await expect(page).toHaveURL('/bank-statement');

        await bankStatement.checkTransationOnStatement({
            transferValue: data.transferValue,
            transferDescription: data.transferDescription,
            typeOfTransaction: data.typeOfTransaction
        });
    });

    test('CT05 - Verificar se uma transação de saída está visível no extrato com o valor em vermelho e um sinal negativo', async ({ page, originAccount, destinyAccount }) => {
        const data = {
            typeOfTransaction: 'out',
            transferValue: '10.99',
            transferDescription: 'TESTE QA'
        };
        const login = new LoginPage(page);
        const transfer = new TransferPage(page);
        const bankStatement = new BankStatementPage(page);

        // Login na conta A
        await login.credentials({
            email: dataTest.account_email_a,
            password: dataTest.password
        });
        await login.access();

        // Efetuar transferência
        await transfer.gotToTransferPage();
        await transfer.fillTransferForm({
            accountNumber: destinyAccount.number,
            accountDigit: destinyAccount.digit,
            transferValue: data.transferValue,
            transferDescription: data.transferDescription
        });
        await transfer.submitTransfer();
        await page.locator("//a[contains(.,'x')]").click({ delay: 1000 });

        // Acessar o extrato
        await bankStatement.gotToBankStatementPage();

        await bankStatement.checkColorOfTransaction(data.typeOfTransaction);
    });

    test('CT06 - Verificar se uma transação de entrada no valor de R$100 está visível no extrato com o valor em verde', async ({ page, originAccount, destinyAccount }) => {
        const data = {
            typeOfTransaction: 'in',
            transferValue: '10.99',
            transferDescription: 'TESTE QA'
        };
        const login = new LoginPage(page);
        const transfer = new TransferPage(page);
        const bankStatement = new BankStatementPage(page);

        // Login na conta A
        await login.credentials({
            email: dataTest.account_email_a,
            password: dataTest.password
        });
        await login.access();

        // Efetuar transferência
        await transfer.gotToTransferPage();
        await transfer.fillTransferForm({
            accountNumber: destinyAccount.number,
            accountDigit: destinyAccount.digit,
            transferValue: data.transferValue,
            transferDescription: data.transferDescription
        });
        await transfer.submitTransfer();
        await page.locator("//a[contains(.,'x')]").click({ delay: 1000 });

        // Sair da conta A
        await login.logout();

        // Login na conta B
        await login.credentials({
            email: dataTest.account_email_b,
            password: dataTest.password
        });
        await login.access();

        // Acessar o extrato
        await bankStatement.gotToBankStatementPage();

        await bankStatement.checkColorOfTransaction(data.typeOfTransaction);
    });

});