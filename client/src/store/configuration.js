import { BookingModeType } from '../constants';

/**
 * @internal
 */
const INITIAL_STATE = {
  foo: 'foo'
};

/**
 * Actions
 */
const UPDATE_CONFIGURATION_VALUE = 'UPDATE_CONFIGURATION_VALUE';

/**
 * Reducer
 */
export default function configuration(state = INITIAL_STATE, action) {
  switch(action.type) {
    case UPDATE_CONFIGURATION_VALUE: {
      const { fieldName, value } = action;

      return {
        ...state,
        [fieldName]: value
      };
    }
    default: {
      return state;
    }
  }
}

/**
 * Action creators
 */
export const updateConfigurationValue = (fieldName, value) => ({
  type: UPDATE_CONFIGURATION_VALUE,
  fieldName,
  value
});
