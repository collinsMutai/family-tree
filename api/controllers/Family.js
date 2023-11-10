const GrandParent = require("../models/GrandParents");
const Parent = require("../models/Parents");
const Children = require("../models/Children");

exports.hello = (req, res) => {
  res.json("hello");
};

exports.getGrandParents = async (req, res) => {
  const GrandParents = await GrandParent.find();
  res.json(GrandParents);
};

exports.addGrandParents = async (req, res) => {
  const { name, firstWifeName, secondWifeName, children } = req.body;
  GrandParent.create({ name, firstWifeName, secondWifeName, children })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      throw err;
    });
};

exports.getParents = async (req, res) => {
  const parentData = await Parent.findOne().populate("parentName");
  res.json(parentData);
};

exports.addParents = async (req, res) => {
  const { name, firstWifeName, secondWifeName, children } = req.body;
  Parent.create({
    name,
    firstWifeName,
    secondWifeName,
    children,
    parentName: "654e36133a6e80be76309a99",
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      throw err;
    });
};

exports.getChildren = async (req, res) => {
  const children = await Children.find()
    .populate("parentName")
    .populate("grandParentName");

  res.json(children);
};

exports.addChildren = async (req, res) => {
  const { parent, name, wifeName, children } = req.body;

  const parentData = await Parent.findOne({ name: "parent 1" });

  Children.create({
    name,
    wifeName,
    children,
    parentName: "654e3c61de38be65725eb2fd",
    grandParentName: "654e36133a6e80be76309a99",
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      throw err;
    });
};
