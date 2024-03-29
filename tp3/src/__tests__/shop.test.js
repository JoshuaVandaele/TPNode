const { getUser, products_per_category, products_per_user } = require("../shop");

const fakeUsers = require("../__mocks__/fakeUserValid.json");
const fakeProducts = require("../__mocks__/fakeProductsValid.json");
const fakePaniers = require("../__mocks__/fakePaniersValid.json");

describe("shop.js", () => {
  describe("getUser", () => {
    it("Doit retourner le bon user", () => {
      const res = getUser(1, fakeUsers);
      expect(res).toBe(fakeUsers[0]);
    });
    it("Doit renvoyer une erreur car l'utilisateur n'existe pas", () => {
      expect(() => {
        getUser(10, fakeUsers);
      }).toThrow("L'utilisateur 10 n'existe pas!");
    });
    it("Doit throw une erreur car l'identifiant passé en parametre est du mauvais type", () => {
      expect(() => {
        getUser("toto", 2);
      }).toThrow("L'identifiant doit être un entier positif");
    });
    it("Doit throw une erreur car la liste des utilisateur est du mauvais type", () => {
      expect(() => {
        getUser(1, "liste");
      }).toThrow(
        "La liste des utilisateur doit être un tableau contenant des utilisateurs"
      );
    });
    it("Doit throw une erreur car la liste des utilisateur ne doit pas être vide", () => {
      expect(() => {
        getUser(1, []);
      }).toThrow("La liste des utilisateur est vide");
    });
    it("Doit throw une erreur car l'id est invalide", () => {
      expect(() => {
        getUser(-1, fakeUsers);
      }).toThrow("L'identifiant doit être un entier positif");
    });
  });

  describe("products_per_category", () => {
    it("Doit grouper les produits par catégories", () => {
      const res = products_per_category(fakeProducts);
      expect(res).toEqual({
        "smartphones": [
          { libelle: "iPhone 9", dispo: "high" },
          { libelle: "iPhone X", dispo: "medium" }
        ],
        "laptops": [
          { libelle: "MacBook Pro", dispo: "high" }
        ]
      });
    });
    it("Doit throw une erreur car La liste de produit passé en parametre est du mauvais type", () => {
      expect(() => {
        products_per_category("toto");
      }).toThrow("La liste des produits doit être un tableau contenant des produits");
    });
  })

  describe("products_per_user", () => {
    it("Doit grouper les produits par utilisateur", () => {
      const res = products_per_user(fakePaniers);
      expect(res).toEqual({"MacBook Pro": [2], "iPhone 9": [1], "iPhone X": [1]});
    });
  });
  it("Doit throw une erreur car La liste de paniers passé en parametre est du mauvais type", () => {
    expect(() => {
      products_per_user("toto");
    }).toThrow("La liste des paniers doit être un tableau contenant des paniers");
  });
});
