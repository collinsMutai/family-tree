const express = require("express");
const router = express.Router();

const FamilyController = require("../controllers/Family");

router.get("/", FamilyController.hello);

router.get("/grandparents", FamilyController.getGrandParents);

router.put("/grandparents", FamilyController.addGrandParents);

router.get("/parents", FamilyController.getParents);

router.post("/parents", FamilyController.addParents);

router.get("/children", FamilyController.getChildren);

router.post("/children", FamilyController.addChildren);

module.exports = router;
