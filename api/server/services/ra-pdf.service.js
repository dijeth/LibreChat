// Mock functions that simulate a Research Assistant pdf service

const { setTimeout } = require('node:timers/promises');
const { getUserInfo } = require('./ra-user.service');

let id = 0;
const getId = () => String(id++);
const sort = (pdfs) => pdfs.sort((a, b) => (a.id < b.id ? -1 : 1));

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
  return sort(pdfList.slice(0, maxPdfCount));
};

const uploadPdfs = async (userId, files) => {
  const { maxPdfCount } = await getUserInfo(userId);
  pdfList = pdfList
    .concat(files.map((it) => createPdf(userId, { filename: it.originalname })))
    .slice(0, maxPdfCount);

  await setTimeout(2000);

  return sort(pdfList);
};

const deletePdfs = async (userId, pdfIds) => {
  await getUserInfo(userId); // just for user_id validation and delay
  pdfList = pdfList.filter(({ id }) => !pdfIds.includes(id));
  return sort(pdfList);
};

const updatePdf = async (userId, pdf) => {
  await getUserInfo(userId); // just for user_id validation and delay
  pdfList = pdfList.filter(({ id }) => id !== pdf.id).concat([pdf]);
  return sort(pdfList);
};

module.exports = { getPdfList, uploadPdfs, deletePdfs, updatePdf };
