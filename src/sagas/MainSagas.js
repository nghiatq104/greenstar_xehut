import moment from "moment";
import { showMessage } from "react-native-flash-message";
import { call, put, select, takeLatest } from "redux-saga/effects";
import * as APIs from "../services";
import { mainTypes, mainTypes as types } from "../state/main";
import { sharedTypes } from "../state/shared";
import * as NavigationService from "../utils/NavigationService";
import { handleError } from "../utils/http";

//TAO DON HANG
function* taoDonHangWorker(action) {
  try {
    yield put({ type: sharedTypes.PENDING });
    const {
      khach_hangs,
      danh_sach_xe,
      ngay_lam_viec,
      ca_lam_viec,
      gio_xuat_phat,
      ghi_chu,
      loai_hang_hoa,
      kl_du_kien,
      noi_luu_chua,
      noi_xa,
      don_dieu_phoi_id,
    } = action.payload;
    const payload = {
      ca_id: +ca_lam_viec.value,
      ngay: moment(ngay_lam_viec).format("YYYY-MM-DD"),
      xe_id: danh_sach_xe.id,
      khu_vuc_id: khach_hangs.khu_vuc_id,
      gio_xuat_phat: moment(gio_xuat_phat).format("HH:mm:ss"),
      khach_hang_id: [khach_hangs.id],
      loai_hang_hoa,
      khoi_luong_du_kien: parseInt(kl_du_kien),
      noi_luu_chua,
      noi_xa,
      ghi_chu,
      don_dieu_phoi_id,
    };

    yield call(APIs.taoDonHang, payload);
    const ngay_thuc_hien = yield select((state) => state.main.ngay_hien_tai);
    const res_2 = yield call(APIs.layDSDonHang, ngay_thuc_hien);
    yield put({
      type: mainTypes.LAY_DANH_SACH_DON_HANG_THANH_CONG,
      payload: res_2,
    });
    showMessage({
      message: "Điều phối xe thành công",
      type: "success",
      icon: { icon: "success", position: "left" },
    });
    NavigationService.navigate("DonHang");
  } catch (error) {
    if (!handleError(error)) {
      console.log(error, { ...error });

      showMessage({
        message: "Điều phối ko thành công",
        type: "danger",
        icon: { icon: "danger", position: "left" },
      });
    }
  } finally {
    yield put({ type: sharedTypes.DONE });
  }
}

export function* taoDonHangWatcher() {
  yield takeLatest(types.ADD_BILL, taoDonHangWorker);
}
//TAO DON HANG
function* capNhatDieuPhoiWorker(action) {
  try {
    yield put({ type: sharedTypes.PENDING });
    const {
      khach_hangs,
      danh_sach_xe,
      ngay_lam_viec,
      ca_lam_viec,
      gio_xuat_phat,
      ghi_chu,
      loai_hang_hoa,
      kl_du_kien,
      noi_luu_chua,
      noi_xa,
      don_dieu_phoi_id,
    } = action.payload.details;
    const payload = {
      ca_id: +ca_lam_viec.value,
      ngay: moment(ngay_lam_viec).format("YYYY-MM-DD"),
      xe_id: danh_sach_xe.id,
      khu_vuc_id: khach_hangs.khu_vuc_id,
      gio_xuat_phat: moment(gio_xuat_phat).format("HH:mm:ss"),
      khach_hang_id: [khach_hangs.id],
      loai_hang_hoa,
      khoi_luong_du_kien: parseInt(kl_du_kien),
      noi_luu_chua,
      noi_xa,
      ghi_chu,
      don_dieu_phoi_id,
    };

    yield call(APIs.suaLichXe, {
      details: payload,
      id: action.payload.id,
    });
    const ngay_thuc_hien = yield select((state) => state.main.ngay_hien_tai);
    const res_2 = yield call(APIs.layDSDonHang, ngay_thuc_hien);
    yield put({
      type: mainTypes.LAY_DANH_SACH_DON_HANG_THANH_CONG,
      payload: res_2,
    });
    showMessage({
      message: "Cập nhật điều phối xe thành công",
      type: "success",
      icon: { icon: "success", position: "left" },
    });
    NavigationService.navigate("DonHang");
  } catch (error) {
    if (!handleError(error)) {
      console.log(error, { ...error });

      showMessage({
        message: "Điều phối ko thành công",
        type: "danger",
        icon: { icon: "danger", position: "left" },
      });
    }
  } finally {
    yield put({ type: sharedTypes.DONE });
  }
}

export function* capNhatDieuPhoiWatcher() {
  yield takeLatest(types.UPDATE_BILL, capNhatDieuPhoiWorker);
}
//TAO DON HANG
function* xoaDieuPhoiWorker(action) {
  try {
    yield put({ type: sharedTypes.PENDING });

    yield call(APIs.xoaLichXe, action.payload);
    const ngay_thuc_hien = yield select((state) => state.main.ngay_hien_tai);
    const res_2 = yield call(APIs.layDSDonHang, ngay_thuc_hien);
    yield put({
      type: mainTypes.LAY_DANH_SACH_DON_HANG_THANH_CONG,
      payload: res_2,
    });
    showMessage({
      message: "Xoá điều phối xe thành công",
      type: "success",
      icon: { icon: "success", position: "left" },
    });
  } catch (error) {
    if (!handleError(error)) {
      console.log(error, { ...error });

      showMessage({
        message: "Xoá điều phối ko thành công",
        type: "danger",
        icon: { icon: "danger", position: "left" },
      });
    }
  } finally {
    yield put({ type: sharedTypes.DONE });
  }
}

export function* xoaDieuPhoiWatcher() {
  yield takeLatest(types.DELETE_BILL, xoaDieuPhoiWorker);
}

function* layDSDonHangWorker(action) {
  try {
    yield put({ type: sharedTypes.PENDING });
    const res = yield call(APIs.layDSDonHang, action.payload);
    yield put({
      type: mainTypes.LAY_DANH_SACH_DON_HANG_THANH_CONG,
      payload: res,
    });
  } catch (error) {
    if (!handleError(error)) {
    }
  } finally {
    yield put({ type: sharedTypes.DONE });
  }
}

export function* layDSDonHangWatcher() {
  yield takeLatest(types.LAY_DANH_SACH_DON_HANG, layDSDonHangWorker);
}

function* layDSThongBaoWorker(action) {
  try {
    yield put({ type: sharedTypes.PENDING });
    const res = yield call(APIs.layDSThongBao, action.payload);
    yield put({
      type: mainTypes.LAY_DANH_SACH_THONG_BAO_THANH_CONG,
      payload: res,
    });
  } catch (error) {
    if (!handleError(error)) {
    }
  } finally {
    yield put({ type: sharedTypes.DONE });
  }
}

export function* layDSThongBaoWatcher() {
  yield takeLatest(types.LAY_DANH_SACH_THONG_BAO, layDSThongBaoWorker);
}
