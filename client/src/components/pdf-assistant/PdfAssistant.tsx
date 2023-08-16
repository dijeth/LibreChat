import { useSetRecoilState } from 'recoil';
import {
  useDeletePdfsMutation,
  useGetPdfListQuery,
  useGetUserInfoQuery,
  useUpdatePdfMutation,
  useUploadPdfsMutation,
} from '@librechat/data-provider/src/react-query-service';
import { ChangeEvent, ChangeEventHandler, useState } from 'react';
import { Scrollbar } from '../ui/Scrollbar';
import { FileTextIcon, UploadIcon } from 'lucide-react';
import { ListItem } from '../ui/ListItem';
import { TPdf } from '@librechat/data-provider/src/types';
import { Button } from '../ui';
import { useQueryStatus } from './hooks';
import { PdfAssistantState, TPdfAssistantState } from './types';
import { Spinner } from '../svg';
import store from '~/store';

const PdfGroupButton = ({
  title,
  disabled,
  hint,
  handler,
}: {
  title: string;
  disabled: boolean;
  hint: string;
  handler: () => void;
}) => {
  return (
    <Button
      className="w-1/3"
      variant="outline"
      size="sm"
      title={hint}
      disabled={disabled}
      onClick={handler}
    >
      {title}
    </Button>
  );
};

type PdfAssistantProps = {
  userId: string;
};

export const PdfAssistant = ({ userId }: PdfAssistantProps) => {
  const [state, setState] = useState<TPdfAssistantState>(PdfAssistantState.IDLE);
  const [selected, setSelected] = useState<string[]>([]);

  const setPdf = useSetRecoilState<string | null>(store.pdf);

  const pdfListQuery = useGetPdfListQuery(userId);
  const userInfoQuery = useGetUserInfoQuery(userId);
  const uploadPdfsMutation = useUploadPdfsMutation();
  const deletePdfsMutation = useDeletePdfsMutation();
  const updatePdfMutation = useUpdatePdfMutation();

  useQueryStatus({
    queries: [
      pdfListQuery,
      userInfoQuery,
      uploadPdfsMutation,
      deletePdfsMutation,
      updatePdfMutation,
    ],
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

  const toggleSelected = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((it) => it !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const disabled = state === PdfAssistantState.LOADING;

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

  const handleDelete = (userId: string, pdfIds: TPdf['id'][]) => {
    deletePdfsMutation.mutate({ pdfIds, userId });
    setSelected(pdfIds.length === 1 ? selected.filter((it) => it !== pdfIds[0]) : []);
  };

  const handleUpdate = (userId: string, pdf: TPdf) => {
    updatePdfMutation.mutate({ pdf, userId });
  };

  if (state === PdfAssistantState.ERROR) {
    return <div className="text-red">Error</div>;
  }

  return (
    <>
      <div
        className={`relative flex h-full w-full flex-col items-start justify-start gap-2 text-sm text-gray-100 ${
          disabled ? 'opacity-30' : 'opacity-100'
        }`}
      >
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
            disabled={disabled}
            multiple
            onChange={handleUpload}
          />
        </form>
        <div className="flex w-full justify-between gap-2">
          <PdfGroupButton
            title="Search"
            hint="Search selection"
            disabled={!selected.length || disabled}
            handler={() => alert(selected)}
          />
          <PdfGroupButton
            title="Delete"
            hint="Delete selection"
            disabled={!selected.length || disabled}
            handler={() => handleDelete(userId, selected)}
          />
          <PdfGroupButton
            title="Reset"
            hint="Reset selection"
            disabled={!selected.length || disabled}
            handler={() => setSelected([])}
          />
        </div>
        <Scrollbar>
          <ul>
            {pdfListQuery.data?.map((pdf) => (
              <li className="py-2" key={pdf.id}>
                <ListItem
                  title={pdf.title}
                  MainIcon={FileTextIcon}
                  selected={selected.includes(pdf.id)}
                  disabled={disabled}
                  onSelect={() => toggleSelected(pdf.id)}
                  onDelele={() => handleDelete(userId, [pdf.id])}
                  onRename={(title: TPdf['title']) => handleUpdate(userId, { ...pdf, title })}
                  onClick={() => setPdf(pdf.id)}
                />
              </li>
            ))}
          </ul>
        </Scrollbar>
      </div>
      {state === PdfAssistantState.LOADING ? <Spinner className="absolute" /> : ''}
    </>
  );
};
