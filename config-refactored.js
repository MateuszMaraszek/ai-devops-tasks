const DEFAULT_CONFIG = {
  apiUrl: 'http://localhost:3000/api',
  debug: true,
  timeout: 5000
};

const ENVIRONMENT_CONFIGS = {
  development: {
    ...DEFAULT_CONFIG
  },
  testing: {
    ...DEFAULT_CONFIG,
    apiUrl: 'http://test-server:3000/api'
  },
  staging: {
    apiUrl: 'https://staging.example.com/api',
    debug: false,
    timeout: 10000
  },
  production: {
    apiUrl: 'https://api.example.com',
    debug: false,
    timeout: 15000
  }
};

function getEnvironmentConfig(env) {
  return ENVIRONMENT_CONFIGS[env] || DEFAULT_CONFIG;
}

module.exports = {
  getEnvironmentConfig,
  DEFAULT_CONFIG,
  ENVIRONMENT_CONFIGS
}; 