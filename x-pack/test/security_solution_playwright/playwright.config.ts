/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 60000,
  testDir: './tests/',
  testMatch: process.env.FILE_PATH || '**/*.spec.ts',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: [['list', { printSteps: true }]],
  use: {
    trace: 'on-first-retry',
    baseURL: process.env.KIBANA_URL,
    bypassCSP: true,
    actionTimeout: 60000,
    navigationTimeout: 60000,
    screenshot: 'only-on-failure',
    launchOptions: {
      args: ['--disable-web-security'],
    },
  },
  projects: [
    {
      name: 'login_ess',
      testMatch: '**/setup/login_ess.ts',
    },
    {
      name: 'login_serverless',
      testMatch: '**/setup/login_serverless.ts',
    },
    {
      name: 'ess',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['login_ess'],
    },
    {
      name: 'serverless',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['login_serverless'],
    },
  ],
});
