global.ENVIRONMENT = 'mock';
global.SERVICE_BASE_URL = 'https://mock-service-base.com/';
global.VIDEO_AUTH_BASE_URL = 'https://mock-auth-service-base.com/';
global.CONTENT_BASE_URL = 'https://mock-content-base.com/';
global.IS_DEVELOPMENT_MODE = 'true';
global.TOKEN_SERVICE_URL = 'https://mock-token-service.com/';

// Suppress act() warnings for components with useEffect/useState
global.console.error = () => null;

/**
 * Allows test execution to be 'paused' for an arbitrary
 * amount of time so async behaviors can complete.
 *
 * @example
 *
 *  await global.delay(500);
 */
global.delay = duration => new Promise(resolve => setTimeout(resolve, duration));

/**
 * Allows test execution to be 'paused' for a single tick.
 *
 * @example
 *
 *  await global.tick();
 */
global.tick = () => global.delay(0);
