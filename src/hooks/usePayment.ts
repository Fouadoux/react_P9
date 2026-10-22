import { useState } from "react";
import { PaymentService } from "../services/paymentService";
import type {PaymentData, TransactionResult} from "../types/payment.ts";

export const usePayment = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null >(null
  );
  const [success, setSuccess] = useState(false);
  const [transactionResult, setTransactionResult] = useState<TransactionResult | null>();

  const processPayment = async (paymentData:PaymentData) => {
    setIsProcessing(true);
    setError(null);
    setSuccess(false);
    setTransactionResult(null);

    try {
      const result = await PaymentService.processPayment(paymentData);
      setSuccess(true);
      setTransactionResult(result);
      return result;
    } catch (error: unknown) {
      const message = error instanceof Error && error.message ? error.message : "erreur inconnue";
      setError(message);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  const resetPayment = () => {
    setError(null);
    setSuccess(false);
    setTransactionResult(null);
  };

  return {
    isProcessing,
    error,
    success,
    transactionResult,
    processPayment,
    resetPayment,
  };
};
