import jwt from "express-jwt";
import jwks from "jwks-rsa";

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-8bwc7s1a.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'search-app',
  issuer: 'https://dev-8bwc7s1a.us.auth0.com/',
  algorithms: ['RS256']
});

export default jwtCheck;