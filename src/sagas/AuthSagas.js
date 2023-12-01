import { takeLatest, put, select, call, all } from "redux-saga/effects";
import { authTypes as types } from "../state/authentication";
import { NavigationActions } from "react-navigation";
import { sharedTypes } from "../state/shared";
import * as NavigationService from "../utils/NavigationService";
import * as OneSignalService from "../utils/OneSignalService";
import * as APIs from "../services";
import { mainTypes } from "../state/main";
import { showMessage } from "react-native-flash-message";
import { storeT, handleError } from "../utils/http";
import moment from "moment";

function* splashScreen() {
  const userToken = yield call(storeT.getToken);
  if (userToken)
    try {
      const ngay_thuc_hien = yield select((state) => state.main.ngay_hien_tai);
      const [profile, khach_hang, xe, ca, don_hang, thong_bao] = yield all([
        call(APIs.toi),
        call(APIs.layDSKhachHang),
        call(APIs.layDSXe),
        call(APIs.layCaLamViec),
        call(APIs.layDSDonHang, ngay_thuc_hien),
        call(APIs.layDSThongBao),
      ]);
      OneSignalService.sendTag("user_id", profile.id);
      OneSignalService.sendTag("user_type", "xe_hut");
      yield put({
        type: mainTypes.LAY_DU_LIEU_FORM_SC,
        payload: {
          khach_hang,
          xe,
          ca,
        },
      });
      yield put({
        type: types.LOGIN_SUCCESS,
        payload: profile,
      });
      yield put({
        type: mainTypes.LAY_DANH_SACH_DON_HANG_THANH_CONG,
        payload: don_hang,
      });
      yield put({
        type: mainTypes.LAY_DANH_SACH_THONG_BAO_THANH_CONG,
        payload: thong_bao,
      });
      if (profile && profile.role_id == 2) {
        NavigationService.navigate("AdminTab");
      } else {
        NavigationService.navigate("MainTab");
      }
    } catch (error) {
      handleError(error);
      storeT.removeToken();
      NavigationService.navigate("Auth");
    }
  else {
    NavigationService.navigate("Auth");
  }
}

export function* splashScreenWatcher() {
  yield takeLatest(types.SPLASH_SCREEN, splashScreen);
}

function* authenticationWorker(action) {
  try {
    yield put({ type: sharedTypes.PENDING });
    yield call(APIs.dangnhap, action.payload);
    const ngay_thuc_hien = yield select((state) => state.main.ngay_hien_tai);
    const [profile, khach_hang, xe, ca, don_hang, thong_bao] = yield all([
      call(APIs.toi),
      call(APIs.layDSKhachHang),
      call(APIs.layDSXe),
      call(APIs.layCaLamViec),
      call(APIs.layDSDonHang, ngay_thuc_hien),
      call(APIs.layDSThongBao),
    ]);
    OneSignalService.sendTag("user_id", profile.id);
    OneSignalService.sendTag("user_type", "xe_hut");
    yield put({
      type: mainTypes.LAY_DU_LIEU_FORM_SC,
      payload: {
        khach_hang,
        xe,
        ca,
      },
    });
    yield put({
      type: types.LOGIN_SUCCESS,
      payload: profile,
    });
    yield put({
      type: mainTypes.LAY_DANH_SACH_DON_HANG_THANH_CONG,
      payload: don_hang,
    });
    yield put({
      type: mainTypes.LAY_DANH_SACH_THONG_BAO_THANH_CONG,
      payload: thong_bao,
    });
    if (profile && profile.role_id == 2) {
      NavigationService.navigate("AdminTab");
    } else {
      NavigationService.navigate("MainTab");
    }
  } catch (error) {
    if (!handleError(error)) console.log({ ...error });

    showMessage({
      message: "Đăng nhập thất bại",
      type: "danger",
      icon: { icon: "danger", position: "left" },
    });
  } finally {
    yield put({ type: sharedTypes.DONE });
  }
}

export function* authenticationWatcher() {
  yield takeLatest(types.LOGIN, authenticationWorker);
}

function* logoutWorker(_action) {
  // NavigationService.navigate("LoginScreen");
  yield call(storeT.removeToken);
  OneSignalService.sendTag("user_id", "");
}

export function* logoutWatcher() {
  yield takeLatest(types.LOGOUT, logoutWorker);
}
function* doiMatKhauWorker(action) {
  try {
    yield put({ type: sharedTypes.PENDING });
    const res = yield call(APIs.doiMatKhau, action.payload);
    console.log(res);
    const { token } = res.result;
    storeT.setToken(token);
    showMessage({
      message: "Đổi mật khẩu thành công",
      type: "success",
      icon: { icon: "success", position: "left" },
    });
    NavigationService.navigate("TaiKhoan");
  } catch (error) {
    if (!handleError(error))
      if (error.response) {
        showMessage({
          message: error.response.data.message,
          type: "danger",
          icon: { icon: "danger", position: "left" },
        });
      }
  } finally {
    yield put({ type: sharedTypes.DONE });
  }
}

export function* doiMatKhauWatcher() {
  yield takeLatest(types.DOI_MAT_KHAU, doiMatKhauWorker);
}
