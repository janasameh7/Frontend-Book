import { CanDeactivateFn } from '@angular/router';
import { CanComponentDeactivate } from '../models/can-component-deactivate.model';
export const unsavedChangesGuard: CanDeactivateFn<CanComponentDeactivate> = (component, currentRoute, currentState, nextState) => {

  return component.hasUnsavedChanges? window.confirm('Discard Changes?'): true;
};
