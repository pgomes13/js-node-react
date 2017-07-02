/**
 *  OBJECTIVES:
 *
 *  This code already passes the test, your goal is to:
 *
 *  - Convert this code to use Async/Await control flow.
 *    Guide: https://ponyfoo.com/articles/understanding-javascript-async-await
 *
 *  - The function can be completed with EITHER:
 *    - Calling the `done` node-style callback, as below
 *    - (preferred) returning a promise
 *
 *  BONUS POINTS:
 *  - Utilize ES6 syntax
 *  - Have no lint errors
 */

const Promise = require('bluebird');

// This function merely waits 250ms and completes with: [ payload1, payload2 ]
module.exports = function (getPromisedPayload, nodeStyleCallback) {
  // return promise response 
  return new Promise((resolve, reject) => {
    const results = [];

    // wrap setTimeout of 250 ms on the async function 
    setTimeout(async () => {

      // wrap awaited promises in try & errors in catch
      try {
        // get response after promise resolves
        const payload = await getPromisedPayload();

        // push response into results
        results.push(payload);

        nodeStyleCallback(async (err, unresolvedPromisePayload) => {
          // catch callback error early
          if (err) {
            return reject(err); // return thr rejected promise
          }

          try {
            const payload2 = await unresolvedPromisePayload;

            // push the response into results
            results.push(payload2);

            // resolve the callback promise
            resolve(results);
          } catch (_err) {
            // reject the promise
            reject(_err);
          }
        });
      } catch (err) {
        reject(err)
      } 
    }, 250);
  });
};
