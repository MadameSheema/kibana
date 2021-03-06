/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { Location } from 'history';
import React from 'react';
import { getRenderedHref } from '../../../utils/testHelpers';
import { InfraLink } from './InfraLink';
import * as kibanaCore from '../../../../../observability/public/context/kibana_core';
import { LegacyCoreStart } from 'src/core/public';

const coreMock = ({
  http: {
    basePath: {
      prepend: (path: string) => `/basepath${path}`
    }
  }
} as unknown) as LegacyCoreStart;

jest.spyOn(kibanaCore, 'useKibanaCore').mockReturnValue(coreMock);

test('InfraLink produces the correct URL', async () => {
  const href = await getRenderedHref(
    () => <InfraLink path="/some/path" query={{ time: 1554687198 }} />,
    {
      search: '?rangeFrom=now-5h&rangeTo=now-2h'
    } as Location
  );

  expect(href).toMatchInlineSnapshot(
    `"/basepath/app/infra#/some/path?time=1554687198"`
  );
});
