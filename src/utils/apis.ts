import axios from 'axios';
import { Combines } from 'helpers';

/**
 * responsible for creating the instance of axios in order to make requests to some API
 */

const example = (baseUrl: string, params: object) => axios.create({
  baseURL: Combines.interpolate(baseUrl, params),
});

export {
  example,
}