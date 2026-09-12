import React, { useEffect, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../services/hooks/typeCheckHook';
import { registerUser } from '../../../services/api/registrationAction';
import { clearRegistration } from '../../../services/slices/registerSlice';
import { useNavigation } from '@react-navigation/native';

// import { useAppDispatch, useAppSelector } from '../store/hooks';
// import { registerUser } from '../store/actions/registerAction';
// import { clearRegistration } from '../store/slices/registerSlice';

const RegisterScreen = () => {
  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  const { loading, success, error } = useAppSelector(
    state => state.registerUser,
  );

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (!name.trim()) {
      Alert.alert('Validation Error', 'Please enter your name');
      return;
    }

    if (!email.trim()) {
      Alert.alert('Validation Error', 'Please enter your email');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      Alert.alert('Validation Error', 'Please enter a valid email');
      return;
    }

    if (!password) {
      Alert.alert('Validation Error', 'Please enter your password');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Validation Error', 'Password must be at least 6 characters');
      return;
    }

    const userData = {
      name: name.trim(),
      email: email.trim(),
      password,
    };

    // Dispatch Redux async action
    dispatch(registerUser(userData));
  };

  useEffect(() => {
    if (success) {
      Alert.alert('Success', 'Registration successful', [
        {
          text: 'OK',
          onPress: () => {
            setName('');
            setEmail('');
            setPassword('');

            dispatch(clearRegistration());

            // Navigate to Login here if required
            navigation.navigate('Login' as never);
          },
        },
      ]);
    }
  }, [success, dispatch]);

  useEffect(() => {
    if (error) {
      Alert.alert('Registration Failed', error);
    }
  }, [error]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Create Account</Text>

        <Text style={styles.subtitle}>Register to create your account</Text>

        {/* Name */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#999"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
        </View>

        {/* Email */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {/* Password */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />
        </View>

        {/* Register Button */}
        <TouchableOpacity
          style={[styles.registerButton, loading && styles.disabledButton]}
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={styles.registerButtonText}>
            {loading ? 'Registering...' : 'Register'}
          </Text>
        </TouchableOpacity>

        {/* Login */}
        <TouchableOpacity>
          <Text style={styles.loginText}>
            Already have an account? <Text style={styles.loginLink}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  formContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#222',
    textAlign: 'center',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15,
    color: '#777',
    textAlign: 'center',
    marginBottom: 32,
  },

  inputContainer: {
    marginBottom: 18,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: '#D5D9E0',
    borderRadius: 10,
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#222',
  },

  registerButton: {
    height: 52,
    backgroundColor: '#2563EB',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },

  disabledButton: {
    opacity: 0.6,
  },

  registerButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },

  loginText: {
    textAlign: 'center',
    color: '#777',
    fontSize: 14,
  },

  loginLink: {
    color: '#2563EB',
    fontWeight: '700',
  },
});

export default RegisterScreen;
