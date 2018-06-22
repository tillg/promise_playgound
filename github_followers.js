/* jshint esversion: 6 */


var request = require("request");
var userDetails;

const githubBaseUrl = 'https://api.github.com/users/';
const firstUserId = 'tillg';

const buildGithubUrl = userId => {
  return githubBaseUrl + userId;
};

/**
 * Get the userIds of the followers of a given user
 * @param {*} userId of user who's followers we are looking for
 */
const getFollowers = userId => {
  var options = {
    url: buildGithubUrl(userId),
    headers: {
      'User-Agent': 'request'
    }
  };
  return new Promise(function (resolve, reject) {
      request.get(options, function (err, resp, body) {
        if (err) {
          reject(err);
        } else {
          userObject = JSON.parse(body);
          resolve(userObject.followers_url);
        }
      });
    })
    .then(followersUrl => { // Now we have the URL from where we can retrieve the followers
      return getFollowersAtUrl(followersUrl);
    });
};

/**
 * Returns the URL where the followers can be requested from a given Github user
 * @param {*} userId: The Id of the github user profile of which we want the followers
 */
function getFollowersUrl(userId) {
  var options = {
    url: buildGithubUrl(userId),
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

/**
 * Retrieves the followers of a Github user at the specified URL
 * @param {*} followersUrl 
 */
const getFollowersAtUrl = (followersUrl) => {
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
        const followersArray = JSON.parse(body);
        //console.log(followersObjects);
        const followersUrls = followersArray.map(u => u.login);
        resolve(followersUrls);
      }
    });
  });
};

function main() {
  const followers = getFollowers(firstUserId);
  followers
    .then(function (followers) {
      console.log(firstUserId + ' --> ' + followers);
      return followers;
    })
    .then(followers => {
      followers.forEach(userId => {
        getFollowers(userId)
          .then(followers => {
            console.log(userId + ' --> ' + followers);
          });
      });
    })
    .catch(function (error) {
      console.log('ERROR: ' + error);
    });
  return;
}

main();