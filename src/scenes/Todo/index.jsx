/* @flow */
import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import TodoComponent from './components/Todo';
import type { Todo } from '../../data/Todo';
import * as selectors from './services';

const Container = styled.div`
  width: 100%;
  height: 500px;
  color: white;
`;

const Count = styled.h1`
  color: white;
`;

type Props = {
  count: number, // selector
  todos: Todo[], // selector
}

const TodoContainer = (props: Props) => (
  <Container>
    <Count>
      {props.count} Todos
    </Count>
    {props.todos.map(todo => (
      <TodoComponent
        todo={todo}
        onDelete={console.log}
      />
    ))}
  </Container>
);

export default connect(state => ({
  count: selectors.getTodosCount(state),
  todos: selectors.getTodos(state),
}))(TodoContainer);
