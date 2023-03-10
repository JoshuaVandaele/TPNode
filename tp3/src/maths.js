const { isNumber } = require("lodash");

/**
 * @function
 * @param {number} a
 * @param {number} b
 * Retourne la somme de a et b
 */
function addition(a, b) {
  if (!isNumber(a) || !isNumber(b)) {
    throw new Error("Mauvais type!")
  }
  return a+b
}

/**
 * @function
 * @param {number} a
 * @param {number} b
 * Retourne le quotient de a et b
 */
function quotient(a, b) {
  if (b == 0) {
    throw "Il est impossible de diviser par 0!"
  }
  if (!isNumber(a) || !isNumber(b)) {
    throw "Mauvais type!"
  }
  return a/b
}

module.exports = {
  addition,
  quotient,
};
