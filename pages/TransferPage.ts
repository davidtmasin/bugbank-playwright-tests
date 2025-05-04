import { Locator, Page } from "@playwright/test";

export class TransferPage {
    readonly page: Page;
    readonly accountNumber: Locator;
    readonly accountDigit: Locator;
    readonly transferValue: Locator;
    readonly transferDescription: Locator;
    readonly transferButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.accountNumber = page.locator('input[type="accountNumber"]');
        this.accountDigit = page.locator('input[type="digit"]');
        this.transferValue = page.locator('input[type="transferValue"]');
        this.transferDescription = page.locator('input[type="description"]');
        this.transferButton = page.locator('button[type="submit"]');
    }

    async goto() {
        await this.page.goto('/');
    }

    async fillTransferForm(
        {
            accountNumber,
            accountDigit,
            transferValue,
            transferDescription
        }: {
            accountNumber: string,
            accountDigit: string,
            transferValue: string,
            transferDescription: string
        }
    ) {
        await this.accountNumber.fill(accountNumber);
        await this.accountNumber.fill(accountDigit);
        await this.accountNumber.fill(transferValue);
        await this.accountNumber.fill(transferDescription);
    }

    async submitTransfer() {
        await this.transferButton.click();
    }

}