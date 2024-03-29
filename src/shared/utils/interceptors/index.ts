import { axiosInstance, axiosInstanceToken } from './axios';
import graph from './ms-graph-interceptor';

const { msalInstance } = graph;

export {
  axiosInstance,
  axiosInstanceToken,
  graph,
  msalInstance,
};
