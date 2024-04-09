import type { CSSProperties } from 'react';
import { memo } from 'react';

import CircularSpinner from 'common/components/circular-spinner/circular-spinner';
import DragIndicatorIcon from 'common/icons/DragIndicatorIcon';
import GarbageIcon from 'common/icons/GarbageIcon';

type T = React.MouseEventHandler<HTMLAnchorElement> & React.MouseEventHandler<HTMLSpanElement>

interface ProfiencyItemProps {
  headText: string;
  onDelete: (id?: string) => void;
  bodyText?: string;
  isLoading?: boolean;
  isDraggable?: boolean,
  disabled?: boolean;
  onClick?: () => void;
  border?: CSSProperties;
  link?: string;
  linkText?: string;
}

const ProfiencyItem = function ({
  headText,
  bodyText,
  onDelete,
  onClick,
  isLoading,
  border,
  disabled,
  isDraggable,
  link,
  linkText = 'Go to certificate...',
}: ProfiencyItemProps): JSX.Element {
  const setIdHandle = (): void => {
    if (onClick) {
      onClick();
    }
  };

  const onDeleteEntryHandle = (): void => {
    onDelete();
  };

  function renderIcons(): JSX.Element {
    if (isLoading) {
      return <CircularSpinner size="small" />;
    }
    return (<GarbageIcon color="primary" />);
  }

  function linkCer(event: React.MouseEvent<HTMLLinkElement>): void {
    event.stopPropagation();
  }

  return (
    <div
      className={`inline-flex w-full items-center p-2 mb-2 border rounded-lg
       ${disabled && 'opacity-50 pointer-events-none'}`}
      style={border}
    >
      {isDraggable && <DragIndicatorIcon className="text-gray-500 size-10" />}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div className="w-full cursor-pointer" onClick={setIdHandle}>
        <div className="pl-4">
          <p>
            {headText}
          </p>
          <p className="text-gray-500">
            {bodyText}
          </p>
          {link
            && (
              <a href={link} className="link" target="_blank" rel="noreferrer" onClick={linkCer as T}>
                {linkText}
              </a>
            )}
        </div>
      </div>
      <button type="button" className="p-2" onClick={onDeleteEntryHandle}>
        {renderIcons()}
      </button>
    </div>
  );
};

export default memo(ProfiencyItem);
