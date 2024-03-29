import { Container, Grid } from '@mui/material';

import Certifications from './Certifications';
import Languages from './Languages';
import PersonalInformation from './PersonalInformation';
import { PreviewProjects } from './preview-projects';
import { PreviewSkills } from './preview-skills';

const PersonalDetails = function (): JSX.Element {
  return (
    <Container component={Grid} maxWidth="lg">
      <Grid item xs={12}>
        <PersonalInformation />
      </Grid>
      <Grid item xs={12}>
        <Languages />
      </Grid>
      <Grid item xs={12}>
        <PreviewSkills />
      </Grid>
      <Grid item xs={12}>
        <PreviewProjects />
      </Grid>
      <Grid item xs={12}>
        <Certifications />
      </Grid>
    </Container>

  );
};

export default PersonalDetails;
