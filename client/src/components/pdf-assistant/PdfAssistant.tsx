import {
  useGetPdfListQuery,
  useGetUserInfoQuery,
  useUploadPdfsMutation,
} from '@librechat/data-provider/src/react-query-service';
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';
import { Spinner } from '../svg';
import { Scrollbar } from '../ui/Scrollbar';
import { FileTextIcon, UploadIcon } from 'lucide-react';
import { ListItem } from '../ui/ListItem';

const PdfAssistantState = {
  LOADING: 'loading',
  ERROR: 'error',
  IDLE: 'idle',
} as const;

const ERROR_DELAY = 2000;

type TPdfAssistantState = (typeof PdfAssistantState)[keyof typeof PdfAssistantState];

type PdfAssistantProps = {
  userId: string;
};

export const PdfAssistant = ({ userId }: PdfAssistantProps) => {
  const [state, setState] = useState<TPdfAssistantState>(PdfAssistantState.IDLE);
  const [selected, setSelected] = useState<string[]>([]);

  const pdfListQuery = useGetPdfListQuery(userId);
  const userInfoQuery = useGetUserInfoQuery(userId);
  const uploadPdfsMutation = useUploadPdfsMutation();

  const toggleSelected = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((it) => it !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  useEffect(() => {
    const statuses = [pdfListQuery.status, userInfoQuery.status, uploadPdfsMutation.status];

    if (statuses.some((it) => it === PdfAssistantState.LOADING)) {
      setState(PdfAssistantState.LOADING);
    } else if (statuses.some((it) => it === PdfAssistantState.ERROR)) {
      setState(PdfAssistantState.ERROR);
      setTimeout(() => setState(PdfAssistantState.IDLE), ERROR_DELAY);
    } else {
      setState(PdfAssistantState.IDLE);
    }
  }, [pdfListQuery.status, userInfoQuery.status, uploadPdfsMutation.status]);

  const handleUpload: ChangeEventHandler = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const { files } = target;
    if (!files || !files.length) {
      return;
    }

    const possibleFileCount = userInfoQuery.data!.maxPdfCount - pdfListQuery.data!.length;
    uploadPdfsMutation.mutate({ userId, files: Array.from(files).slice(0, possibleFileCount) });
    target.value = '';
  };

  if (state === PdfAssistantState.LOADING) {
    return <Spinner />;
  }

  if (state === PdfAssistantState.ERROR) {
    return <div className="text-red">Error</div>;
  }

  return (
    <div className="flex h-full w-full flex-col items-start justify-start gap-2 text-sm text-gray-100">
      <form className="w-full">
        <label
          htmlFor="pdf"
          className="mb-2 flex h-11 flex-shrink-0 flex-grow cursor-pointer items-center gap-3 rounded-md border border-white/20 px-3 py-3 text-sm text-white transition-colors duration-200 hover:bg-gray-500/10"
        >
          <UploadIcon size={20} strokeWidth={2} />
          Upload a PDF
        </label>
        <input
          className="hidden"
          id="pdf"
          type="file"
          accept=".pdf"
          multiple
          onChange={handleUpload}
        />
      </form>
      <Scrollbar>
        <ul>
          {pdfListQuery.data?.map(({ id, filename }) => (
            <li className="py-2" key={id}>
              <ListItem
                title={filename}
                MainIcon={FileTextIcon}
                selected={selected.includes(id)}
                onSelect={() => toggleSelected(id)}
              />
            </li>
          ))}
        </ul>
      </Scrollbar>
    </div>
  );
};
