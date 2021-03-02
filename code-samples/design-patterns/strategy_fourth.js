// encapsulation
class Purchaser {
  purchase(price, destination) {
    let taxStrategy;
    if (destination == "uk") {
      taxStrategy = new UkTax();
    } else if (destination == "eu") {
      taxStrategy = new EuTax();
    } else {
      taxStrategy = new AmericaTax();
    }
    console.log(price + taxStrategy.calculateTax(price));
  }
}

class Tax {
  calculateTax(price) {
    return (this.rate * price) / 100;
  }
}

// strategy 1
class UkTax extends Tax {
  constructor() {
    super();
    this.rate = 10;
  }
}

// strategy 2
class EuTax extends Tax {
  constructor() {
    super();
    this.rate = 5;
  }
}

// introduce strategy 3
class AmericaTax extends Tax {
  constructor() {
    super();
    this.rate = 15;
  }
}

// usage
const purchaser = new Purchaser();

purchaser.purchase(100, "uk");
purchaser.purchase(100, "eu");
purchaser.purchase(100, "us");
