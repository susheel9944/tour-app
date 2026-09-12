import React, { useState } from 'react';

import {
  Alert,
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useRoute, useNavigation } from '@react-navigation/native';

import RazorpayCheckout from 'react-native-razorpay';

import {
  createRazorpayOrder,
  verifyRazorpayPayment,
} from '../../services/paymentService';

const PaymentScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const [loading, setLoading] = useState(false);

  // Get data sent from DetailScreen
  const { item, amount } = route.params;

  console.log('Payment item:', item);
  console.log('Payment amount:', amount);

  const handlePayment = async () => {
    try {
      setLoading(true);

      // ==========================================
      // 1. CREATE ORDER FROM NODE.JS
      // ==========================================

      const orderResponse = await createRazorpayOrder(amount);

      console.log('Create order response:', orderResponse);

      if (!orderResponse.success) {
        throw new Error(orderResponse.message || 'Unable to create order');
      }

      const order = orderResponse.order;

      console.log('Razorpay Order ID:', order.id);

      // ==========================================
      // 2. OPEN RAZORPAY CHECKOUT
      // ==========================================

      const options = {
        description: `Booking for ${item?.title || 'product'}`,

        currency: 'INR',

        key: '',

        amount: order.amount,

        name: 'My App1',

        order_id: order.id,

        prefill: {
          name: 'Susheel Kumar',
          email: 'susheel1921@gmail.com',
          contact: '9958183244',
        },

        theme: {
          color: '#2176E8',
        },
      };

      console.log('Opening Razorpay Checkout');

      const paymentData = await RazorpayCheckout.open(options);

      // ==========================================
      // 3. PAYMENT SUCCESS
      // ==========================================

      console.log('Razorpay payment response:', paymentData);

      // ==========================================
      // 4. VERIFY PAYMENT ON NODE.JS
      // ==========================================

      const verificationResponse = await verifyRazorpayPayment({
        razorpay_order_id: paymentData.razorpay_order_id,

        razorpay_payment_id: paymentData.razorpay_payment_id,

        razorpay_signature: paymentData.razorpay_signature,
      });

      console.log('Verification response:', verificationResponse);

      if (verificationResponse.success) {
        Alert.alert(
          'Payment Successful',
          `Payment ID: ${paymentData.razorpay_payment_id}`,
          [
            {
              text: 'OK',
              onPress: () => {
                // navigation.navigate('Details', {
                //   item: item,
                // });
                navigation.navigate('MainTabs');
              },
            },
          ],
        );
      } else {
        Alert.alert(
          'Payment Verification Failed',
          verificationResponse.message || 'Unable to verify payment',
        );
      }
    } catch (error: any) {
      console.log('Payment error:', error);

      Alert.alert(
        'Payment Failed',
        error?.description || error?.message || 'Payment failed',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm Booking</Text>

      {item?.title && <Text style={styles.itemTitle}>{item.title}</Text>}

      <Text style={styles.amount}>₹{amount}</Text>

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handlePayment}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Pay ₹{amount}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 20,
  },

  itemTitle: {
    fontSize: 20,
    color: '#555',
    marginBottom: 15,
    textAlign: 'center',
  },

  amount: {
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 30,
    color: '#20C9A6',
  },

  button: {
    width: '80%',
    height: 55,

    backgroundColor: '#2176E8',

    borderRadius: 30,

    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default PaymentScreen;
