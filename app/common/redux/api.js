import { CALL_API } from 'redux-api-middleware';
import { getToken } from 'reducers';

export const invoke = (config, { auth = true } = {}) => (dispatch, getState) => {
  const state = getState();
  const result = {
    ...config,
  };

  result.headers = {
    'content-type': 'application/json',
    pragma: 'no-cache',
    'cache-control': 'no-cache',
    ...result.headers,
  };

  if (typeof result.body !== 'string') {
    result.body = JSON.stringify(result.body);
  }
  if (auth) {
    const token = getToken(state);
    result.headers = {
      token,
      ...result.headers,
    };
  }
  return dispatch({
    [CALL_API]: result,
  });
};
