const API_URL = 'http://192.168.31.132:5001';

export interface CreateOrderResponse {
  success: boolean;
  message: string;
  order: {
    id: string;
    entity: string;
    amount: number;
    amount_paid: number;
    amount_due: number;
    currency: string;
    receipt: string;
    status: string;
  };
}

export interface VerifyPaymentResponse {
  success: boolean;
  message: string;
  paymentId?: string;
  orderId?: string;
}

export const createRazorpayOrder = async (
  amount: number,
): Promise<CreateOrderResponse> => {
  const response = await fetch(`${API_URL}/api/payment/create-order`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to create order');
  }

  return data;
};

export const verifyRazorpayPayment = async (paymentData: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}): Promise<VerifyPaymentResponse> => {
  const response = await fetch(`${API_URL}/api/payment/verify-payment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(paymentData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Payment verification failed');
  }

  return data;
};
