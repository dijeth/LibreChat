const express = require('express');
const upload = require('multer')({ dest: './uploads/' });
const { getUserInfoController } = require('../controllers/ra-user.controller');
const {
  getPdfListController,
  uploadPdfsController,
  deletePdfsController,
  updatePdfController,
} = require('../controllers/ra-pdf.controller');

const router = express.Router();

router.get('/user/:userId', getUserInfoController);
router.get('/pdf/list/:userId', getPdfListController);
router.post('/pdf/upload', upload.array('files'), uploadPdfsController);
router.delete('/pdf/delete', deletePdfsController);
router.patch('/pdf/update', updatePdfController);

module.exports = router;
