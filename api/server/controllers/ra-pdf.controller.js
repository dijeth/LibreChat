const { getPdfList, deletePdfs, updatePdf, uploadPdfs } = require('../services/ra-pdf.service');

const getPdfListController = async (req, res) => {
  try {
    res.json(await getPdfList(req.params.userId));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deletePdfsController = async (req, res) => {
  try {
    const { userId, pdfIds } = req.query;
    res.json(await deletePdfs(userId, pdfIds));
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
};

const updatePdfController = async (req, res) => {
  try {
    const { userId, pdf } = req.body;
    res.json(await updatePdf(userId, pdf));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const uploadPdfsController = async (req, res) => {
  try {
    const { userId } = req.body;
    res.json(await uploadPdfs(userId, req.files));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getPdfListController,
  updatePdfController,
  deletePdfsController,
  uploadPdfsController,
};
