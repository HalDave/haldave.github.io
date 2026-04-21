import * as React from 'react';

const About = () => {
  return (
    <div>
      <h1>Haldave's site</h1>
      <p>
        This website is a personal project, it is basically a playground where I get to experiment with multiple technologies and design patterns. I also use it to share some of my hobbies and work experience.
      </p>
      <p>
        The website is built using React and Material UI, it is also responsive and works well on mobile devices. I use React Router for navigation and React Query for data fetching.
        The backend is a Node.js REST API written in TypeScript using Express, deployed as an Azure Web App. Data is persisted in Azure Cosmos DB, queried via the official SDK.
        Authentication is handled with JWT and bcrypt — a hashed password is stored as an environment variable and never exposed to the client.
        Both the frontend and backend are shipped through GitHub Actions pipelines: every push to <code>main</code> triggers a build, runs the TypeScript compiler, and deploys automatically to Azure — keeping the whole workflow lean and fully automated.
      </p>
    </div>
  );
}

export default About