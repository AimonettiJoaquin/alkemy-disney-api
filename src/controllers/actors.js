const express = require("express");
const actorService = require("../services/actorService");
const imageService = require("../services/imageService");
const Success = require("../handlers/successHandler");
const logger = require("../loaders/logger");


/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getAllActors = async (req, res, next) => {
  try {
    logger.info("Query: " + JSON.stringify(req.query));
    const { filter = "", options = "" } = req.query;
    const actor = await actorService.findAll(filter, options);
    res.json(new Success(actor));
  } catch (err) {
    next(err);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const createActor = async (req, res, next) => {
  try {
    let a = req.body;
    a = await actorService.save(a);

    res.status(201).json(new Success(a));
  } catch (err) {
    next(err);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const updateActor = async (req, res, next) => {
  try {
    const { id } = req.params;
    let a = req.body;

    const actorUpdated = await actorService.update(id, a);

    res.json(new Success(actorUpdated));
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
    const actor = await actorService.findById(req.params.id);
    res.json(new Success(actor));
  } catch (err) {
    next(err);
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const deleteActor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const actor = await actorService.remove(id);
    res.json(new Success(actor));
  } catch (err) {
    next(err);
  }
};
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
const uploadActorImage = async (req, res, next) => {
  try {
    const actorId = req.body.id;
    const image = req.file;
    
    res.json(new Success(await imageService.uploadActorImage(actorId,image)));
  } catch (err) {
    next(err);
  }
};



module.exports = {
  getAllActors,
  createActor,
  updateActor,
  getById,
  deleteActor,
  uploadActorImage
};
