// Mock functions that simulate a Research Assistant user service

const { setTimeout } = require('node:timers/promises');

const DELAY = 1000;
const INVALID_USER_ID = '0';

const getUserInfo = async (userId) => {
  await setTimeout(DELAY);

  if (userId === INVALID_USER_ID) {
    throw new Error('User not found');
  }

  return {
    id: userId,
    organizationId: 'some-organization-id',
    maxPdfCount: 15,
  };
};

module.exports = { getUserInfo };
