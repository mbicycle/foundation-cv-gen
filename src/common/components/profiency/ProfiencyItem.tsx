import type { CSSProperties } from 'react';
import { memo } from 'react';

import {
  IconButton, Link, Typography,
} from '@mui/material';

import CircularSpinner from 'common/components/circular-spinner/circular-spinner';
import GarbageIcon from 'common/icons/GarbageIcon';

import {
  DragIndicatorIconStyled, LeftSideWrapperStyled,
  LeveledLanguageItemStyled, TextContainerStyled,
} from './styled';

type T = React.MouseEventHandler<HTMLAnchorElement> & React.MouseEventHandler<HTMLSpanElement>

interface ProfiencyItemProps {
  headText: string;
  onDelete: (id?: string) => void;
  bodyText?: string;
  isLoading?: boolean;
  isDraggable?: boolean,
  link?: string | undefined;
  disabled?: boolean;
  onClick?: () => void;
  border?: CSSProperties;
}

const ProfiencyItem = function ({
  headText,
  bodyText,
  onDelete,
  onClick,
  isLoading,
  link,
  border,
  disabled,
  isDraggable,
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
      return <CircularSpinner size="tiny" color="primary" />;
    }
    return (<GarbageIcon color="primary" />);
  }

  function linkCer(event: React.MouseEvent<HTMLLinkElement>): void {
    event.stopPropagation();
  }

  return (
    <LeveledLanguageItemStyled $disabled={disabled === true ? 'true' : undefined} style={border}>
      {isDraggable && <DragIndicatorIconStyled fontSize="large" />}
      <LeftSideWrapperStyled onClick={setIdHandle}>
        <TextContainerStyled>
          <Typography variant="body1">
            {headText}
          </Typography>
          <Typography
            component="div"
            variant="body2"
            color="text.secondary"
          >
            {bodyText}
          </Typography>
          <Typography
            component="div"
            variant="body2"
            color="text.secondary"
          >
            <Link href={link} underline="always" target="_blank" onClick={linkCer as T}>
              {link ? 'Go to certificate...' : null}
            </Link>
          </Typography>
        </TextContainerStyled>
      </LeftSideWrapperStyled>
      <IconButton onClick={onDeleteEntryHandle}>
        {renderIcons()}
      </IconButton>
    </LeveledLanguageItemStyled>
  );
};

export default memo(ProfiencyItem);
