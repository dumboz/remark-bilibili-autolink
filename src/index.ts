import transform, { IOptions } from './transform';

const defaultSettings: IOptions = {
  video: true,
  article: true,
};

const attacher = (options: IOptions) => {
  return transform(Object.assign({}, defaultSettings, options));
};

export default attacher;
