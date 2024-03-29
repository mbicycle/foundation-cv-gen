import { Grid, Typography } from '@mui/material';

import { PreviewWarningText } from 'containers/main-page/preview/utils/constants';
import {
  CircleIconStyled,
  PaperWrapper, PersonalDetailsWrapperGrid, PrewieWrapperStyled, WarningStyled,
} from 'containers/main-page/styled';
import WarningIcon from 'common/icons/Warning';
import { useValidateCV } from 'common/utils/hooks/useValidateCV';

import PersonalDetails from './PersonalDetails';
import TopBox from './TopBox';

const PreviewWrapper = function (): JSX.Element {
  const { isValid, isFetching, invalidBlocks } = useValidateCV();
  return (
    <PrewieWrapperStyled>
      {!isFetching && !isValid && (
        <WarningStyled>
          <WarningIcon sx={{ mr: 6, width: '40px', height: '40px' }} />
          <div>
            <Typography>{PreviewWarningText.Title}</Typography>
            <Typography>{PreviewWarningText.Content}</Typography>
            {invalidBlocks.map((invalidBlock) => (
              <Typography key={invalidBlock} sx={{ paddingLeft: (theme) => theme.spacing(1.5) }}>
                <CircleIconStyled sx={{ color: 'black' }} />
                {invalidBlock}
              </Typography>
            ))}
          </div>
        </WarningStyled>
      )}
      <PaperWrapper
        elevation={6}
        sx={{ backgroundColor: '#ffffff', p: 3, pb: 16 }}
      >
        <Grid container>
          <Grid item xs={12}>
            <TopBox />
          </Grid>
          <PersonalDetailsWrapperGrid item>
            <PersonalDetails />
          </PersonalDetailsWrapperGrid>
        </Grid>
      </PaperWrapper>
    </PrewieWrapperStyled>
  );
};

export default PreviewWrapper;
