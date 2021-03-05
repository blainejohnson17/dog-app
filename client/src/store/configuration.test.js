import configuration, { updateConfigurationValue } from './configuration';
import { BookingModeType } from '../constants';

describe('configuration', () => {
  describe('reducer', () => {
    it('uses an initial state', () => {
      // Arrange
      const state = configuration(undefined, {});

      // Assert
      expect(state).toEqual({
        foo: 'foo'
      });
    });

    it('updates the foo value in state', () => {
      // Arrange
      const fieldName = 'foo';
      const value = 'fooo';

      const action = updateConfigurationValue(fieldName, value);

      // Act
      const state = configuration({}, action);

      // Assert
      expect(state[fieldName]).toEqual(value);
    });
  });
});
