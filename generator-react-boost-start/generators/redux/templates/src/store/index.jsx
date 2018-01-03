import { createStore } from 'redux';

import reducer from 'src/reducers';


function configureStore() {
  const store = createStore(reducer);

  return { store };
}

export default configureStore;
