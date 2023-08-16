import { XCircle } from 'lucide-react';

type PdfViewerProps = {
  file: string | null;
  name: string;
  onClose: () => void;
};

export const PdfViewer = ({ file, name, onClose }: PdfViewerProps) => {
  return (
    <div className="relative flex h-full w-full flex-col">
      <h2 className="pr-50 shrink-0 overflow-hidden text-ellipsis p-3 pl-6">{name}</h2>
      <div className="flex grow items-center justify-center">
        {file ? (
          <object data={file} type="application/pdf" width="100%" height="100%">
            <p>
              <a href={file}>to the PDF!</a>
            </p>
          </object>
        ) : (
          'Document not found'
        )}
      </div>

      <button className="absolute right-2 top-2" onClick={onClose}>
        <XCircle className="hover:text-white" size={32} strokeWidth={1.25} />
      </button>
    </div>
  );
};
