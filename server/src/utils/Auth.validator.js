class AuthValidator {
  static validateSignUp({ userName, email, password }) {
    if (!userName || userName.trim().length === 0 || typeof userName !== 'string') {
      return {
        isValid: false,
        error: 'Имя пользователя является обязательным и должен быть непустой строкой.',
      };
    }

    if (
      !email ||
      email.trim().length === 0 ||
      typeof email !== 'string' ||
      !this.validateEmail(email)
    ) {
      return {
        isValid: false,
        error: 'Email пользователя является обязательным и должен быть непустой строкой.',
      };
    }

    if (
      !password ||
      password.trim().length === 0 ||
      typeof password !== 'string' ||
      !this.validatePassword(password)
    ) {
      return {
        isValid: false,
        error:
          'Пароль пользователя является обязательным и должен быть непустой строкой, содержать 8 символов, одну большую букву, одну маленькую, одну цифру и один специальный символ.',
      };
    }

    return {
      isValid: true,
      error: null,
    };
  }

  static validateSignIn({ email, password }) {
    if (!email || email.trim().length === 0 || typeof email !== 'string') {
      return {
        isValid: false,
        error: 'Email пользователя является обязательным и должен быть непустой строкой.',
      };
    }

    if (!password || password.trim().length === 0 || typeof password !== 'string') {
      return {
        isValid: false,
        error:
          'Пароль пользователя является обязательным и должен быть непустой строкой.',
      };
    }

    return {
      isValid: true,
      error: null,
    };
  }

  static validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  static validatePassword(password) {
    const hasUpperCase = /[A-Z]/;
    const hasLowerCase = /[a-z]/;
    const hasNumbers = /\d/;
    const hasSpecialCharacters = /[!@#$%^&*()-,.?":{}|<>]/;
    const isValidLength = password.length >= 8;

    if (
      !hasUpperCase.test(password) ||
      !hasLowerCase.test(password) ||
      !hasNumbers.test(password) ||
      !hasSpecialCharacters.test(password) ||
      !isValidLength
    ) {
      return false;
    }
    return true;
  }
}

module.exports = AuthValidator;
