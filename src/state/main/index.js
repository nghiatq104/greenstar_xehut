import * as _ from "lodash";
import moment from "moment";
import { createAction, handleActions } from "redux-actions";
import { transformKhachHang } from "../../utils/transforms";
import { authTypes } from "../authentication";

export const mainTypes = {
  ADD_BILL: "ADD_BILL",
  ADD_BILL_SUCCESS: "ADD_BILL_SUCCESS",
  UPDATE_BILL: "UPDATE_BILL",
  DELETE_BILL: "DELETE_BILL",
  SUA_LICH_XE: "SUA_LICH_XE",
  SUA_LICH_XE_THANH_CONG: "SUA_LICH_XE_THANH_CONG",
  XOA_LICH_XE: "XOA_LICH_XE",
  XOA_LICH_XE_THANH_CONG: "XOA_LICH_XE_THANH_CONG",
  ADD_WORK: "ADD_WORK",
  ADD_WORK_SUCCESS: "ADD_WORK_SUCCESS",
  UPDATE_WORK: "UPDATE_WORK",
  UPDATE_WORK_SUCCESS: "UPDATE_WORK_SUCCESS",
  THEM_CTY: "THEM_CTY",
  THEM_CHI_TIET: "THEM_CHI_TIET",
  THEM_DUNG_CU: "THEM_DUNG_CU",
  THEM_CONG_VIEC: "THEM_CONG_VIEC",
  CHON_XE: "CHON_XE",
  CHI_TIET_CHAT_THAI: "CHI_TIET_CHAT_THAI",
  LAY_DU_LIEU_FORM: "LAY_DU_LIEU_FORM",
  LAY_DU_LIEU_FORM_SC: "LAY_DU_LIEU_FORM_SC",
  LAY_DANH_SACH_DON_HANG: "LAY_DANH_SACH_DON_HANG",
  LAY_DANH_SACH_DON_HANG_THANH_CONG: "LAY_DANH_SACH_DON_HANG_THANH_CONG",
  LAY_DANH_SACH_CHAT_THAI: "LAY_DANH_SACH_CHAT_THAI",
  LAY_DANH_SACH_CHAT_THAI_THANH_CONG: "LAY_DANH_SACH_CHAT_THAI_THANH_CONG",
  DOC_THONG_BAO_THANH_CONG: "DOC_THONG_BAO_THANH_CONG",
  CAP_NHAT_NGAY_HIEN_TAI: "CAP_NHAT_NGAY_HIEN_TAI",
  CAP_NHAT_CA_HIEN_TAI: "CAP_NHAT_CA_HIEN_TAI",
  LAY_DANH_SACH_MAT_HANG: "LAY_DANH_SACH_MAT_HANG",
  LAY_DANH_SACH_THONG_BAO: "LAY_DANH_SACH_THONG_BAO",
  LAY_DANH_SACH_THONG_BAO_THANH_CONG: "LAY_DANH_SACH_THONG_BAO_THANH_CONG",
  DOC_THONG_BAO: "DOC_THONG_BAO",
  DOC_THONG_BAO_THANH_CONG: "DOC_THONG_BAO_THANH_CONG",
};

const taoDonHang = createAction(mainTypes.ADD_BILL);
const suaDonHang = createAction(mainTypes.UPDATE_BILL);
const xoaDieuPhoi = createAction(mainTypes.DELETE_BILL);
const addWork = createAction(mainTypes.ADD_WORK);
const chiTietChatThai = createAction(mainTypes.CHI_TIET_CHAT_THAI);
const layDuLieuForm = createAction(mainTypes.LAY_DU_LIEU_FORM);
const layDSDonHang = createAction(mainTypes.LAY_DANH_SACH_DON_HANG);
const layDSChatThai = createAction(mainTypes.LAY_DANH_SACH_CHAT_THAI);
const capNhatNgayHienTai = createAction(mainTypes.CAP_NHAT_NGAY_HIEN_TAI);
const capNhatCaHienTai = createAction(mainTypes.CAP_NHAT_CA_HIEN_TAI);
const layDSThongBao = createAction(mainTypes.LAY_DANH_SACH_THONG_BAO);
const docThongBao = createAction(mainTypes.DOC_THONG_BAO);

export const mainActions = {
  taoDonHang,
  addWork,
  chiTietChatThai,
  layDuLieuForm,
  layDSDonHang,
  layDSChatThai,
  capNhatNgayHienTai,
  capNhatCaHienTai,
  suaDonHang,
  xoaDieuPhoi,
  layDSThongBao,
  docThongBao,
};

const initialState = {
  form_data: {
    khach_hang: [],
    khach_hang_indexed: [],
    vat_tu: [],
    xe: [],
    chat_thai: [],
    chat_thai_indexed: [],
    ca: [],
  },
  danh_sach_don_hang: [],
  ngay_hien_tai: moment().format("YYYY-MM-DD"),
  ngay_hien_tai_cong_viec: moment().format("YYYY-MM-DD"),
  ca_hien_tai: moment().isSameOrBefore(moment("13:58:05", "HH:mm:ss")) ? 1 : 2,
  danh_sach_thong_bao: [],
  chi_tiet_thong_bao: {
    so_thong_bao_chua_doc: 0,
  },
};

export const mainReducers = handleActions(
  {
    [authTypes.LOGOUT]: (state, action) => {
      return {
        ...initialState,
      };
    },
    [mainTypes.LAY_DANH_SACH_THONG_BAO_THANH_CONG]: (state, action) => {
      let count = 0;
      let newData = [];
      action.payload.map((el) => {
        if (el.type === "xe_hut") {
          if (!el.read_at) {
            count = count + 1;
          }
          newData.push(el);
        }
      });
      return {
        ...state,
        danh_sach_thong_bao: newData,
        chi_tiet_thong_bao: {
          so_thong_bao_chua_doc: count,
        },
      };
    },
    [mainTypes.DOC_THONG_BAO_THANH_CONG]: (state, action) => {
      if (action.payload) {
        const { danh_sach_thong_bao } = state;
        const idx = _.findIndex(
          danh_sach_thong_bao,
          (e) => e.id == action.payload
        );
        if (idx == 0 || idx)
          danh_sach_thong_bao[idx].read_at = moment().format(
            "YYYY-MM-DD HH:mm:ss"
          );
      }
      return {
        ...state,
        danh_sach_thong_bao: [...state.danh_sach_thong_bao],
      };
    },
    [mainTypes.LAY_LICH_SU_DANH_GIA_THANH_CONG]: (state, action) => {
      return {
        ...state,
        lich_su_danh_gia: action.payload,
      };
    },
    [mainTypes.LAY_DU_LIEU_FORM_SC]: (state, action) => {
      const { khach_hang, vat_tu, xe, ...rest } = action.payload;
      return {
        ...state,
        form_data: {
          ...state.form_data,
          ...rest,
          vat_tu: _.filter(vat_tu, ["active", true]),
          xe: _.filter(xe, ["active", true]).map((el) => ({
            ...el,
            label: `${el.bien_kiem_soat} - ${el.lai_xe.ten} - ${
              el.dong_xe.gia_tri
            } khối`,
            value: el.id,
          })),
          khach_hang: transformKhachHang(khach_hang),
        },
      };
    },
    [mainTypes.LAY_DANH_SACH_DON_HANG_THANH_CONG]: (state, action) => {
      return {
        ...state,
        danh_sach_don_hang: action.payload.reverse(),
      };
    },
    [mainTypes.LAY_BAO_CAO]: (state, action) => {
      return {
        ...state,
        danh_sach_don_hang: action.payload.reverse(),
      };
    },

    [mainTypes.CAP_NHAT_NGAY_HIEN_TAI]: (state, action) => {
      return {
        ...state,
        ngay_hien_tai: action.payload,
      };
    },
    [mainTypes.CAP_NHAT_CA_HIEN_TAI]: (state, action) => {
      return {
        ...state,
        ca_hien_tai: action.payload,
      };
    },
    [mainTypes.LAY_DANH_SACH_CHAT_THAI]: (state, action) => {
      return {
        ...state,
        form_data: {
          ...state.form_data,
          chat_thai: initialState.form_data.chat_thai,
        },
      };
    },
    [mainTypes.LAY_DANH_SACH_CHAT_THAI_THANH_CONG]: (state, action) => {
      return {
        ...state,
        form_data: {
          ...state.form_data,
          chat_thai: action.payload,
        },
      };
    },
  },
  initialState
);
