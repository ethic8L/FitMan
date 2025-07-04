const Workout = require('../models/workout');

exports.getAllWorkouts = async (req, res) => {
  const workouts = await Workout.find().sort({ date: -1 });
  res.render('index', { workouts });
};

exports.getNewForm = (req, res) => {
  res.render('form');
};


exports.createWorkout = async (req, res) => {
  const { type, intensity, duration } = req.body;
  await Workout.create({ type, intensity, duration: parseInt(duration) });
  res.redirect('/');
};

exports.getEditForm = async (req, res) => {
  const workout = await Workout.findById(req.params.id);
  if (!workout) return res.status(404).send('Nie znaleziono treningu');
  res.render('edit', { workout });
};

exports.updateWorkout = async (req, res) => {
  const { type, intensity, duration } = req.body;
  await Workout.findByIdAndUpdate(req.params.id, {
    type,
    intensity,
    duration: parseInt(duration),
  });
  res.redirect('/');
};

exports.deleteWorkout = async (req, res) => {
  await Workout.findByIdAndDelete(req.params.id);
  res.redirect('/');
};

exports.getProgress = async (req, res) => {
  const now = new Date();
  const pastWeek = new Date(now);
  pastWeek.setDate(now.getDate() - 7);
  const count = await Workout.countDocuments({ date: { $gte: pastWeek } });
  res.render('progress', { count });
};