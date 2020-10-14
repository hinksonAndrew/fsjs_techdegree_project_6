const express = require('express');
const router = express.Router();
const { projects } = require('../data.json');

router.get('/', (req, res, next) => {
  res.render('index', { projects });
});

router.get('/about', (req, res) => {
  res.render('about');
});

router.get('/project/:id', (req, res, next) => {
  const projectId = req.params.id;
  const project = projects.find( ({ id }) => id === +projectId );

  if (project) {
    res.render('project', { project });
  } else {
    const err = new Error();
    err.status = 404;
    err.message = "Looks like the project you requested is not here.";
    next(err);
  }
});

module.exports = router;