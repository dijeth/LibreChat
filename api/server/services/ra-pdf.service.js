// Mock functions that simulate a Research Assistant pdf service

const { getUserInfo } = require('./ra-user.service');

let id = 0;
const getId = () => id++;

const createPdf = (userId, data = {}) => {
  const id = getId();
  return {
    id,
    userId: userId,
    filename: `filename-${userId}-${id}.pdf`,
    author: `author-${id}`,
    articleName: `articleName-${id}`,
    tag: `tag-${id}`,
    ...data,
  };
};

let pdfList = Array(2)
  .fill()
  .map(() => createPdf(1));

const getPdfList = async (userId) => {
  const { maxPdfCount } = await getUserInfo(userId);
  return pdfList.slice(0, maxPdfCount);
};

const uploadPdfs = async (userId, files) => {
  const { maxPdfCount } = await getUserInfo(userId);
  pdfList = pdfList
    .concat(files.map((it) => createPdf(userId, { filename: it.originalname })))
    .slice(0, maxPdfCount);

  return pdfList;
};

const deletePdfs = async (userId, pdfIds) => {
  await getUserInfo(userId); // just for user_id validation and delay
  pdfList = pdfList.filter(({ id }) => !pdfIds.includes(id));
  return pdfList;
};

const updatePdf = async (userId, pdf) => {
  await getUserInfo(userId); // just for user_id validation and delay
  pdfList = pdfList.filter(({ id }) => id !== pdf.id).concat([pdf]);
  return pdfList;
};

module.exports = { getPdfList, uploadPdfs, deletePdfs, updatePdf };
