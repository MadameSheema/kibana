/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { test } from '../../fixtures/saml';

export const authFile = '.auth/user.json';

test('login', { tag: '@ess' }, async ({ request }) => {
  await request.post(`${process.env.KIBANA_URL}/internal/security/login`, {
    headers: {
      'kbn-xsrf': 'cypress-creds',
      'x-elastic-internal-origin': 'security-solution',
      'elastic-api-version': '2023-10-31',
    },
    data: {
      providerType: 'basic',
      providerName: 'basic',
      currentURL: '/',
      params: {
        username: process.env.ELASTICSEARCH_USERNAME,
        password: process.env.ELASTICSEARCH_PASSWORD,
      },
    },
  });

  await request.storageState({ path: authFile });
});
