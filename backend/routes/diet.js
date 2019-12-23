const router = require('express').Router();
let Diet = require('../models/diet.model');

router.route('/').get((req, res) => {
  Diet.find()
    .then(diet => res.json(diet))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const food = req.body.food;
  const calories = Number(req.body.calories);
  const date = Date.parse(req.body.date);

  const newDiet = new Diet({
    username,
    food,
    calories,
    date,
  });

  newDiet.save()
  .then(() => res.json('Diet added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Diet.findById(req.params.id)
      .then(diet => res.json(diet))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:id').delete((req, res) => {
    Diet.findByIdAndDelete(req.params.id)
      .then(() => res.json('Food deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/update/:id').post((req, res) => {
    Diet.findById(req.params.id)
      .then(diet => {
        diet.username = req.body.username;
        diet.food = req.body.food;
        diet.calories = Number(req.body.calories);
        diet.date = Date.parse(req.body.date);
  
        diet.save()
          .then(() => res.json('Food updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;