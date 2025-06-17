const express = require('express');
const router = express.Router();
const controller = require('../controllers/workoutController');

router.get('/', controller.getAllWorkouts);
router.get('/new', controller.getNewForm);
router.post('/new', controller.createWorkout);
router.get('/edit/:id', controller.getEditForm);
router.post('/edit/:id', controller.updateWorkout);
router.post('/delete/:id', controller.deleteWorkout);
router.get('/progress', controller.getProgress);

module.exports = router;