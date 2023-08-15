import { ReactElement, useState } from 'react';
import { useResizable, SeparatorProps } from 'react-resizable-layout';

const Splitter = ({ isDragging, ...props }: SeparatorProps & { isDragging: boolean }) => {
  const [isFocused, setIsFocused] = useState(false);

  const colorClasses = isDragging || isFocused ? 'w-2 bg-black' : 'w-1 bg-black';
  const classes = `shrink-0 cursor-col-resize transition-color ${colorClasses}`;

  return (
    <div
      tabIndex={0}
      className={classes}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      {...props}
    />
  );
};

type LayoutSplitterProps = {
  LeftComponent: ReactElement;
  RightComponent: ReactElement;
};

export const LayoutSplitter = ({ LeftComponent, RightComponent }: LayoutSplitterProps) => {
  const { isDragging, position, separatorProps } = useResizable({
    axis: 'x',
    reverse: true,
  });

  return (
    <div className="flex h-full w-full overflow-hidden">
      <div className="flex grow">{LeftComponent}</div>
      <Splitter isDragging={isDragging} {...separatorProps} />
      <div className="h-full shrink-0 overflow-hidden" style={{ width: position + 'px' }}>
        {RightComponent}
      </div>
    </div>
  );
};
