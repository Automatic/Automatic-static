import path from 'path';
import { spawn } from 'child_process';

import Rx from 'rx';

import config from '../../config.js';

const root = path.resolve(__dirname, '../..');
const bins = path.resolve(root, 'node_modules/.bin');

function spawnChildProcess(command) {
  function pipeChildProcessStdio(childProcess) {
    childProcess.stdout.on('data', (data) => (process.stdout.write(data)));
    childProcess.stderr.on('data', (data) => (process.stderr.write(data)));
  }

  function killChildProcessOnExit(childProcess) {
    process.on('exit', () => {
      if (typeof childProcess.kill === 'function') {
        childProcess.kill();
      }
    });
  }

  function createChildProcessStdioStreams(childProcess) {
    const stdoutStream$ = Rx.Observable.create((observer) => {
      childProcess.stdout.on('data', (data) => (observer.onNext(data)));
    });
    const stderrStream$ = Rx.Observable.create((observer) => {
      childProcess.stderr.on('data', (data) => (observer.onNext(data)));
    });
    return [stdoutStream$, stderrStream$];
  }

  const [bin, ...args] = command.split(' ');
  const childProcess = spawn(bin, args, { cwd: root, env: process.env });
  pipeChildProcessStdio(childProcess);
  killChildProcessOnExit(childProcess);
  const [stdoutStream$, stderrStream$] = createChildProcessStdioStreams(childProcess);
  return [childProcess, stdoutStream$, stderrStream$];
}

function spawnHttpServer() {
  const httpServer = path.resolve(bins, 'http-server');
  let command = `${httpServer} dist -p ${config.DEV_PORT} -a ${config.DEV_HOST} -c 0`;
  command = config.IS_LOCAL ? `${command} -o` : command;  // open browser on start
  return spawnChildProcess(command);
}

function spawnWebpackDevServer() {
  const webpackDevServer = path.resolve(bins, 'webpack-dev-server');
  const command = `${webpackDevServer} --hot --inline`;
  return spawnChildProcess(command);
}

function spawnGulpWatch() {
  const gulp = path.resolve(bins, 'gulp');
  const command = `${gulp} watch`;
  return spawnChildProcess(command);
}

export function runServe() {
  try {
    spawnHttpServer();
  } catch (err) {
    console.error(err);
  }
}

export function runWatch() {
  (async () => {
    try {
      const webpackStdout$ = spawnWebpackDevServer()[1];
      const webpackBundleReady = webpackStdout$
        .filter(data => data.toString().includes('bundle is now VALID'))
        .first()
        .toPromise();
      await webpackBundleReady;

      const gulpStdout$ = spawnGulpWatch()[1];
      const gulpWatchReady = gulpStdout$
        .filter(data => data.toString().includes('Starting \'parallel\''))
        .first()
        .toPromise();
      await gulpWatchReady;

      spawnHttpServer();
    } catch (err) {
      console.error(err);
    }
  })();
}
