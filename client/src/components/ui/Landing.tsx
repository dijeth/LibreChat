import React from 'react';
import { useRecoilState } from 'recoil';
import store from '~/store';
import { PdfViewer } from './PdfVeiwer';
import { TPdf } from '@librechat/data-provider/src/types';
import { LayoutSplitter } from './LayoutSplitter';
import { SearchAssistant } from './SearchAssistant';

export default function Landing() {
  const [pdf, setPdf] = useRecoilState<TPdf | null>(store.pdf);

  return (
    <div className="flex h-full flex-col items-center overflow-y-auto pt-0 text-sm dark:bg-gray-800">
      {pdf ? (
        <LayoutSplitter>
          <PdfViewer file={pdf.filename} name={pdf.title} onClose={() => setPdf(null)} />
          <SearchAssistant />
        </LayoutSplitter>
      ) : (
        <SearchAssistant />
      )}
    </div>
  );
}
