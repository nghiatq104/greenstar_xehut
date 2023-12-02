import _ from 'lodash';

export const transformCustomer = (arr) => {
  return arr.map((el) => ({...el, label: el.ten, value: el.id}));
};

export const transformVatTu = (arr) => {
  return arr.map((el) => ({...el, count: 0}));
};

export const transformWithKeyIsID = (arr) => {
  if (arr.length) {
    return arr.reduce((acc, el) => ({...acc, [el.id]: el}), {});
  }

  return {};
};

export const transformKhachHang = (arr) => {
  const sectionData = {};
  try {
    _.map(arr, (item) => {
      if (item.active) {
        const key_khuvuc = item?.khu_vuc?.ten;
        const pushItem = {
          id: item?.id,
          ma: item?.ma,
          ten: item?.customer_kd?.name,
          label: item?.customer_kd?.name,
          value: item?.id,
          dia_chi: item?.dia_chi || item?.customer_kd?.address,
          so_dien_thoai: item?.so_dien_thoai,
          khu_vuc_id: item?.khu_vuc?.id,
        };
        if (key_khuvuc) {
          if (sectionData[key_khuvuc]) {
            sectionData[key_khuvuc].data.push(pushItem);
          } else {
            sectionData[key_khuvuc] = {
              title: key_khuvuc,
              data: [pushItem],
            };
          }
        }
      }
    });
    return sectionData;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const transformHangHoa = (arr) => {
  const sectionData = {};
  try {
    _.map(arr, (item) => {
      const key = item.loai_chat_thai;
      const pushItem = {
        ...item,
        ten: item.ten_hang_hoa,
      };
      if (sectionData[key]) {
        sectionData[key].data.push(pushItem);
      } else {
        sectionData[key] = {
          title: key,
          data: [pushItem],
        };
      }
    });
    return sectionData;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export const transformDongXe = (arr) => {
  const sectionData = {};
  try {
    _.map(arr, (item) => {
      const key_dongxe = item.dong_xe.id;

      if (sectionData[key_dongxe]) {
        sectionData[key_dongxe].so_luong += 1;
      } else {
        sectionData[key_dongxe] = {
          ten: item.dong_xe.ten,
          so_luong: 1,
        };
      }
    });
    return sectionData;
  } catch (error) {
    return {};
  }
};

export const securePhone = (phone, len = 3) => {
  try {
    let newPhone = '';
    const length = phone.length;
    const newLen = length <= len ? 1 : len;
    phone.split('').map((el, index) => {
      if (index < length - newLen) {
        newPhone += '*';
      } else {
        newPhone += el;
      }
    });
    return newPhone;
  } catch (error) {
    return phone;
  }
};

export const secureEmail = (email) => {
  const [left, right] = email.split('@');

  if (left && right) {
    return securePhone(left) + '@' + right;
  } else {
    return securePhone(left);
  }
};

export const formatCurrency = (n, separate = '.') => {
  try {
    if (!n) n = 0;
    var s = typeof n === 'number' ? parseInt(n).toString() : '0';
    var regex = /\B(?=(\d{3})+(?!\d))/g;
    var ret = s.replace(regex, separate);
    return ret;
  } catch (error) {
    return '0';
  }
};

export const cut = (value, cutStart, cutEnd) => {
  return (
    value.substring(0, cutStart) + value.substring(cutEnd + 1, value.length)
  );
};
