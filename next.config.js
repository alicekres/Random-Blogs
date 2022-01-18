const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
  const images = {
    domains: ['images.unsplash.com', 'https://images.unsplash.com'],
  };

  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: '******',
        password: '******',
        mongodb_clustername: 'cluster0',
        mongodb_database: '******',
      },
      images: images,
    };
  }
  return {
    env: {
      mongodb_username: '******',
      password: '******',
      mongodb_clustername: 'cluster0',
      mongodb_database: '******',
    },
    images: images,
  };
};
