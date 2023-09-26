const db = require("../models");
const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const User = db.user;
const Role = db.role;
const RoleMenu = db.rolemenu;

/*
** Api purpose : User login actions and validate users
*/
exports.signin = async (req, res) => {
  await User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      const token = jwt.sign(
        { id: user.id },
        config.secret,
        {
          algorithm: 'HS256',
          allowInsecureKeySizes: true,
          expiresIn: 86400, // 24 hours
        }
      );

      const roleData = RoleMenu.findAll({
        where: {
          role_id: user.role
        }
      }).then((rData) => {
           res.status(200).send({
              id: user.id,
              username: user.username,
              email: user.email,
              role: user.role,
              data : rData,
              accessToken: token
            });
      });
      
      console.log(555);
      console.log(roleData);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

/*
** Api purpose : Allow permission based on role
*/

exports.accessMenuBasedOnRole = async (req, res) => {
    const roleData = await RoleMenu.destroy({
        where: {
            role_id: req.body.role_id
        }
    });
   
    for (let i = 0; i < req.body.menus.length; i++) {
        await RoleMenu.create({
            role_id: req.body.role_id,
            menu : req.body.menus[i]
        })
    }
    res.status(200).send({ message: "Permission successfully given to the role." });
    
}

/*
** Api purpose : Create user
*/
exports.createUser = (req, res) => {
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      role: req.body.role
    }).then((user) => {
      res.status(200).send({ message: "User created successfully!" });
    }).catch(err => {
      res.status(500).send({ message: err.message });
    });
}

/*
** Api purpose : Fetch all roles
*/
exports.getRoles = async (req, res) => {
  await Role.findAll()
    .then((roles) => {
      res.status(200).send({ data : roles, message: "Roles fetched successfully!" });
    }).catch(err => {
      res.status(500).send({ message: err.message });
    });
}