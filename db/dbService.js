// db/dbService.js
const { User, Deposit, Wallet, History } = require('./models');

// Helper function to get model by name
const getModel = (modelName) => {
  switch (modelName.toLowerCase()) {
    case 'user': return User;
    case 'deposit': return Deposit;
    case 'wallet': return Wallet;
    case 'history': return History;
    default: throw new Error(`Model "${modelName}" not found`);
  }
};

// CREATE
const addRecord = async (modelName, data) => {
  const Model = getModel(modelName);
  const record = await Model.create(data);
  return record;
};

// READ
const getRecord = async (modelName, id) => {
  const Model = getModel(modelName);
  return await Model.findByPk(id);
};

// UPDATE
const updateRecord = async (modelName, id, newData) => {
  const Model = getModel(modelName);
  const record = await Model.findByPk(id);
  if (!record) throw new Error(`${modelName} with id ${id} not found`);
  await record.update(newData);
  return record;
};

// DELETE
const deleteRecord = async (modelName, id) => {
  const Model = getModel(modelName);
  const record = await Model.findByPk(id);
  if (!record) throw new Error(`${modelName} with id ${id} not found`);
  await record.destroy();
  return true;
};

module.exports = {
  addRecord,
  getRecord,
  updateRecord,
  deleteRecord
};
