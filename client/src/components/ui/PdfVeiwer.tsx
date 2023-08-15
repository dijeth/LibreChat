type PdfViewerProps = {
  file: string;
  name: string;
  onClose: () => void;
};

export const PdfViewer = ({ file, name, onClose }: PdfViewerProps) => {
  return (
    <>
      <object data={file} type="application/pdf" width="100%" height="100%">
        <p>
          <a href={file}>to the PDF!</a>
        </p>
      </object>

      <button onClick={onClose}>Close {name}</button>
    </>
  );
};
