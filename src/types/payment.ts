// Payment types shared by paymentService, usePayment and usePaymentForm.

export type PaymentMethod = {
    cardNumber: string,
    expiryDate: string,
    cvv: string,
    cardholderName: string,
};

export type PaymentData = {
    amount: number;
};

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

