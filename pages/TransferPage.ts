import { expect, Locator, Page } from "@playwright/test";

export class TransferPage {
    readonly page: Page;
    readonly transferPageButton: Locator;
    readonly accountNumber: Locator;
    readonly accountDigit: Locator;
    readonly transferValue: Locator;
    readonly transferDescription: Locator;
    readonly transferButton: Locator;
    readonly modalText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.transferPageButton = page.locator("a[id='btn-TRANSFERÊNCIA']");
        this.accountNumber = page.locator('input[type="accountNumber"]');
        this.accountDigit = page.locator('input[type="digit"]');
        this.transferValue = page.locator('input[type="transferValue"]');
        this.transferDescription = page.locator('input[type="description"]');
        this.transferButton = page.locator('text=Transferir agora');
        this.modalText = page.locator('#modalText');
    }

    // async goto() {
    //     await this.page.goto('/');
    // }

    async gotToTransferPage() {
        await this.transferPageButton.click();        
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
        await this.accountDigit.fill(accountDigit);
        await this.transferValue.fill(transferValue);
        await this.transferDescription.fill(transferDescription);
    }

    async submitTransfer() {
        await this.transferButton.click();
    }

}