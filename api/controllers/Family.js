const GrandParent = require("../models/GrandParents");
const Parent = require("../models/Parents");
const Son = require("../models/Sons");
const Daughter = require("../models/Daughters");

exports.hello = (req, res) => {
  res.json("hello");
};

exports.getGrandParents = async (req, res) => {
  const GrandParents = await GrandParent.find();
  res.json(GrandParents);
};

exports.addGrandParents = async (req, res) => {
  const { name, firstWifeName, secondWifeName, sons, daughters } = req.body;
  GrandParent.create({ name, firstWifeName, secondWifeName, sons, daughters })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      throw err;
    });
};

exports.getParents = async (req, res) => {
  const Parents = await Parent.find().populate("parentName");

  res.json(Parents);
};

exports.addParents = async (req, res) => {
  const { name, firstWifeName, secondWifeName, sons, daughters } = req.body;

  Parent.create({
    name,
    firstWifeName,
    secondWifeName,
    sons,
    daughters,
    parentName: "654d17d85813cab641cf964e",
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      throw err;
    });
};

exports.getSons = async (req, res) => {
  const Sons = await Son.find().populate("parentName");

  res.json(Sons);
};

exports.addSons = async (req, res) => {
  const { parent, name, wifeName, sons, daughters } = req.body;

  const parentData = await Parent.findOne({ name: "parent 1" });

  Son.create({
    name,
    wifeName,
    sons,
    daughters,
    parentName: "654d1db763798be7f7d64b8a",
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      throw err;
    });
};
