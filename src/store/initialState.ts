import { IStoreState, IBanner } from 'src/types';

const initialState: IStoreState = {
  router: {},
  tiles: [],
  banner: {} as IBanner,
  loading: true,
  forms: []
};

export default initialState;
