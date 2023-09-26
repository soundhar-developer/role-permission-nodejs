const verifymiddleware = require("../middleware/verifySignUp");
const authJwtMiddleware  = require("../middleware/auth.jwt");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

/*
** Route purpose : Login Route
*/
app.post("/api/auth/signin", controller.signin);
  
/*
** Route purpose : Given menu permission based on roles
*/
app.post("/api/auth/rolePermission", [verifymiddleware.checkDuplicateEmail, authJwtMiddleware.verifyToken], controller.accessMenuBasedOnRole);
  
/*
** Route purpose : Create user
*/

app.post("/api/auth/createUser", [verifymiddleware.checkDuplicateEmail, authJwtMiddleware.verifyToken], controller.createUser);
  
/*
** Route purpose : Fetch all roles
*/

app.get('/api/auth/getRoles', controller.getRoles)
  
};