const participants = require('./data/crr_users.json');

exports.handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(participants),
  };
};