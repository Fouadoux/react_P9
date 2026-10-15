// Payment types shared by paymentService, usePayment and usePaymentForm.

// TODO(human): `PaymentMethod` = what `validatePaymentMethod` reads
// (cardNumber, expiryDate, cvv — see src/services/paymentService.ts).

export type PaymentMethod = {
    cardNumber: string,
    expiryDate: string,
    cvv: string,
    cardholderName: string,
};

// TODO(human): `PaymentData` = what `processPayment` receives.
// The service only reads `paymentData.amount`.
export type PaymentData = {
    amount: number;
};

// TODO(human): `TransactionResult` = the object returned by `processPayment` on success
// (success, transactionId, amount, currency, status, timestamp).
// Question: should `status` be a plain `string` or a literal like "succeeded"?
export type TransactionResult = {
    success: boolean;
    transactionId: string;
    amount: number;
    currency: string;
    status: string;
    timestamp: string;
};

export type PaymentErrors={
    cardNumber?: string | null,
    expiryDate?: string | null,
    cvv?: string | null,
    cardholderName?: string | null
}

