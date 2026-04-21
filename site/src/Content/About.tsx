import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const About = () => {
  return (
    <Box
      component="article"
      sx={{
        maxWidth: '70ch',
        px: 2,
        py: 3,
      }}
    >
      <Typography variant="h1" sx={{ fontSize: '2rem', fontWeight: 700, mb: 3 }}>
        Haldave's site
      </Typography>

      <Typography variant="body1" paragraph>
        This website is a personal project — a playground to experiment with
        multiple technologies and design patterns. I also use it to share some
        of my hobbies and work experience.
      </Typography>

      <Typography variant="body1" paragraph>
        The frontend is built with React and Material UI, using React Router for
        navigation and React Query for data fetching. It is fully responsive and
        works well on mobile devices.
      </Typography>

      <Typography variant="body1" paragraph>
        The backend is a Node.js REST API written in TypeScript using Express,
        deployed as an Azure Web App. Data is persisted in Azure Cosmos DB via
        the official SDK. Authentication uses JWT and bcrypt — the password hash
        lives server-side as an environment variable and is never exposed to the
        client.
      </Typography>

      <Typography variant="body1" paragraph>
        Both projects are shipped through GitHub Actions pipelines: every push
        to <code>main</code> triggers a build, compiles TypeScript, and deploys
        automatically to Azure — keeping the workflow lean and fully automated.
      </Typography>
    </Box>
  );
};

export default About;