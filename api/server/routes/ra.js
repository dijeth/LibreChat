const express = require('express');
const multer = require('multer');
const { getUserInfoController } = require('../controllers/ra-user.controller');
const {
  getPdfListController,
  uploadPdfsController,
  deletePdfsController,
  updatePdfController,
} = require('../controllers/ra-pdf.controller');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './client/public/pdf/');
  },
  filename: function (req, file, cb) {
    const extension = file.mimetype.split('/').pop();
    cb(null, `${Date.now()}.${extension}`);
  },
});
const upload = multer({ storage });

const router = express.Router();

router.get('/user/:userId', getUserInfoController);
router.get('/pdf/list/:userId', getPdfListController);
router.post('/pdf/upload', upload.array('files'), uploadPdfsController);
router.delete('/pdf/delete', deletePdfsController);
router.patch('/pdf/update', updatePdfController);

module.exports = router;
