const products = require('./data/participants.json');

exports.handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(products),
  };
};