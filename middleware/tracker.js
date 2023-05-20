import { Router } from 'express';

let router = Router();
let connectionTracker = {};

router.all('*', function (req, res, next) {
  let counter = connectionTracker[req.originalUrl];
  if (counter || counter === 0) {
    connectionTracker[req.originalUrl] = counter + 1;
  } else {
    connectionTracker[req.originalUrl] = 1;
  }
  console.log('========REQUEST RECEIVED========');
  console.log(`REQUEST ROUTE:  ${JSON.stringify(req.originalUrl, null, '  ')}`);
  console.log(`REQUEST METHOD:  ${JSON.stringify(req.method, null, '  ')}`);
  console.log(`REQUEST BODY:  ${JSON.stringify(req.body, null, '  ')}`);
  console.log(`STATUS CODE:  ${JSON.stringify(req.statusCode, null, '  ')}`);
  console.log(`REQUEST HEADERS:  ${JSON.stringify(req.headers, null, '  ')}`);
  console.log(`SESSION VISITS: ${JSON.stringify(connectionTracker, null, '  ')}`);
  next();
});

export default router;
