/**
 * Filters all users over 50
 * @date 3/10/2023 - 9:11:00 AM
 *
 * @param {*} users Users to filter
 * @returns {*} Filtered users
 */
function over_fifty(users) {
  return users.filter((user) => user.age >= 50);
}

/**
 * Returns the phone numbers from a list of users
 * @date 3/10/2023 - 10:10:00 AM
 *
 * @param {*} users Users to obtains numbers from
 * @returns {*} Phone numbers
 */
function get_phone_number(users) {
  return users.map(user => user.phone)
}

/**
 * Returns the phone numbers of users over 50 from a list of users
 * @date 3/10/2023 - 10:10:00 AM
 *
 * @param {*} users Users to obtains numbers from
 * @returns {*} Phone numbers
 */
function get_phone_number_over_fifty(users) {
  return get_phone_number(over_fifty(users))
}

module.exports = {
  over_fifty,
  get_phone_number,
  get_phone_number_over_fifty
}