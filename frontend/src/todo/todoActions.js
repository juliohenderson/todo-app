import axios from 'axios';

const URL = 'http://localhost:3003/api/todos';

export const changeDescription = event => ({
  type: 'DESCRIPTION_CHANGED',
  payload: event.target.value
});

export const search = () => {
  return (dispatch, getState) => {
    const description = getState().todo.description;
    const search = description ? `&description__regex=/${description}/` : ''
    axios.get(`${URL}?sort=-createdAt${search}`)
      .then( resp => dispatch({ type: 'TODO_SEARCHED', payload: resp.data }) )
      
  }
  return {
    type: 'TODO_SEARCHED',
    payload: request
  };
};

export const add = description => {
  return dispatch => {
    axios.post(URL, { description })
      .then( resp => dispatch(clear()))
      .then( () => dispatch(search()))
  }
}

export const markAs = (todo, status) => {
  return dispatch => {
    axios.put(`${URL}/${todo._id}`, { ...todo, done: status })
      .then( () => dispatch(search()))
  }
}

export const remove = todo => {
  return dispatch => {
    axios.delete(`${URL}/${todo._id}`)
      .then( () => dispatch(search()))
  }
}

export const clear = () => {
  return [{
    type: 'TODO_CLEAR'
  }, search()]
}