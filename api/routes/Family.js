const express = require("express");
const router = express.Router();

const FamilyController = require("../controllers/Family");

router.get("/", FamilyController.hello);

router.get("/grandparents", FamilyController.getGrandParents);

router.post("/grandparents", FamilyController.addGrandParents);

router.get("/parents", FamilyController.getParents);

router.post("/parents", FamilyController.addParents);

router.get("/sons", FamilyController.getSons);

router.post("/sons", FamilyController.addSons);

module.exports = router;
