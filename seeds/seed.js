const sequelize = require("../config/connection");
const {
  User,
  Beneficiary,
  Executor,
  Asset,
  AssetApportion,
} = require("../models");

const userData = require("./userData.json");
const beneficiaryData = require("./beneficiaryData.json");
const executorData = require("./executorData.json");
const assetData = require("./assetData.json");
const assetApportionData = require("./assetApportionData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  await Beneficiary.bulkCreate(beneficiaryData, {
    individualHooks: true,
    returning: true,
  });
  await Executor.bulkCreate(executorData, {
    individualHooks: true,
    returning: true,
  });
  await Asset.bulkCreate(assetData, {
    individualHooks: true,
    returning: true,
  });
  await AssetApportion.bulkCreate(assetApportionData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
