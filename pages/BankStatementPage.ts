import { expect, Locator, Page } from "@playwright/test";

import { getFormattedDatebr } from "../utils/dateUtils";
import { formatDecimalToComma, subtractFormattedStrings } from "../utils/formatUtils";

export class BankStatementPage {
    readonly page: Page;
    readonly bankStatementButton: Locator;
    readonly bankStatementScreen: Locator;
    readonly balanceAvailable: Locator;
    readonly transactionArea: Locator;
    readonly dateTransaction: Locator;
    readonly typeTransaction: Locator;
    readonly descriptionTransaction: Locator;
    readonly transferValue: Locator;


    constructor(page: Page) {
        this.page = page;
        this.bankStatementButton = page.locator('#btn-EXTRATO');
        this.bankStatementScreen = page.locator('//div/div[3]/div');
        this.balanceAvailable = page.locator('#textBalanceAvailable');
        this.transactionArea = page.locator('//div[3]/div/div[2]/div');
        this.dateTransaction = page.locator('#textDateTransaction');
        this.typeTransaction = page.locator('#textTypeTransaction');
        this.descriptionTransaction = page.locator('#textDescription');
        this.transferValue = page.locator('#textTransferValue');

    }

    async gotToBankStatementPage() {
        // await this.bankStatementButton.click();
        await this.page.goto('/bank-statement');
    }

    async checkTransactionAccountOpening(initalBalance: boolean) {

        if (initalBalance) {
            await expect(this.bankStatementScreen).toBeVisible();
            await expect(this.balanceAvailable).toHaveText('R$ 1.000,00');
            await expect(this.transactionArea).toHaveCount(1);

            const today = getFormattedDatebr();
            await expect(this.dateTransaction).toHaveText(today);
            await expect(this.typeTransaction).toHaveText('Abertura de conta');
            await expect(this.descriptionTransaction).toHaveText('Saldo adicionado ao abrir conta');
            await expect(this.transferValue).toHaveText('R$ 1.000,00');
        } else {
            await expect(this.bankStatementScreen).toBeVisible();
            await expect(this.balanceAvailable).toHaveText('R$ 0,00');
            await expect(this.transactionArea).toHaveCount(1);

            const today = getFormattedDatebr();
            await expect(this.dateTransaction).toHaveText(today);
            await expect(this.typeTransaction).toHaveText('Abertura de conta');
            await expect(this.descriptionTransaction).toHaveText('Cliente optou por não ter saldo ao abrir conta');
            await expect(this.transferValue).toHaveText('R$ 0,00');
        }
    }

    async checkTransationOnStatement({
        transferValue,
        transferDescription,
        typeOfTransaction
    }: {
        transferValue: string,
        transferDescription: string,
        typeOfTransaction: string
    }) {
        if (typeOfTransaction === 'in') {
            await expect(this.bankStatementScreen).toBeVisible();

            const transferValueFormatted = formatDecimalToComma(transferValue);
            await expect(this.balanceAvailable).toContainText(transferValueFormatted);
            await expect(this.transactionArea).toHaveCount(2);

            const today = getFormattedDatebr();
            await expect(this.dateTransaction.last()).toHaveText(today);
            await expect(this.typeTransaction.last()).toHaveText('Transferência recebida');
            await expect(this.descriptionTransaction.last()).toHaveText(transferDescription);
            await expect(this.transferValue.last()).toContainText(transferValueFormatted);
        }

        if (typeOfTransaction === 'out') {
            await expect(this.bankStatementScreen).toBeVisible();

            const previousBalance = '1000,00'
            const newBalance = subtractFormattedStrings(previousBalance, transferValue);
            // console.log("Novo saldo: R$"+newBalance);            
            await expect(this.balanceAvailable).toContainText(newBalance);
            await expect(this.transactionArea).toHaveCount(2);
            
            const today = getFormattedDatebr();
            await expect(this.dateTransaction.last()).toHaveText(today);
            await expect(this.typeTransaction.last()).toHaveText('Transferência enviada');
            await expect(this.descriptionTransaction.last()).toHaveText(transferDescription);
            
            const transferValueFormatted = formatDecimalToComma(transferValue);
            // console.log("Valor transferido: R$"+transferValueFormatted);
            await expect(this.transferValue.last()).toContainText(transferValueFormatted);
        }

    }

    async checkColorOfTransaction(typeOfTransaction: string){
        await expect(this.bankStatementScreen).toBeVisible();
        await expect(this.transactionArea).toHaveCount(2);

        if(typeOfTransaction === 'in'){
            await expect(this.transferValue.last()).toHaveCSS('color','rgb(0, 128, 0)');
        }

        if(typeOfTransaction === 'out'){
            await expect(this.transferValue.last()).toHaveCSS('color','rgb(255, 0, 0)');
            await expect(this.transferValue.last()).toContainText('-');
        }
    }

}