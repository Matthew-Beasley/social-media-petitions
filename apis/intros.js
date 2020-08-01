const express = require('express');
const introRouter = express.Router();
const {
  createIntro,
  readAllIntros,
  readCurrentIntro,
  readIntroByTitle,
  setCurrentIntro,
  updateIntro,
  deleteIntro
} = require('../data/crud/intro');
const { isAdmin, isLoggedIn } = require('../data/auth');

introRouter.post('/', isAdmin, async (req, res, next) => {
  console.log(isAdmin)
  try {
    const { title, text } = req.body;
    const response = await createIntro({ title, text })
    res.status(201).send(response);
  } catch (error) {
    next(error);
  }
});

introRouter.get('/getall', isLoggedIn, async (req, res, next) => {
  try {
    const intros = await readAllIntros();
    res.status(200).send(intros);
  } catch (error) {
    next(error);
  }
});

introRouter.get('/current', isLoggedIn, async (req, res, next) => {
  try {
    const current = await readCurrentIntro();
    res.staus(200).send(current);
  } catch (error) {
    next(error);
  }
});

introRouter.get('/bytitle', isLoggedIn, async (req, res, next) => {
  try {
    const intro = await readIntroByTitle(req.body);
    res.status(200).send(intro);
  } catch (error) {
    next(error);
  }
});

introRouter.put('/setcurrent', isAdmin, async (req, res, next) => {
  try {
    const response = await setCurrentIntro(req.body);
    res.status(201).send(response);
  } catch (error) {
    next(error);
  }
});

introRouter.put('/update', isAdmin, async (req, res, next) => {
  try {
    const response = await updateIntro(req.body);
    res.status(201).send(response);
  } catch (error) {
    next(error);
  }
});

introRouter.delete('/', isAdmin, async (req, res, next) => {
  try {
    await deleteIntro(req.body);
  } catch (error) {
    next(error);
  }
})

module.exports = introRouter;

