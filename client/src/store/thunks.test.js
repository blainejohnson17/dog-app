// import configureMockStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
// import noop from 'lodash.noop';
// import Services from '../Services';
// import {} from './thunks';
// import appReducer from './appReducer';


// jest.mock('../Services', () => ({
//   foo: jest.fn(),
//   bar: jest.fn()
// }));

/**
 * Creates a mock store instance using an initial state.
 *
 * @see redux-mock-store
 */
// const createMockStore = configureMockStore([ thunk ]);

/**
 * Creates and returns a getState() function for usage with
 * redux-mock-store. That function will take all actions
 * dispatched to the mock store and fast-forward the initial
 * state to the proper updated state, one action at a time.
 *
 * This allows getState() calls within thunks to reflect
 * the proper updated state after action dispatches, rather
 * than only the initial state.
 *
 * @param {object} initialState
 * @returns {object}
 *
 * @internal
 */
// const createInitialState = initialState => actions => actions.reduce(appReducer, initialState);

describe('thunks', () => {
  afterEach(() => {
    Services.foo.mockReset();
    Services.bar.mockReset();
  });
});
