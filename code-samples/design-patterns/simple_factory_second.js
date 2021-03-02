class CheesePizza {
  constructor() {
    this.name = "Cheese";
  }
  prepare() {
    console.log(`Preparing ${this.name} Pizza`);
  }
  bake() {
    console.log(`Baking ${this.name} Pizza`);
  }
  cut() {
    console.log(`Cutting ${this.name} Pizza`);
  }
  box() {
    console.log(`Boxing ${this.name} Pizza`);
  }
}

class PepperoniPizza {
  constructor() {
    this.name = "Pepperoni";
  }
  prepare() {
    console.log(`Preparing ${this.name} Pizza`);
  }
  bake() {
    console.log(`Baking ${this.name} Pizza`);
  }
  cut() {
    console.log(`Cutting ${this.name} Pizza`);
  }
  box() {
    console.log(`Boxing ${this.name} Pizza`);
  }
}

class VeggiePizza {
  constructor() {
    this.name = "Veggie";
  }
  prepare() {
    console.log(`Preparing ${this.name} Pizza`);
  }
  bake() {
    console.log(`Baking ${this.name} Pizza`);
  }
  cut() {
    console.log(`Cutting ${this.name} Pizza`);
  }
  box() {
    console.log(`Boxing ${this.name} Pizza`);
  }
}

class MeatLoversPizza {
  constructor() {
    this.name = "Meat Lovers";
  }
  prepare() {
    console.log(`Preparing ${this.name} Pizza`);
  }
  bake() {
    console.log(`Baking ${this.name} Pizza`);
  }
  cut() {
    console.log(`Cutting ${this.name} Pizza`);
  }
  box() {
    console.log(`Boxing ${this.name} Pizza`);
  }
}

class SimplePizzaFactory {
  createPizza(type) {
    let pizza;
    if (type === "cheese") {
      pizza = new CheesePizza();
    }
    if (type === "pepperoni") {
      pizza = new PepperoniPizza();
    }
    if (type === "veggie") {
      pizza = new VeggiePizza();
    }
    if (type === "meatlovers") {
      pizza = new MeatLoversPizza();
    }
    return pizza;
  }
}

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question("What pizza would you like? ", (type) => {
  const factory = new SimplePizzaFactory();
  const pizza = factory.createPizza(type);
  pizza.prepare();
  pizza.bake();
  pizza.cut();
  pizza.box();
  readline.close();
});
