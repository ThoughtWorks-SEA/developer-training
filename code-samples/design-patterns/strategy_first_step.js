// encapsulation
class Purchaser {
  purchase(price) {
    // other functions, like invoice generation, send email, etc

    console.log(price * 0.05);
  }
}

// usage
const purchaser = new Purchaser();

purchaser.purchase(100);
