const express = require('express');
const router = express.Router();
const { projects } = require('../data.json');

/**
 * Main Path
 * Loads in projects from data.json and adds projects to page.
 */
router.get('/', (req, res, next) => {
  res.render('index', { projects });
});

/**
 * About Path
 * Renders About page of Andrew, thats me!
 */
router.get('/about', (req, res) => {
  res.render('about');
});

/**
 * Project Paths
 * Dynamically creates routes depending on how many
 * projects are included. Sends project specific error
 * if the project doesnt exist.
 */
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