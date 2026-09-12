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
import { useNavigation } from '@react-navigation/native';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../services/hooks/typeCheckHook';
import { loginUser } from '../../../services/api/loginAction';
import {
  clearLogin,
  clearLoginError,
} from '../../../services/slices/loginSlice';

// import { useAppDispatch, useAppSelector } from '../store/hooks';
// import { loginUser } from '../store/actions/loginAction';
// import { clearLogin, clearLoginError } from '../store/slices/loginSlice';

const LoginScreen = () => {
  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  const { loading, success, error, user } = useAppSelector(
    state => state.login,
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
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

    const loginData = {
      email: email.trim(),
      password,
    };
    console.log('login data', loginData);
    dispatch(loginUser(loginData));
  };

  useEffect(() => {
    if (success && user) {
      Alert.alert('Login Successful', `Welcome ${user.user.name}`);

      setEmail('');
      setPassword('');

      navigation.navigate('Home' as never);

      dispatch(clearLogin());
    }
  }, [success, user, dispatch, navigation]);

  useEffect(() => {
    if (error) {
      Alert.alert('Login Failed', error);

      dispatch(clearLoginError());
    }
  }, [error, dispatch]);

  const handleRegister = () => {
    navigation.navigate('Register' as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Welcome Back</Text>

        <Text style={styles.subtitle}>Login to continue to your account</Text>

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

        {/* Login Button */}
        <TouchableOpacity
          style={[styles.loginButton, loading && styles.disabledButton]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.loginButtonText}>
            {loading ? 'Logging in...' : 'Login'}
          </Text>
        </TouchableOpacity>

        {/* Register */}
        <TouchableOpacity onPress={handleRegister} disabled={loading}>
          <Text style={styles.registerText}>
            Don't have an account?{' '}
            <Text style={styles.registerLink}>Register</Text>
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

  loginButton: {
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

  loginButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },

  registerText: {
    textAlign: 'center',
    color: '#777',
    fontSize: 14,
  },

  registerLink: {
    color: '#2563EB',
    fontWeight: '700',
  },
});

export default LoginScreen;
