class QuestionsAndCategoriesValidator {
  static validateCategory(data) {
    const { title } = data;

    //! Проверка валидности поля title
    if (!title || typeof title !== 'string' || title.trim() === '') {
      // Если title отсутствует, не является строкой или является пустой строкой
      return {
        isValid: false, // Данные невалидные
        error: 'Обязательно название категории (не пробел)', // Возвращаем сообщение об ошибке
      };
    }
  }

  static validateQuestion(data) {
    const { description, answer, price } = data;

    //! Проверка валидности поля description
    if (!description || typeof description !== 'string' || description.trim() === '') {
      // Если description отсутствует, не является строкой или является пустой строкой
      return {
        isValid: false, // Данные невалидные
        error: 'Обязательно содержание вопроса (не пробел)', // Возвращаем сообщение об ошибке
      };
    }

    //! Проверка валидности поля answer
    if (!answer || typeof answer !== 'string' || answer.trim() === '') {
      // Если answer отсутствует, не является строкой или является пустой строкой
      return {
        isValid: false, // Данные невалидные
        error: 'Обязателен правильный ответ (не пробел)', // Возвращаем сообщение об ошибке
      };
    }

    //! Проверка валидности поля price
    if (
      !price ||
      typeof price !== 'number' ||
      price.trim() === '' ||
      price !== 100 ||
      price !== 250 ||
      price !== 500 ||
      price !== 750 ||
      price !== 1000
    ) {
      // Если price отсутствует, не является подходящим числом, является пустой строкой
      return {
        isValid: false, // Данные невалидные
        error: 'Цена должна быть 100, 250, 500, 750, 1000, быть числом и не быть пустой строкой', // Возвращаем сообщение об ошибке
      };
    }
  }
}

module.exports = QuestionsAndCategoriesValidator;
