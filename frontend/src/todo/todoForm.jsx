import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Grid from '../template/grid';
import IconButton from '../template/iconButton';
import { changeDescription, search, add, clear } from './todoActions';

class TodoForm extends Component {
  constructor(props){
    super(props);
    this.KeyHandler = this.KeyHandler.bind(this)
  }

  KeyHandler(e) {
    const { search, add, description, clear } = this.props
    if (e.key === 'Enter') {
      e.shiftKey ? search() : add(description);
    }
    else if (e.key === 'Escape') {
      clear();
    }
  }

  componentWillMount(){
    this.props.search();
  }

  render() {
    const { search, add, description, clear } = this.props

    return (
      <div role="form" className="todoForm" >
        <Grid cols="12 9 10">
          <input id="description" className="form-control" placeholder="Adicione uma tarega"
            onKeyUp={this.KeyHandler}
            onChange={this.props.changeDescription}
            value={this.props.description} 
          />
        </Grid>
        <Grid cols="12 3 2">
          <IconButton style="primary" icon="plus" onClick={() => add(description)} />
          <IconButton style="info" icon="search" onClick={search} />
          <IconButton style="default" icon="close" onClick={clear} />
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({ description: state.todo.description });
const mapDispatchToProps = dispatch => bindActionCreators({ changeDescription, search, add, clear }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm);