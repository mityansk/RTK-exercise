/**
 * Проверяет валидность ID.
 * @param {string} id - Идентификатор задачи.
 * @returns {boolean}
 */
function isValidId(id) {
  return !Number.isNaN(id);
}

module.exports = isValidId;
