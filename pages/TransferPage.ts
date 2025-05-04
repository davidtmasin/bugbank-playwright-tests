import { Locator, Page } from "@playwright/test";

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
        this.transferPageButton = page.locator('#btn-TRANSFERÊNCIA');
        this.accountNumber = page.locator('input[type="accountNumber"]');
        this.accountDigit = page.locator('input[type="digit"]');
        this.transferValue = page.locator('input[type="transferValue"]');
        this.transferDescription = page.locator('input[type="description"]');
        this.transferButton = page.locator('text=Transferir agora');
        this.modalText = page.locator('#modalText');
    }

    async goto() {
        await this.page.goto('/');
    }

    // async extractAccountNumber1() {
    //     const message = await this.page.textContent('#modalText');
    //     console.log(message);

    //     const match = message?.match(/\d+/g); // pega todos os números (como strings)
    //     const accountNumber1 = match ? parseInt(match[0]) : null;
    //     const accountDigit1 = match ? parseInt(match[1]) : null;

    //     console.log(accountNumber1);
    //     console.log(accountDigit1);
    // }

    // async captureAccountDataWithBalance() {
    //     const message = await this.page.textContent('#modalText');
    //     console.log(message);

    //     const match = message?.match(/\d+/g); // pega todos os números (como strings)
    //     const accountNumber2 = match ? parseInt(match[0]) : null;
    //     const accountDigit2 = match ? parseInt(match[1]) : null;

    //     console.log(accountNumber2);
    //     console.log(accountDigit2);
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