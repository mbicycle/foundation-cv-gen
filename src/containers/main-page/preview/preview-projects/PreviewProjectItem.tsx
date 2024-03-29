import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

import { Grid, Typography } from '@mui/material';

import { useUserFromDb } from 'containers/main-page/cv-form/api/query-hooks';
import { CircleIconStyled } from 'containers/main-page/styled';
import { useToggleSensitiveData } from 'common/context';
import type { Project } from 'common/models/User';
import { projects } from 'common/utils/constants';

import { projectDatePresent } from 'fields/projects/components/utils/constants';

interface PreviewProjectItemProps {
  project: Omit<Project, 'id'>;
}

const PreviewProjectItem: React.FC<PreviewProjectItemProps> = function (props) {
  const { data } = useUserFromDb();
  const { project } = props;
  const {
    title, description, from, to, responsibilities, teamSize, categories, role, link,
  } = project;
  const {
    descrTitle, duration, respTitle, sizeTitle, toolsAndTechs, projectRole, productLink, NDA,
  } = projects;

  const fromTo = useMemo(() => {
    const fromFormatted = dayjs(from).format('MMMM YYYY');
    const toFormatted = to === projectDatePresent ? projectDatePresent : dayjs(to).format('MMMM YYYY');
    return fromFormatted === toFormatted ? fromFormatted : `${fromFormatted} - ${toFormatted}`;
  }, [from, to]);

  const { state } = useToggleSensitiveData();
  const { checked: hiddenSensitiveData } = state;

  function renderHiddenLink(): JSX.Element {
    if (!hiddenSensitiveData) {
      return (
        <Typography
          color="blue"
          component="a"
          href={link}
          sx={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            maxWidth: '100%',
          }}
        >
          {link}
        </Typography>
      );
    }
    return (
      <Typography sx={{ textTransform: 'uppercase' }}>
        {NDA}
      </Typography>
    );
  }

  function renderProjectLink(): JSX.Element | null {
    if (!link) return null;
    return (
      <Grid item container sx={{ pt: 3 }}>
        <Typography variant="h6">
          {`${productLink}`}
        &nbsp;
        </Typography>
        {renderHiddenLink()}
      </Grid>
    );
  }

  function renderCategory(fullCategory: string): JSX.Element {
    const mappedFullCategory = fullCategory.split(', ');
    const skill = data?.skills?.find((skillItem) => skillItem.id === mappedFullCategory[0]);
    if (skill) {
      const categoryNames = skill?.tools.filter(
        (toolItem) => mappedFullCategory[1].split(',').includes(toolItem.id),
      ) || [];
      return (
        <Typography sx={{ width: '100%' }} color="text.secondary" key={uuidv4()}>
          {
            `${skill?.name}: ${categoryNames?.map((categoryName, index) => {
              if (index === categoryNames.length - 1) return ` ${categoryName.name}.`;
              return ` ${categoryName.name}`;
            })}`
          }
        </Typography>
      );
    }
    return (<Typography sx={{ width: '100%' }} color="text.secondary" key={uuidv4()} />);
  }

  return (
    <Grid item container sx={{ pt: 6 }}>
      <Typography variant="h5" sx={{ textTransform: 'uppercase' }}>
        <CircleIconStyled />
        {title}
      </Typography>
      {renderProjectLink()}
      <Grid item container>
        <Typography variant="h6" sx={{ pt: 3 }}>
          {descrTitle}
        </Typography>
      </Grid>
      <Grid item container>
        <Typography
          color="text.secondary"
          sx={{
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {description}
        </Typography>
      </Grid>
      <Grid item container sx={{ pt: 3 }}>
        <Typography variant="h6">
          {duration}
          &nbsp;
        </Typography>
        <Typography color="text.secondary">
          {fromTo}
        </Typography>
      </Grid>
      <Grid item container sx={{ pt: 3 }}>
        <Typography variant="h6">
          {respTitle}
        </Typography>
      </Grid>
      <Grid component="ul" item container sx={{ display: 'block', pt: 3, pl: 4 }}>
        {
          responsibilities.map((responsibility) => (
            <Typography
              key={responsibility}
              component="li"
              color="text.secondary"
              sx={{
                '::marker': {
                  color: 'black',
                },
              }}
            >
              {responsibility}
            </Typography>
          ))
        }
      </Grid>
      <Grid item container sx={{ pt: 3 }}>
        <Typography variant="h6">
          {`${sizeTitle}`}
          &nbsp;
        </Typography>
        <Typography color="text.secondary">
          {teamSize}
        </Typography>
      </Grid>
      <Grid item container sx={{ pt: 3 }}>
        <Typography variant="h6">
          {`${projectRole}`}
          &nbsp;
        </Typography>
        <Typography color="text.secondary">
          {role}
        </Typography>
      </Grid>
      <Grid item container sx={{ pt: 3 }}>
        <Typography variant="h6" component="p">
          {toolsAndTechs}
          &nbsp;
        </Typography>
        {categories?.map((category) => renderCategory(category))}
      </Grid>
    </Grid>
  );
};

export default React.memo(PreviewProjectItem);
