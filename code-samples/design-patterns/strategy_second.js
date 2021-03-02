// encapsulation
class Purchaser {
  purchase(price, destination) {
    // other functions, like invoice generation, send email, etc
    if (destination == "uk") {
      console.log(price * 0.05);
    } else {
      console.log(price * 0.1);
    }
  }
}

// usage
const purchaser = new Purchaser();

purchaser.purchase(100, "uk");
purchaser.purchase(100, "eu");
