var request = require("request");
var userDetails;

const firstUserUrl = 'https://api.github.com/users/tillg';

function getFollowersUrlPromise(userUrl) {
  var options = {
    url: userUrl,
    headers: {
      'User-Agent': 'request'
    }
  };
  // Return new promise 
  return new Promise(function (resolve, reject) {
    // Do async job
    request.get(options, function (err, resp, body) {
      if (err) {
        reject(err);
      } else {
        userObject = JSON.parse(body);
        resolve(userObject.followers_url);
      }
    });
  });
}

function getFollowers(followersUrl) {
  var options = {
    url: followersUrl,
    headers: {
      'User-Agent': 'request'
    }
  };
  // Return new promise 
  return new Promise(function (resolve, reject) {
    // Do async job
    request.get(options, function (err, resp, body) {
      if (err) {
        reject(err);
      } else {
        let followersObjects = JSON.parse(body);
        console.log(followersObjects);
        resolve(userObject.followers_url);
      }
    });
  });
}

function main() {
  var firstFollowerUrlpromise = getFollowersUrlPromise(firstUserUrl);
  firstFollowerUrlpromise
    .then(function (followers_url) {
      console.log("Initiale user: " + firstUserUrl);
      console.log("   followers_url: " + followers_url);
      return followers_url;
      // That could be a pattern: A function that just logs and returns it's content so the next .then function can continue using it
    })
    .then(function (followers_url) {
      return getFollowers(followers_url);
    })
    .catch(function (error) {
      console.log('ERROR: ' + error);
    })
}

main();