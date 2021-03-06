/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { Storage } from '../../../../../../src/plugins/kibana_utils/public';
import { LOCALSTORAGE_CLIPBOARD } from '../../common/lib/constants';
import { getWindow } from './get_window';

const storage = new Storage(getWindow().localStorage);
export const setClipboardData = data => storage.set(LOCALSTORAGE_CLIPBOARD, JSON.stringify(data));
export const getClipboardData = () => storage.get(LOCALSTORAGE_CLIPBOARD);
