const DEV_ENDPOINT = "http://mtp.howizbiz.com";
const PROD_ENDPOINT = "https://mauxanhcuocsong.vn";
export const RELEASE_ENDPOINT = PROD_ENDPOINT;

const HOST_URL = RELEASE_ENDPOINT;

export const ENDPOINT = `${HOST_URL}/api/`;

export const route = {
  DANG_NHAP: "login",
  DOI_MAT_KHAU: "change_password",
  TOI: "me",
  CA_LAM_VIEC: "ca",
  KHACH_HANG: "khachhang",
  VAT_TU: "vattu",
  Xe: "danhsachxehut",
  CHAT_THAI: "chatthai",
  TAO_DON_HANG: "dieuphoixehut",
  XOA_LICH_XE: "donhang",
  DANH_SACH_DON_HANG: "dieuphoixehut",
  DANH_SACH_CONG_VIEC: "congviec2",
  THONG_TIN_CONG_VIEC: "congviec",
  DANH_SACH_THONG_BAO: "notifications",
  THONG_TIN_DIEU_PHOI: "information",
  THONG_TIN_DIEU_PHOI_CONG_VIEC: "informationcongviec",
  TAO_PHIEU_MUA_HANG: "phieumuahang",
  BAO_CAO_HOAN_THANH: "bao-cao-hoan-thanh",
  BAO_CAO_LICH_XE: "baocaolichxe",
  UPLOAD_ANH: "images/upload",
  BAO_BAN_THANG: "banthang",
  KHONG_BAO_BAN_THANG: "khongbanthang",
  DANH_GIA_SAN_PHAM: "danhgiasanpham",
  DANH_SACH_MAT_HANG: "hangban",
};
