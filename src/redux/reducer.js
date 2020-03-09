import {SET_MAM, SET_PHENOMENON, SAVE_TRACKS_DATA, SET_CELL_SIZE} from './actions';

const initialState = {
  MAM: 'avg',
  phenomenon: 'speed',
  tracks: [],
  cellSize: 50
}

export default function(state = initialState, action){
  const {payload, type} = action;

  switch(type){
    case SET_MAM: return {...state, MAM: payload};
    case SET_PHENOMENON:  return {...state, phenomenon: payload};
    case SAVE_TRACKS_DATA: return {...state, tracks: [...payload]};
    case SET_CELL_SIZE: return {...state, cellSize: payload}
    default: return state;
  }
}