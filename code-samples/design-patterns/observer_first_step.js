//step 1: how would you design the class?

class TweetProducer {
  constructor() {
    this.James = new Follower("James");
    this.Jack = new Follower("Jack");
    this.Jones = new Follower("Jonas");
  }
  tweet(newTweet) {
    this.James.addToFeed(newTweet);
    this.Jack.addToFeed(newTweet);
    this.Jones.addToFeed(newTweet);
  }
}

class Follower {
  constructor(name) {
    this.name = name;
  }

  addToFeed(newTweet) {
    console.log(`${this.name} sees "${newTweet}`);
  }
}

// usage
const celebrity = new TweetProducer();

celebrity.tweet("Hello Followers!");

//how is this extensible?
