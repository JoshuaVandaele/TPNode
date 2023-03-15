const { over_fifty, get_phone_number, get_phone_number_over_fifty } = require("../users");

const fakeUsers = require("../__mocks__/fakeUserValid.json");

describe("users.js", () => {
  describe("over_fifty", () => {
    it("Doit retourner des users avec un age >= 50", () => {
      const res = over_fifty(fakeUsers);
      expect(res[0].age).toBe(50);
    });
  });
  describe("get_phone_number", () => {
    it("Doit retourner les numeros de tel des users", () => {
      const res = get_phone_number(fakeUsers);
      expect(res).toEqual(['+63 791 675 8914', '+7 813 117 7139']);
    });
  });
  describe("get_phone_number_over_fifty", () => {
    it("Doit retourner des users avec un age >= 50", () => {
      const res = get_phone_number_over_fifty(fakeUsers);
      expect(res).toEqual(['+63 791 675 8914']);
    });
  });
});
