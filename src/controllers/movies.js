const express = require("express");
const movieService = require("../services/movieService");
const Success = require("../handlers/successHandler");
const logger = require("../loaders/logger");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getAllMovies = async (req, res, next) => {
  try {
    logger.info("Query: " + JSON.stringify(req.query));

    const movie = await movieService.findAll(
      req.query.filter,
      req.query.options
    );
    res.json(new Success(movie));
  } catch (err) {
    next(err);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const createMovie = async (req, res, next) => {
  try {
    let m = req.body;
    m = await movieService.save(m);

    res.status(201).json(new Success(m));
  } catch (err) {
    next(err);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const updateMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    let m = req.body;

    const movieUpdated = await movieService.update(id, m);

    res.json(new Success(movieUpdated));
  } catch (err) {
    next(err);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getById = async (req, res) => {
    try {
        const movie = await movieService.findById(req.params.id);
        res.json(new Success(movie));
    } catch (err) {
        next(err);
    }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const deleteMovie = async (req, res, next) => {
    try {
        const { id } = req.params;
        const movie = await movieService.remove(id);
        res.json(new Success(movie));
    } catch (err) {
        next(err);
    }
};

module.exports = {
  getAllMovies,
  createMovie,
  updateMovie,
  getById,
  deleteMovie,
};