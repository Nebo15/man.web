import getFn from 'lodash/get';

export const isPropsChangedAndExist = (newProps, prevProps, paths = []) =>
  paths.every(i => !!getFn(newProps, i)) &&
  paths.some(i => getFn(newProps, i) !== getFn(prevProps, i));
