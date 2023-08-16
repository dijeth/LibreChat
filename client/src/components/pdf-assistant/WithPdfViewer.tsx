import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import store from '~/store';
import { PdfViewer } from '../ui/PdfVeiwer';
import { LayoutSplitter } from '../ui/LayoutSplitter';
import { PdfAssistantState, TPdfAssistantState } from './types';
import { useQueryStatus } from './hooks';
import { useGetPdfListQuery } from '@librechat/data-provider/src/react-query-service';
import { Spinner } from '../svg';

export const WithPdfViewer = ({ children, userId }) => {
  const [pdf, setPdf] = useRecoilState<string | null>(store.pdf);
  const [state, setState] = useState<TPdfAssistantState>(PdfAssistantState.IDLE);
  const pdfListQuery = useGetPdfListQuery(userId);

  useQueryStatus({
    queries: [pdfListQuery],
    onError() {
      setState(PdfAssistantState.ERROR);
    },
    onLoading() {
      setState(PdfAssistantState.LOADING);
    },
    onSuccess() {
      setState(PdfAssistantState.IDLE);
    },
  });

  if (!pdf) {
    return children;
  }

  let LeftComponent;
  let document;
  switch (state) {
    case PdfAssistantState.ERROR:
      LeftComponent = <PdfViewer file={null} name={''} onClose={() => setPdf(null)} />;
      break;
    case PdfAssistantState.LOADING:
      LeftComponent = <Spinner />;
      break;
    case PdfAssistantState.IDLE:
      document = pdfListQuery.data!.find(({ id }) => id === pdf);
      LeftComponent = document ? (
        <PdfViewer file={document.filename} name={document.title} onClose={() => setPdf(null)} />
      ) : (
        <PdfViewer file={null} name={''} onClose={() => setPdf(null)} />
      );
      break;
  }

  return <LayoutSplitter RightComponent={children} LeftComponent={LeftComponent} />;
};
