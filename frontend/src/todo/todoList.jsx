import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import IconButtom from '../template/iconButton';
import { markAs, remove } from './todoActions';

const TodoList = props => {

  const renderRows = () => {
    const list = props.list || [];
    return (
      list.map(todo => (
        <tr key={todo._id}>
          <td className={todo.done ? 'markedAsDone' : ''} >{todo.description}</td>
          <td>
            <IconButtom style="success" icon="check" onClick={() => props.markAs(todo, true)} hide={todo.done} />
            <IconButtom style="warning" icon="undo" onClick={() => props.markAs(todo, false)} hide={!todo.done} />
            <IconButtom style="danger" icon="trash-o" onClick={() => props.remove(todo)} hide={!todo.done} />
          </td>
        </tr>
      ))
    );
  };
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Descrição</th>
          <th className="tableActions">Ações</th>
        </tr>
      </thead>
      <tbody>
        {renderRows()}
      </tbody>
    </table>
  );
};

const mapStateToProps = state => ({ list: state.todo.list });
const mapDispatchToProps = dispatch => bindActionCreators({ markAs, remove }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);