import { FileTextIcon, MoreHorizontalIcon } from 'lucide-react';
import { useState } from 'react';

type PdfFileProps = {
  filename: string;
  articleName?: string;
  author?: string;
  selected?: boolean;
  onDelele?: () => void;
  onUpdate?: () => void;
  onSelect?: () => void;
};

export const PdfFile = ({
  filename,
  selected = false,
  onDelele = () => {},
  onUpdate = () => {},
  onSelect = () => {},
}: PdfFileProps) => {
  return (
    <div className="flex items-center gap-2 rounded-md p-3 hover:bg-gray-800">
      <button type="button">
        <FileTextIcon />
      </button>
      <span className="mr-auto w-3/4 overflow-hidden text-ellipsis whitespace-nowrap">
        {filename}
      </span>
      <button type="button">
        <MoreHorizontalIcon />
      </button>
    </div>
  );
};
