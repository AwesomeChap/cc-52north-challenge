export const SET_MAM = 'set min / avg / max';
export const SET_PHENOMENON = 'set phenomenon';
export const SAVE_TRACKS_DATA = 'save tracks data';
export const SET_CELL_SIZE = 'set cell size';

export const setMAM = (MAM) => ({
  type: SET_MAM,
  payload: MAM
});

export const setPhenomenon = (phenomenon) => ({
  type: SET_PHENOMENON,
  payload: phenomenon
})

export const saveTracksData = (tracks) => ({
  type: SAVE_TRACKS_DATA,
  payload: tracks
})

export const setCellSize = (cellSize) => ({
  type: SET_CELL_SIZE,
  payload: cellSize
})