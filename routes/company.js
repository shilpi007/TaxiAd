const express = require('express');
const {CompanyController} = require('../Controllers');
const router = express.Router();

router.get('/list/NameAndId', CompanyController.listCompanyByNameAndId);
router.get('/list/all', CompanyController.allCompaniesList);

router.post('/add',CompanyController.addCompany);

module.exports = router;
