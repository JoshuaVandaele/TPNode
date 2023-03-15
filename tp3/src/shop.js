const { isNumber } = require("lodash")

/**
 * @function
 * @param {number} id, id de l'utilisateur a rechercher
 * @param {Array} usersData, tableau contenant la liste des utilisateurs 
 * Retourne les données de l'utilisateur de la liste qui correpondant à l'id 
 */
function getUser(id, usersData) {
  if (!isNumber(id) || id < 0) {
    throw "L'identifiant doit être un entier positif"
  }
  if (!Array.isArray(usersData)) {
    throw "La liste des utilisateur doit être un tableau contenant des utilisateurs"
  }
  if (usersData.length == 0) {
    throw "La liste des utilisateur est vide"
  }
  if (id > usersData.length) {
    throw "L'utilisateur 10 n'existe pas!"
  }
  return Object.values(usersData).filter(u => u.id == id)[0]
}

/**
 * Groups products per category
 * @date 3/10/2023 - 11:10:15 AM
 *
 * @param {*} products Products to group
 * @returns {{}} Grouped products
 */
function products_per_category(products) {
  if (!Array.isArray(products)) {
    throw "La liste des produits doit être un tableau contenant des produits"
  }
  let groupedProducts = {};

  products.forEach(product => {
    if (!groupedProducts[product.category]) {
      groupedProducts[product.category] = [];
    }
    groupedProducts[product.category].push({ libelle: product.title, dispo: product.stock > 50 ? "high" : (product.stock > 10 ? "medium" : "low") });
  });

  return groupedProducts
}

function products_per_user(paniers) {
  if (!Array.isArray(paniers)) {
    throw "La liste des paniers doit être un tableau contenant des paniers"
  }
  let groupedProducts = {};

  paniers.forEach(panier => {
    panier["products"].forEach(product => {
      if (!groupedProducts[product.title]) {
        groupedProducts[product.title] = [];
      }

      groupedProducts[product.title].push(panier.userId)
    })
  })

  return groupedProducts
}

module.exports = {
  getUser,
  products_per_category,
  products_per_user
};
