import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Lab } from 'playground-api/types';
import { loadLabsSuccess } from '../actions/labs.actions';

export const labsAdapter: EntityAdapter<Lab> = createEntityAdapter<Lab>();

export const labsFeatureKey = 'labs';

export interface State extends EntityState<Lab> {

}

export const initialState: State = labsAdapter.getInitialState();

export const reducer = createReducer(
  initialState,
  on(loadLabsSuccess, (state, {labs}) => labsAdapter.setAll(labs, state)),
);

