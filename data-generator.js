/*
 * NOTE: This file generates fake tweet data, and is not intended to be part of your implementation.
 * You can safely leave this file untouched, and confine your changes to index.js.
 */

// Set up data structures
const streams = {
  home: [], // Home property is constantly getting new tweets
  users: {
    shawndrost: [],
    sharksforcheap: [],
    mracus: [],
    douglascalhoun: [],
  },
};
const users = Object.keys(streams.users); // An array of all stream users

// Utility function for adding tweets to our data structures
const addTweet = (newTweet) => {
  const username = newTweet.user;
  streams.users[username].push(newTweet); // Random users in streams.users have an object pushed into their array. This is how they get the messages
  streams.home.push(newTweet); // Random 
};

// Utility function
const randomElement = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

// Random tweet generator
const opening = ['just', '', '', '', '', 'ask me how i', 'completely', 'nearly', 'productively', 'efficiently', 'last night i', 'the president', 'that wizard', 'a ninja', 'a seedy old man'];
const verbs = ['downloaded', 'interfaced', 'deployed', 'developed', 'built', 'invented', 'experienced', 'navigated', 'aided', 'enjoyed', 'engineered', 'installed', 'debugged', 'delegated', 'automated', 'formulated', 'systematized', 'overhauled', 'computed'];
const objects = ['my', 'your', 'the', 'a', 'my', 'an entire', 'this', 'that', 'the', 'the big', 'a new form of'];
const nouns = ['cat', 'koolaid', 'system', 'city', 'worm', 'cloud', 'potato', 'money', 'way of life', 'belief system', 'security system', 'bad decision', 'future', 'life', 'pony', 'mind'];
const tags = ['#techlife', '#burningman', '#sf', '#butonlyiknowhow', '#forreal', '#sxsw', '#ballin', '#omg', '#yolo', '#magic', '', '', '', ''];

const randomMessage = () => {
  return [
    randomElement(opening),
    randomElement(verbs),
    randomElement(objects),
    randomElement(nouns),
    randomElement(tags),
  ].join(' ');
};

// Generate random tweets on a random schedule
const generateRandomTweet = () => {
  const tweet = {
    user: randomElement(users), // randomElement picks random users in streams.user 
    message: randomMessage(), // randomMessage creates the random mesaages
    created_at: new Date(),
  };
  addTweet(tweet);
};
//console.log(streams.users);
//console.log(streams.home);
// Generates number of tweets
// Need to find out how to keep the tweets generating IN THIS FILE
for (let i = 0; i < 10; i++) {
  generateRandomTweet();
}

const scheduleNextTweet = () => {
  generateRandomTweet();
  setTimeout(scheduleNextTweet, Math.random() * 1500);
};
scheduleNextTweet();

// Utility function for letting students add "write a tweet" functionality
// (NOTE: Not used by the rest of this file.)
const writeTweet = (message) => {
  const visitor = window.visitor;

  if (!visitor){
    throw new Error('Set the global visitor property!');
  }

  const tweet = {
    user: visitor,
    message: message,
  };
  addTweet(tweet);
};
//console.log(writeTweet);
