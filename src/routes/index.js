const express = require('express');
const {renderBranchesView} = require("../controllers/branchController");
const router = express.Router();


router.get('/', renderBranchesView);

module.exports = router;