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
  articleName = '',
  author = '',
  selected = false,
  onDelele = () => {},
  onUpdate = () => {},
  onSelect = () => {},
}: PdfFileProps) => {
  return <p>{filename}</p>;
};
