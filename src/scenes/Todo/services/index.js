/* @flow */
import R from 'ramda';

import type { Todo } from '../../../data/Todo';
import type { Action } from './actions';
import * as actions from './actions';

export type TodoState = {
  loading: boolean,
  todos: Todo[],
};

const initialState = {
  loading: false,
  todos: [],
};

function todoReducer(state: TodoState = initialState, action: Action) {
  switch (action.type) {
    case actions.GET:
    case actions.CREATE:
    case actions.EDIT:
    case actions.DELETE:
      return R.assoc('loading', true, state);

    case actions.GET_SUCCESS:
      return R.compose(
        R.assoc('todos', action.payload.data),
        R.assoc('loading', false),
      )(state);

    case actions.CREATE_SUCCESS:
      return R.compose(
        R.over(R.lensProp('todos'), R.append(action.payload)),
        R.assoc('loading', false),
      )(state);

    case actions.EDIT_SUCCESS:
      return R.compose(
        R.over(R.lensProp('todos'), R.map((todo) => {
          if (todo.id === action.payload.id) {
            return action.payload;
          }

          return todo;
        })),
        R.assoc('loading', false),
      )(state);

    case actions.DELETE_SUCCESS:
      return R.compose(
        R.over(R.lensProp('todos'), R.filter(todo => todo.id !== action.payload.id)),
        R.assoc('loading', false),
      )(state);

    default:
      return state;
  }
}

export default todoReducer;

const getState = state => state.todos;

// TODO other selectors
