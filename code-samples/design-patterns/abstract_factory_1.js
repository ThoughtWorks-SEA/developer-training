class PizzaStore {
  constructor() {
    if (this.createPizza === undefined) {
      throw new TypeError("Must override method");
    }
  }
  orderPizza(type) {
    const pizza = createPizza(type);

    pizza.prepare();
    pizza.bake();
    pizza.cut();
    pizza.box();
  }
}
