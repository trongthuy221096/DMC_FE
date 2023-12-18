import ROLES from "./roles";

const PATH = {
    HOME: {
        role: [],
        path: "/",
    },
    LOGIN: {
        role: [],
        path: "/login",
        forgotpassword: "/forgotpassword",
    },
    REGISTER: {
        role: [],
        DANGKYPHONG: "/dangkyphong",
        DANGKYTHONGTIN: "/dangkythongtin",
    },
    ADMIN_HOME: {
        role: [ROLES.ADMIN],
        path: "/admin",
    },
    THONGTINCANHAN: {
        role: [ROLES.ADMIN, ROLES.USER],
        path: "/user/:id",
    },
    CHANGEPASSWORD: {
      role: [ROLES.ADMIN, ROLES.USER],
      path: "/changepassword",
  },
    USER: {
        role: [ROLES.USER],
        path: "/user",
        HOADON: "/hoadonnguoithue",
    },
    PHONG: {
        role: [ROLES.ADMIN],
        path: "/room",

    CREATE: "/room/addRoom",
    DETAIL: "/room/:id",
  },
  NGUOITHUE: {
    role: [ROLES.ADMIN],
    path: "/user/manage",
  },
  YEUCAU: {
    role: [ROLES.ADMIN],
    path: "/danhsachyeucau",
  },
  THIETBI: {
    role: [ROLES.ADMIN],
    path: "/quanlithietbi",
  },
  DICHVU: {
    role: [ROLES.ADMIN],
    path: "/danhsachdichvu",
  },
  HOADON: {
    role: [ROLES.ADMIN],
    path: "/quanlihoadon",
  },
  THIETBICUAPHONG: {
    role: [ROLES.ADMIN],
    path: "/quanlithietbicuaphong",
  },
  CHOTDIENNUOC: {
    role: [ROLES.ADMIN],
    path: "/chotdiennuoc",
  },
};

export default PATH;
