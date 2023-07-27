const { getUserInfo } = require('../services/ra-user.service');

const getUserInfoController = async (req, res) => {
  try {
    res.json(await getUserInfo(req.params.userId));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { getUserInfoController };
