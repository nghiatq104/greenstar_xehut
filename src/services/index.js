import {ENDPOINT, route, RELEASE_ENDPOINT} from '../constants/url';
import http, {storeT} from '../utils/http';
import {generateUUID} from '../utils';
import moment from 'moment';

export const login = async (UserData) => {
  try {
    const response = await http.post(route.LOGIN, UserData);
    return response.data;
  } catch (error) {
    console.log({...error});
    return Promise.reject(error);
  }
};

export const layDSKhachHang = async () => {
  try {
    const res = await http.get(route.KHACH_HANG);
    return res.data.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
export const layDSVatTu = async () => {
  try {
    const res = await http.get(route.VAT_TU);
    return res.data.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
export const layDSXe = async () => {
  try {
    const res = await http.get(route.Xe);
    return res.data.result;
  } catch (error) {
    return Promise.reject(error);
  }
};
export const layDSChatThai = async (id_khach_hang) => {
  try {
    const res = await http.get(`${route.CHAT_THAI}/${id_khach_hang}`);
    return res.data.data;
  } catch (error) {
    return Promise.resolve([]);
  }
};
export const dangnhap = async (user_data) => {
  try {
    const res = await http.post(route.DANG_NHAP, {
      ...user_data,
      role: 'manager',
    });
    const {token} = res.data.result;
    storeT.setToken(token);
    return 1;
  } catch (error) {
    return Promise.reject(error);
  }
};
export const layCaLamViec = async () => {
  try {
    const res = await http.get(route.CA_LAM_VIEC);
    return res.data.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
export const toi = async () => {
  try {
    const res = await http.get(route.TOI);
    return res.data.result;
  } catch (error) {
    return Promise.reject(error);
  }
};
//TAO LICH XE
export const taoDonHang = async (data) => {
  try {
    const res = await http.post(route.TAO_DON_HANG, data);
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
//SUA LICH XE
export const suaLichXe = async ({id, details}) => {
  try {
    const res = await http.put(`${route.TAO_DON_HANG}/${id}`, details);
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
//XOA LICH XE
export const xoaLichXe = async (id) => {
  try {
    const res = await http.delete(`${route.TAO_DON_HANG}/${id}`);

    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
export const layDSDonHang = async (date) => {
  try {
    const res = await http.get(
      `${route.DANH_SACH_DON_HANG}?ngay[]=${date}&ngay[]=${date}`,
    );
    return res.data.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
export const layDSCongViec = async (date) => {
  try {
    const res = await http.get(
      `${route.DANH_SACH_CONG_VIEC}?date=${
        date ? date : moment().format('DD/MM/YYYY')
      }`,
    );
    return res.data.result;
  } catch (error) {
    return Promise.reject(error);
  }
};
export const layDSThongBao = async () => {
  try {
    const res = await http.get(route.DANH_SACH_THONG_BAO);
    return res.data.result;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const docThongBao = async (idx) => {
  try {
    const res = await http.get(`${route.DANH_SACH_THONG_BAO}/${idx}/read`);
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const layTTCongViec = async (idx) => {
  try {
    const res = await http.get(`${route.THONG_TIN_CONG_VIEC}/${idx}`);
    return res.data.result;
  } catch (error) {
    return Promise.reject(error);
  }
};

const initTT = {
  don_dat_hang: 0,
  don_dieu_phoi: 0,
  cong_nhan: 0,
  thoi_vu: 0,
  xe: 0,
  yeu_cau_xe: 0,
  yeu_cau_cong_nhan: 0,
  yeu_cau_thoi_vu: 0,
};

export const layTTDieuPhoi = async ({date, ca_id}) => {
  try {
    const res = await http.get(
      `${route.THONG_TIN_DIEU_PHOI}?ca=${ca_id}&ngay=${moment(date).format(
        'YYYY-MM-DD',
      )}`,
    );
    return {...initTT, ...res.data.result};
  } catch (error) {
    console.log({...error});

    return Promise.resolve({
      don_dat_hang: 0,
      don_dieu_phoi: 0,
      cong_nhan: 0,
      thoi_vu: 0,
      xe: 0,
      yeu_cau_xe: 0,
      yeu_cau_cong_nhan: 0,
      yeu_cau_thoi_vu: 0,
    });
  }
};

const initTTCV = {
  don_dat_hang: 0,
  don_dieu_phoi: 0,
  cong_nhan: 0,
  thoi_vu: 0,
  xe: 0,
  yeu_cau_xe: 0,
  yeu_cau_cong_nhan: 0,
  yeu_cau_thoi_vu: 0,
};

export const layTTDieuPhoiCongViec = async ({date, ca_id}) => {
  try {
    const res = await http.get(
      `${route.THONG_TIN_DIEU_PHOI_CONG_VIEC}?ca=${ca_id}&ngay=${moment(
        date,
      ).format('YYYY-MM-DD')}`,
    );
    return {...initTTCV, ...res.data.result};
  } catch (error) {
    console.log({...error});

    return Promise.resolve({
      don_dat_hang: 0,
      don_dieu_phoi: 0,
      cong_nhan: 0,
      thoi_vu: 0,
      xe: 0,
      yeu_cau_xe: 0,
      yeu_cau_cong_nhan: 0,
      yeu_cau_thoi_vu: 0,
    });
  }
};

export const doiMatKhau = async (data) => {
  try {
    const res = await http.post(route.DOI_MAT_KHAU, data);
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

//Bao ban thang
export const layDSHangBan = async () => {
  try {
    const res = await http.get(route.DANH_SACH_MAT_HANG);
    return res.data.data;
  } catch (e) {
    return Promise.resolve([]);
  }
};

export const baoBanThang = async (data) => {
  try {
    const {anh: as, hang_hoa_chinh, chi_tiet_mat_hang, ...rest} = data;
    const anh = await uploadMultiImage2(as);
    const reqData = {
      ...rest,
      anh,
      hang_ban_id: hang_hoa_chinh.id,
      hang_hoa_chinh: chi_tiet_mat_hang,
    };

    const res = await http.post(route.BAO_BAN_THANG, reqData);

    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
export const baoKhongBanThang = async (id) => {
  try {
    const res = await http.put(`${route.KHONG_BAO_BAN_THANG}/${id}`);

    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const taoPhieuMuaHang = async (tt_phieu_mua_hang) => {
  try {
    console.log('tao PMH', tt_phieu_mua_hang);
    const {hinh_anhs: imgs, ...rest} = tt_phieu_mua_hang;
    const hinh_anhs = await uploadMultiImage2(imgs);

    const res = await http.post(`${route.TAO_PHIEU_MUA_HANG}`, {
      ...rest,
      hinh_anhs,
    });
    return res.data;
  } catch (error) {
    console.log({...error});
    return Promise.reject(error);
  }
};

export const capNhatPhieuMuaHang = async ({idx, tt_phieu_mua_hang}) => {
  try {
    console.log('update');
    const {hinh_anhs: imgs, ...rest} = tt_phieu_mua_hang;
    const hinh_anhs = await uploadMultiImage2(imgs);
    const res = await http.post(`${route.TAO_PHIEU_MUA_HANG}/${idx}`, {
      ...rest,
      hinh_anhs,
    });
    return res.data;
  } catch (error) {
    console.log({...error});

    return Promise.reject(error);
  }
};

export const layLichSuDanhGia = async () => {
  try {
    const res = await http.get(route.DANH_GIA_SAN_PHAM);

    return res.data.result;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const taoDanhGia = async (tt_san_pham) => {
  try {
    const {id, danh_sach_anh, ...rest} = tt_san_pham;
    const hinh_anhs = await uploadMultiImage2(danh_sach_anh);

    let res;
    if (!id) {
      res = await http.post(`${route.DANH_GIA_SAN_PHAM}`, {
        ...rest,
        hinh_anhs,
      });
    } else {
      res = await http.put(`${route.DANH_GIA_SAN_PHAM}/${id}`, {
        ...rest,
        hinh_anhs,
      });
    }
    return res.data;
  } catch (error) {
    console.log({...error});
    return Promise.reject(error);
  }
};

export const xoaDanhGia = async (id) => {
  try {
    const res = await http.delete(`${route.DANH_GIA_SAN_PHAM}/${id}`);
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const uploadImg = async ({uri, name}) => {
  const formData = new FormData();
  formData.append('file', {
    uri,
    type: 'image/jpg',
    name,
  });

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  return new Promise((resolve, reject) => {
    http.post(route.UPLOAD_ANH, formData, config).then(
      (response) => {
        if (response.data?.result?.url) resolve(response.data.result.url);
        else reject('asdjias');
      },
      (error) => {
        console.log({...error});
        reject(error);
      },
    );
  });
};

export const getBaoCao = async ({khach_hang_id, don_dieu_phoi_id}) => {
  try {
    const res = await http.get(
      `${route.BAO_CAO_HOAN_THANH}?khach_hang_id=${khach_hang_id}&don_dieu_phoi_id=${don_dieu_phoi_id}`,
    );
    return res.data.result;
  } catch (error) {
    return Promise.resolve(null);
  }
};

export const layBaoCaoLichXe = async ({start, end}) => {
  try {
    const res = await http.get(
      `${route.BAO_CAO_LICH_XE}?ngay[]=${start}&ngay[]=${end}`,
    );
    return res.data;
  } catch (error) {
    console.log({...error});
    return Promise.reject(error);
  }
};

export const taoBaoCaoHoanThanh = async (payload) => {
  try {
    const {
      anh: as,
      so_nguoi,
      ghi_chu,
      don_dieu_phoi_id,
      khach_hang_id,
      lai_xe_boc_hang,
      ...rest
    } = payload;
    const anh = await uploadMultiImage2(as);

    const reqData = {
      don_dieu_phoi_id,
      khach_hang_id,
      so_nguoi,
      anh,
      ghi_chu,
      lai_xe_boc_hang: lai_xe_boc_hang.map((el) => el.id),
      ...rest,
    };

    const res = await http.post(route.BAO_CAO_HOAN_THANH, reqData);
    console.log(res);

    return res.data;
  } catch (error) {
    console.log(error);

    console.log({...error});
    return Promise.reject(error);
  }
};

export const uploadMultiImage2 = async (images) => {
  let success = [];
  const dataLength = images.length;
  try {
    for (let i = 0; i < dataLength; i += 5) {
      const requests = images.slice(i, i + 5).map((item) => {
        if (item.name) return uploadImg(item);
        return Promise.resolve(item.uri.replace(`${RELEASE_ENDPOINT}/`, ''));
      });
      const uploaded = await Promise.all(requests);
      success = [...success, ...uploaded];
    }
  } catch (error) {
    console.log(error);
  }
  return Promise.resolve(success);
};
