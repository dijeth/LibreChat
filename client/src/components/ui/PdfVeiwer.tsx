import { Scrollbar } from './Scrollbar';

type PdfViewerProps = {
  file: string;
  name: string;
  onClose: () => void;
};

export const PdfViewer = ({ file, name, onClose }: PdfViewerProps) => {
  return (
    <Scrollbar>
      <button onClick={onClose}>Close</button>
      <h1 className="mb-10 ml-auto mr-auto mt-6 flex items-center justify-center gap-2 text-center text-4xl font-semibold sm:mb-16 md:mt-[10vh]">
        {name}
      </h1>

      <p>{file}</p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque facere alias ex qui,
        voluptatibus mollitia numquam deserunt cum fugit dolorum minima voluptatem nostrum quia,
        sapiente labore illo voluptatum, dignissimos quis.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque facere alias ex qui,
        voluptatibus mollitia numquam deserunt cum fugit dolorum minima voluptatem nostrum quia,
        sapiente labore illo voluptatum, dignissimos quis.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque facere alias ex qui,
        voluptatibus mollitia numquam deserunt cum fugit dolorum minima voluptatem nostrum quia,
        sapiente labore illo voluptatum, dignissimos quis.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque facere alias ex qui,
        voluptatibus mollitia numquam deserunt cum fugit dolorum minima voluptatem nostrum quia,
        sapiente labore illo voluptatum, dignissimos quis.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque facere alias ex qui,
        voluptatibus mollitia numquam deserunt cum fugit dolorum minima voluptatem nostrum quia,
        sapiente labore illo voluptatum, dignissimos quis.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque facere alias ex qui,
        voluptatibus mollitia numquam deserunt cum fugit dolorum minima voluptatem nostrum quia,
        sapiente labore illo voluptatum, dignissimos quis.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque facere alias ex qui,
        voluptatibus mollitia numquam deserunt cum fugit dolorum minima voluptatem nostrum quia,
        sapiente labore illo voluptatum, dignissimos quis.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque facere alias ex qui,
        voluptatibus mollitia numquam deserunt cum fugit dolorum minima voluptatem nostrum quia,
        sapiente labore illo voluptatum, dignissimos quis.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque facere alias ex qui,
        voluptatibus mollitia numquam deserunt cum fugit dolorum minima voluptatem nostrum quia,
        sapiente labore illo voluptatum, dignissimos quis.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque facere alias ex qui,
        voluptatibus mollitia numquam deserunt cum fugit dolorum minima voluptatem nostrum quia,
        sapiente labore illo voluptatum, dignissimos quis.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque facere alias ex qui,
        voluptatibus mollitia numquam deserunt cum fugit dolorum minima voluptatem nostrum quia,
        sapiente labore illo voluptatum, dignissimos quis.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque facere alias ex qui,
        voluptatibus mollitia numquam deserunt cum fugit dolorum minima voluptatem nostrum quia,
        sapiente labore illo voluptatum, dignissimos quis.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque facere alias ex qui,
        voluptatibus mollitia numquam deserunt cum fugit dolorum minima voluptatem nostrum quia,
        sapiente labore illo voluptatum, dignissimos quis.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque facere alias ex qui,
        voluptatibus mollitia numquam deserunt cum fugit dolorum minima voluptatem nostrum quia,
        sapiente labore illo voluptatum, dignissimos quis.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque facere alias ex qui,
        voluptatibus mollitia numquam deserunt cum fugit dolorum minima voluptatem nostrum quia,
        sapiente labore illo voluptatum, dignissimos quis.
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque facere alias ex qui,
        voluptatibus mollitia numquam deserunt cum fugit dolorum minima voluptatem nostrum quia,
        sapiente labore illo voluptatum, dignissimos quis.
      </p>
    </Scrollbar>
  );
};
