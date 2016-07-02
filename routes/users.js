const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile')[process.env.DB_ENV || 'development']);
/* GET users listing. */
router.post('/', function(req, res, next) {
  console.log("**************************************************");
  // console.log(req.body);
  knex('users')
    .where({phone_id: req.body.phone_id})
    .count()
    .first()
    .then(function (result) {
      if(result.count === "0") {

        knex('users')
          .insert({
            phone_id: req.body.phone_id
          })
          .returning('*')
          .then(function(user) {
            knex('pomodoro')
              .insert({
                name: req.body.name,
                user_id: user[0].id,
              })
              .returning('*')
              .then(function(res){
                console.log("After all",res[0]);
              })
          })
      }

  })
});

module.exports = router;
