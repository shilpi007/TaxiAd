// import module
const { AdminModel, CompanyModel } = require('../Models');

const addCompany = async (req, res, next) => {
  try {
    const { body } = req;
    const newCompany = new CompanyModel(body);
    const admin = await AdminModel.findOne({});
    newCompany.createdBy = admin._id;
    await newCompany.save();
    res.status(200).send({
      hasError: false,
      message: 'company successfully added',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

const listCompanyByNameAndId = async (req, res, next) => {
  try {
    const requestListCompanyByNameAndId = [{ $project: { _id: 1, name: 1 } }];
    let listCompanyByNameAndId = await CompanyModel.aggregate(requestListCompanyByNameAndId);
    listCompanyByNameAndId = listCompanyByNameAndId.map((list) => {
      return { label: list.name, value: list._id };
    });
    res.send({
      hasError: false,
      data: listCompanyByNameAndId,
      message: 'list of companies',
    });
  } catch (error) {
    next(error);
  }
};

const allCompaniesList = async (req, res, next) => {
  try {
    const requestAllCompanyList = [
      { $project: { name: 1, contactPersonName: 1, contactPersonEmail: 1, contactPersonContactNo: 1 } },
    ];
    const allCompanyList = await CompanyModel.aggregate(requestAllCompanyList);
    res.send({
      hasError: false,
      message: 'all company list',
      data: allCompanyList,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addCompany,
  listCompanyByNameAndId,
  allCompaniesList,
};
