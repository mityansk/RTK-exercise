class HighscoreValidator {
  static validate(data) {
    const { score, correctAnswers, totalAnswers } = data;

    if (score === undefined || typeof score !== 'number') {
      return {
        isValid: false,
        error: 'Оценка обязательна и должна быть числом.',
      };
    }

    if (correctAnswers === undefined || typeof correctAnswers !== 'number') {
      return {
        isValid: false,
        error: 'Правильных ответов не требуется, и их должно быть несколько.',
      };
    }

    if (totalAnswers === undefined || typeof totalAnswers !== 'number') {
      return {
        isValid: false,
        error: 'Требуется указать общее количество ответов, которое должно быть числом.',
      };
    }

    return {
      isValid: true,
      error: null,
    };
  }
}

module.exports = HighscoreValidator;
