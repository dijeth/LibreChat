type PdfViewerProps = {
  file: string;
  name: string;
  onClose: () => void;
};

export const PdfViewer = ({ file, name, onClose }: PdfViewerProps) => {
  return (
    <div>
      <h1 className="mb-10 ml-auto mr-auto mt-6 flex items-center justify-center gap-2 text-center text-4xl font-semibold sm:mb-16 md:mt-[10vh]">
        {name}
      </h1>

      <p>{file}</p>

      <button onClick={onClose}>Close</button>
    </div>
  );
};
