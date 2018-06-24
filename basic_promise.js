/* jshint esversion: 6 */

let title = 'What does a promise look like?';
let p1 = new Promise((resolve, reject) => {})
  .then(() => {

  })
console.log(title, p1);

/**
 * Rejecting an thowing errors
 */
title = 'Rejecting an thowing errors';
const myProimse = new Promise((resolve, reject) => {
  if (Math.random() * 100 < 90) {
    reject(new Error('The promise was rejected by using reject function.'));
  }
  throw new Error('The promise was rejected by throwing an error');
});
myProimse.then(
  () => console.log('Rejecting an thowing errors', 'resolved'),
  (error) => console.log('Rejecting an thowing errors', error.message)
);

/**
 * Question: Is a statement behind a Resolve or Reject call EVER executed?
 */
title = 'Is a statement behind a Resolve or Reject call EVER executed?';
console.log('***', title)
const myProimse2 = new Promise((resolve, reject) => {
  if (Math.random() * 100 < 90) {
    console.log(title, 'In the resolution path');
    resolve('The promise was resolved.');
    console.log(title, 'I am the statement behind the resolve!');
  }
  throw new Error('The promise was rejected by throwing an error');
});

myProimse2.then(
  () => console.log(title, 'resolved'),
  (error) => console.log(title, error.message)
);