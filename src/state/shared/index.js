import { createAction, handleActions } from "redux-actions";

export const sharedTypes = {
  CONG_VIEC_VUA_NHAN: "CONG_VIEC_VUA_NHAN",
  DA_NHAN_CONG_VIEC: "DA_NHAN_CONG_VIEC",
  PENDING: "PENDING",
  DONE: "DONE",
  CONNECTION_CHANGE: "CONNECTION_CHANGE"
};

const connectionChange = createAction(sharedTypes.CONNECTION_CHANGE);
const nhanCongViec = createAction(sharedTypes.CONG_VIEC_VUA_NHAN);
const daNhanCongViec = createAction(sharedTypes.DA_NHAN_CONG_VIEC);
const onDoneFetching = createAction(sharedTypes.DONE);
const onFetching = createAction(sharedTypes.PENDING);

export const sharedActions = {
  connectionChange,
  nhanCongViec,
  daNhanCongViec,
  onDoneFetching,
  onFetching
};

const initialState = {
  cong_viec: {
    id: null,
    id_thong_bao: null
  },
  isFetching: false,
  status: {
    internet: true
  }
};

export const sharedReducers = handleActions(
  {
    [sharedTypes.CONG_VIEC_VUA_NHAN]: (state, action) => ({
      ...state,
      cong_viec: {
        id: action.payload.id_cong_viec,
        id_thong_bao: action.payload.id_thong_bao
      }
    }),
    [sharedTypes.DA_NHAN_CONG_VIEC]: (state, action) => ({
      ...state,
      cong_viec: {
        ...initialState.cong_viec
      }
    }),
    [sharedTypes.PENDING]: (state, action) => ({
      ...state,
      isFetching: true
    }),
    [sharedTypes.DONE]: state => ({
      ...state,
      isFetching: false
    }),
    [sharedTypes.CONNECTION_CHANGE]: (state, action) => ({
      ...state,
      status: {
        internet: action.payload
      }
    })
  },
  initialState
);
