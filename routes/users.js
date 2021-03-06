var express = require('express');
var router = express.Router();
var knex = require('knex')(require('../knexfile')[process.env.DB_ENV || 'development']);
var moment = require('moment');

router.post('/', function(req, res, next) {
  console.log("**********************************************************************");
  console.log("adding with new Date");
  knex('users')
    .where({phone_id: req.body.phone_id})
    .then(function (user) {
      if(!user[0]) {
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
              .then(function(response){
                console.log("New User",response[0]);
                res.status(200).json(response[0]);
                return
              })
          })
      }

      else {
        knex('pomodoro')
          .insert({
            name: req.body.name,
            user_id: user[0].id,
          })
          .returning('*')
          .then(function(response){
            console.log("Existing User",response[0]);
            res.status(200).json(response[0]);
            return
          })
      }

  })
});


router.get('/:phoneId', function(req, res, next){
  console.log("********************");
  // .whereBetween('created_at', [ moment().subtract(6, 'days').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD') ])
  knex('users')
  .where({ phone_id: req.params.phoneId })
  .innerJoin('pomodoro', 'pomodoro.user_id', 'users.id')
  .then(function(response){
    console.log(response);
    return res.status(200).json(response);
  })
})
module.exports = router;
