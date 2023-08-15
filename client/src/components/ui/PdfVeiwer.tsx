import { XCircle } from 'lucide-react';

type PdfViewerProps = {
  file: string;
  name: string;
  onClose: () => void;
};

export const PdfViewer = ({ file, name, onClose }: PdfViewerProps) => {
  return (
    <div className="relative flex h-full w-full flex-col">
      <h2 className="pr-50 shrink-0 overflow-hidden text-ellipsis p-3 pl-6">{name}</h2>
      <div className="grow">
        <object data={file} type="application/pdf" width="100%" height="100%">
          <p>
            <a href={file}>to the PDF!</a>
          </p>
        </object>
      </div>

      <button className="absolute right-2 top-2" onClick={onClose}>
        <XCircle className="hover:text-white" size={32} strokeWidth={1.25} />
      </button>
    </div>
  );
};
