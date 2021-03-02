// requirement

class OldCalculator {
  constructor() {
    this.operations = function (term1, term2, operation) {
      switch (operation) {
        case "add":
          return term1 + term2;
        case "sub":
          return term1 - term2;
        default:
          return NaN;
      }
    };
  }
}

// usage
const oldCalc = new OldCalculator();
console.log(oldCalc.operations(10, 5, "add")); // 15

// new interface
class NewCalculator {
  constructor() {
    this.add = function (term1, term2) {
      return term1 + term2;
    };
    this.sub = function (term1, term2) {
      return term1 - term2;
    };
  }
}
