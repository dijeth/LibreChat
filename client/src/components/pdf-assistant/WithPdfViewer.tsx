import React from 'react';
import { useRecoilState } from 'recoil';
import { TPdf } from '@librechat/data-provider/src/types';
import store from '~/store';
import { PdfViewer } from '../ui/PdfVeiwer';
import { LayoutSplitter } from '../ui/LayoutSplitter';

export const WithPdfViewer = ({ children }) => {
  const [pdf, setPdf] = useRecoilState<TPdf | null>(store.pdf);

  return pdf ? (
    <LayoutSplitter
      RightComponent={children}
      LeftComponent={
        <PdfViewer file={pdf.filename} name={pdf.title} onClose={() => setPdf(null)} />
      }
    />
  ) : (
    children
  );
};
