class TweetProducer {
  constructor() {
    this.followers = [];
  }

  subscribe(newFollower) {
    this.followers.push(newFollower);
  }

  unsubscribe(follower) {
    this.followers = this.followers.filter((obs) => follower !== obs);
  }

  tweet(newTweet) {
    this.followers.forEach((follower) => {
      follower.addToFeed(newTweet);
    });
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

const celebrity = new TweetProducer();

const James = new Follower("James");
const Jack = new Follower("Jack");
const Jones = new Follower("Jones");

celebrity.subscribe(James);
celebrity.subscribe(Jack);
celebrity.subscribe(Jones);

celebrity.tweet("hello everyone!");

celebrity.unsubscribe(James);

celebrity.tweet("what are you looking forward to?");
