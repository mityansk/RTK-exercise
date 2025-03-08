const UserService = require('../services/User.service');
const AuthValidator = require('../utils/Auth.validator');
const formatResponse = require('../utils/formatResponse');
const bcrypt = require('bcrypt');
const generateTokens = require('../utils/generateTokens');
const cookiesConfig = require('../config/cookiesConfig');
const isValidId = require('../utils/isValidId');

class AuthController {
  static async refreshTokens(req, res) {
    try {
      const { user } = res.locals;

      const { accessToken, refreshToken } = generateTokens({ user });

      res.status(200).cookie('refreshToken', refreshToken, cookiesConfig).json(
        formatResponse(200, 'Успешная регенерация токенов', {
          user,
          accessToken,
        }),
      );
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, 'Внутренняя ошибка сервера', null, message));
    }
  }

  static async signUp(req, res) {
    const { email, userName, password } = req.body;

    const { isValid, error } = AuthValidator.validateSignUp({
      email,
      userName,
      password,
    });

    if (!isValid) {
      return res.status(400).json(formatResponse(400, 'Ошибка проверки', null, error));
    }

    const normalizedEmail = email.toLowerCase();
    try {
      const userFound = await UserService.getByEmail(normalizedEmail);

      if (userFound) {
        return res
          .status(400)
          .json(
            formatResponse(
              400,
              'Пользователь уже существует',
              null,
              'Пользователь уже существует',
            ),
          );
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await UserService.create({
        userName,
        email: normalizedEmail,
        password: hashedPassword,
      });

      if (!newUser) {
        return res
          .status(400)
          .json(
            formatResponse(
              400,
              'Не удалось зарегистрировать пользователя',
              null,
              'Не удалось зарегистрировать пользователя',
            ),
          );
      }

      const plainUser = newUser.get({ plain: true });
      delete plainUser.password;

      const { accessToken, refreshToken } = generateTokens({ user: plainUser });

      return res
        .status(201)
        .cookie('refreshToken', refreshToken, cookiesConfig)
        .json(
          formatResponse(201, 'Регистрация прошла успешно', {
            user: plainUser,
            accessToken,
          }),
        );
    } catch ({ message }) {
      console.error(message);
      return res
        .status(500)
        .json(formatResponse(500, 'Внутренняя ошибка сервера', null, message));
    }
  }

  static async signIn(req, res) {
    const { email, password } = req.body;

    const { isValid, error } = AuthValidator.validateSignIn({
      email,
      password,
    });

    if (!isValid) {
      return res.status(400).json(formatResponse(400, 'Ошибка проверки', null, error));
    }

    const normalizedEmail = email.toLowerCase();
    try {
      const user = await UserService.getByEmail(normalizedEmail);

      if (!user) {
        return res
          .status(400)
          .json(
            formatResponse(400, 'Пользователь не найден', null, 'Пользователь не найден'),
          );
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res
          .status(400)
          .json(formatResponse(400, 'Навалидный пароль', null, 'Навалидный пароль'));
      }

      const plainUser = user.get({ plain: true });
      delete plainUser.password;

      const { accessToken, refreshToken } = generateTokens({ user: plainUser });

      return res
        .status(200)
        .cookie('refreshToken', refreshToken, cookiesConfig)
        .json(
          formatResponse(200, 'Вход в систему прошел успешно', {
            user: plainUser,
            accessToken,
          }),
        );
    } catch ({ message }) {
      console.error(message);
      return res
        .status(500)
        .json(formatResponse(500, 'Внутренняя ошибка сервера', null, message));
    }
  }

  static async signOut(req, res) {
    try {
      res
        .clearCookie('refreshToken')
        .json(formatResponse(200, 'Успешный выход из системы'));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, 'Внутренняя ошибка сервера', null, message));
    }
  }

  static async deactivation(req, res) {
    const { id } = req.params;
    const userId = res.locals.user.id;

    if (!isValidId(id)) {
      return res
        .status(400)
        .json(
          formatResponse(
            400,
            'Неверный идентификатор пользователя',
            null,
            'Неверный идентификатор пользователя',
          ),
        );
    }

    if (id !== userId) {
      return res
        .status(403)
        .json(formatResponse(403, 'Нет доступа', null, 'Нет доступа'));
    }

    try {
      const userDelete = await UserService.delete(id);

      if (!userDelete) {
        return res
          .status(400)
          .json(
            formatResponse(400, 'Пользователь не найден', null, 'Пользователь не найден'),
          );
      }

      return res.status(200).json(formatResponse(200, 'Пользователь удален', userDelete));
    } catch ({ message }) {
      console.error(message);
      return res
        .status(500)
        .json(formatResponse(500, 'Внутренняя ошибка сервера', null, message));
    }
  }
}

module.exports = AuthController;
