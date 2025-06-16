declare module '@paystack/inline-js' {
  export interface PaystackTransactionOptions {
    accessCode: string;
    onSuccess: (response: PaystackSuccessResponse) => void;
    onCancel?: () => void;
  }

  export interface PaystackSuccessResponse {
    status: string;
    message: string;
    reference: string;
    [key: string]: any; // Handle extra fields from Paystack
  }

  export default class PaystackPop {
    newTransaction(options: PaystackTransactionOptions): void;
    resumeTransaction(accessCode: string): void;
  }
}
