// encapsulation
class Purchaser {
  purchase(price, taxStrategy) {
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

const taxStrategy = (destination) => {
  if (destination == "uk") {
    return new UkTax();
  } else if (destination == "eu") {
    return new EuTax();
  } else {
    return new AmericaTax();
  }
};

// usage
const purchaser = new Purchaser();

purchaser.purchase(100, taxStrategy("uk"));
purchaser.purchase(100, taxStrategy("eu"));
purchaser.purchase(100, taxStrategy("us"));
