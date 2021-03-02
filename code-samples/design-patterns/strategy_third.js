// encapsulation
class Purchaser {
  purchase(price, destination) {
    // other functions, like invoice generation, send email, etc
    if (destination == "uk") {
      console.log(price * 0.05);
    } else if (destination == "eu") {
      console.log(price * 0.1);
    } else {
      console.log(price * 0.15);
    }
  }
}

// usage
const purchaser = new Purchaser();

purchaser.purchase(100, "uk");
purchaser.purchase(100, "eu");
purchaser.purchase(100, "us");
