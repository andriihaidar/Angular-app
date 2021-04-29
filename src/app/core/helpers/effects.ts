import { createAction, props } from '@ngrx/store';
import { Props, NotAllowedCheck } from '@ngrx/store/src/models';

interface ActionTypes {
  REQUEST: string;
  SUCCESS: string;
  FAILURE: string;
}

interface ApiActionProps<R extends object, S extends object, F extends object> {
  request?: Props<R> & NotAllowedCheck<R>,
  success?: Props<S> & NotAllowedCheck<S>,
  failure?: Props<F> & NotAllowedCheck<F>
}

export const createActionType = (name: string) => ({
  REQUEST: `${name} REQUEST`,
  SUCCESS: `${name} SUCCESS`,
  FAILURE: `${name} FAILURE`,
});

export const createApiAction = <R extends object, S extends object, F extends object>(
  name: ActionTypes,
  apiActionProps: ApiActionProps<R, S, F> = {}
) => ({
  request: createAction(name.REQUEST, apiActionProps.request),
  success: createAction(name.SUCCESS, apiActionProps.success),
  failure: createAction(name.FAILURE, props<{ error: string }>())
});
