import {
  useState,
  useRef,
  FocusEventHandler,
  EventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  KeyboardEvent,
} from 'react';
import { LucideIcon } from 'lucide-react';
import { CheckMark, RenameIcon, TrashIcon, CrossIcon } from '../svg';
import { TPdf } from '@librechat/data-provider/src/types';

type ListItemProps = {
  title: string;
  selected?: boolean;
  disabled?: boolean;
  MainIcon: LucideIcon;
  onDelele?: () => void;
  onRename?: (title: TPdf['filename']) => void;
  onSelect?: () => void;
  onClick?: () => void;
};

const getPreventHandler = <T extends Event, K extends EventHandler<any>>(handler: Function): K => {
  return ((event: T) => {
    event.preventDefault();
    handler(event);
  }) as K;
};

export const ListItem = ({
  title,
  selected = false,
  disabled = false,
  MainIcon,
  onDelele,
  onRename,
  onSelect,
  onClick,
}: ListItemProps) => {
  const [renaming, setRenaming] = useState(false);
  const [titleInput, setTitleInput] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  const renameHandler: MouseEventHandler = (event) => {
    event.preventDefault();
    setTitleInput(title);
    setRenaming(true);
    setTimeout(() => {
      inputRef.current!.focus();
    }, 25);
  };

  const cancelHandler: MouseEventHandler = (event) => {
    event.preventDefault();
    setRenaming(false);
  };

  const onFinishRename = () => {
    setRenaming(false);
    if (titleInput === title) {
      return;
    }
    onRename && onRename(titleInput);
  };

  const handleKeyDown: KeyboardEventHandler = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      onFinishRename();
    }
  };

  return (
    <div className="animate-flash group relative flex items-center gap-3 break-all rounded-md px-3 py-3 pr-14 hover:bg-gray-800">
      <button disabled={disabled} className="p-1 hover:text-white" onClick={onSelect}>
        <MainIcon size={20} fill={selected ? 'white' : 'none'} />
      </button>
      <div className="relative max-h-5 flex-1 overflow-hidden text-ellipsis break-all">
        {renaming === true ? (
          <input
            ref={inputRef}
            type="text"
            className="m-0 mr-0 w-full border border-blue-500 bg-transparent p-0 text-sm leading-tight outline-none"
            value={titleInput}
            onChange={(e) => {
              setTitleInput(e.target.value);
            }}
            onBlur={getPreventHandler<FocusEvent, FocusEventHandler>(onFinishRename)}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <span className="cursor-pointer" onClick={onClick}>
            {title}
          </span>
        )}
      </div>
      <div className="visible absolute right-1 z-10 flex text-gray-300">
        <button
          disabled={disabled}
          className="p-1 hover:text-white"
          onClick={renaming ? onFinishRename : renameHandler}
        >
          {renaming ? <CheckMark /> : <RenameIcon />}
        </button>

        <button
          disabled={disabled}
          className="p-1 hover:text-white"
          onClick={renaming ? cancelHandler : onDelele}
        >
          {renaming ? <CrossIcon /> : <TrashIcon />}
        </button>
      </div>
    </div>
  );
};
