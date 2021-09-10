const Performer = require('../models/performer');
const Movie = require('../models/movie');

module.exports = {
  index,
  show,
  new: newPerformer,
  create,
  addToCast
};

function index(req, res) {
  Performer.find({}, function(err, performers) {
    res.render('performers/index', { title: 'All Performers', performers });
  });
}

function show(req, res) {
  Performer.findById(req.params.id)
    .exec(function(err, performer) {
      console.log(performer);
      res.render('performers/show', {
        title: 'Performer Details', performer
      });
    });
  };

function addToCast(req, res) {
  Movie.findById(req.params.id, function(err, movie) {


    
    movie.cast.push(req.body.performerId);
    movie.save(function(err) {
      res.redirect(`/movies/${movie._id}`);
    });
  });
}

function create(req, res) {
  Performer.create(req.body, function(err, performer) {
    res.redirect('/performers/new');
  });
}

function newPerformer(req, res) {
  Performer.find({}, function(err, performers) {
    res.render('performers/new', {
      title: 'Add Performer',
      performers
    });
  })
}