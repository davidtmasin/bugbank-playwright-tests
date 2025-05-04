import { test, expect } from "@playwright/test";
import { TransferPage } from "../pages/TransferPage";

test.describe("C03 - Transferência de Valores", () => {
    test('CT01 - Usar uma conta com saldo suficiente para transferir R$100 para uma conta válida', async ({ page }) => {
        const transfer = new TransferPage(page);

    });

});