const db = require("../models");
const User = db.user;

/*
** Check email is unique or not
*/
exports.checkDuplicateEmail = (req, res, next) => {
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        return res.status(400).send({
          message: "Email is already in use!"
        });
      }
      next();
    });
};
