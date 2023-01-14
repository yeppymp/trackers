import dotenv from 'dotenv';
import { createTerminus, TerminusOptions } from '@godaddy/terminus';

import app from './app';
import logger from './libraries/Logger';

dotenv.config();

const { HOST, PORT } = process.env;

const applicationHost: string = HOST || 'localhost';
const applicationPort: number = Number(<string>PORT) || 7000;

const onSignal = () => {
  logger.info('server is starting cleanup');

  return Promise.resolve();
};

const onShutdown = () => {
  logger.info('cleanup finished, server is shutting down');

  return Promise.resolve();
};

const onHealthCheck = ({ state }: { state: { isShuttingDown: boolean } }) => {
  if (state.isShuttingDown) {
    logger.info('healthcheck: server is shutting down');
  } else {
    logger.info('healthcheck: OK');
  }

  return Promise.resolve();
};

const beforeShutdown = () =>
  new Promise((resolve) => setTimeout(resolve, 5000));

const service = app.listen(applicationPort, applicationHost, () =>
  logger.info(`Server running on ${applicationHost}:${applicationPort}`),
);

const terminusOption: TerminusOptions = {
  signal: 'SIGINT',
  healthChecks: {
    '/healthcheck': onHealthCheck,
  },
  timeout: 1000,
  beforeShutdown,
  useExit0: true,
  onSignal,
  onShutdown,
};

createTerminus(service, terminusOption);
