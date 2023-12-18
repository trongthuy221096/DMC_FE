import { Navigate, Route, Routes } from "react-router";
import DefaultLayout from "../layouts/DefaultLayout";
import { Fragment } from "react";
import DangKyPhong from "../pages/dangkyphong/DangKyPhong";
import DangKyThongTin from "../pages/dangkythongtin/DangKyThongTin";
import Visitor from "../pages/trangchu/Visitor";
import ThongTinNguoiThue from "../pages/ThongTinNguoiThue/ThongTinNguoiThue";
import HoaDon from "../pages/hoadon/HoaDon";
import QuanLiThietBi from "../pages/quanlithietbi/QuanLiThietBi";
import QuanLyPhong from "../pages/QuanLyPhong/QuanLyPhong";
import Quanlihoadon from "../pages/quanlihoadon/QuanLiHoaDon";
import User from "../pages/trangchu/User";
import Admin from "../pages/trangchu/Admin";
import ThemPhong from "../pages/ThemPhong/ThemPhong";
import QuanLyNguoiThue from "../pages/QuanLyNguoiThue/QuanLyNguoiThue";
import DanhSachYeuCau from "../pages/danhsachyeucau/DanhSachYeuCau";
import DanhSachDichVu from "../pages/danhsachdichvu/DanhSachDichVu";
import Login from "../pages/login/Login";
import ChiTietPhong from "../pages/chitietphong/ChiTietPhong";
import QuanLiThietBiCuaPhong from "../pages/quanlithietbicuaphong/ThietBiPhong";
import PATH from "../constants/path";
import ROLES from "../constants/roles";
import Cookies from "universal-cookie";
import ProtectedRoutes from "./ProtectedRoutes";
import { isTokenExpired } from "../util/date";
import Header from "../layouts/header/Header";
import jwt from "jwt-decode";
import DanhSachChotDienNuoc from "../pages/danhsachchotdiennuoc/DanhSachChotDienNuoc";
import ForgotPassword from "../pages/login/ForgotPassword";
import ChangePassword from "../pages/login/ChangePassword";
import Page404 from "../pages/error/Page404";
import Page500 from "../pages/error/Page500";

const publicRoutes = {
  BOTH: [
    {
      path: PATH.THONGTINCANHAN.path,
      component: ThongTinNguoiThue,
      layout: DefaultLayout,
    },
    {
      path: PATH.CHANGEPASSWORD.path,
      component: ChangePassword,
      layout: DefaultLayout,
    },
    {
      path: PATH.PHONG.DETAIL,
      component: ChiTietPhong,
      layout: DefaultLayout,
    },
  ],
  ADMIN: [
    {
      path: PATH.PHONG.path,
      component: QuanLyPhong,
      layout: DefaultLayout,
    },
    {
      path: PATH.PHONG.CREATE,
      component: ThemPhong,
      layout: DefaultLayout,
    },
    {
      path: PATH.NGUOITHUE.path,
      component: QuanLyNguoiThue,
      layout: DefaultLayout,
    },
    { path: PATH.ADMIN_HOME.path, component: Admin, layout: Header },
    {
      path: PATH.HOADON.path,
      component: Quanlihoadon,
      layout: DefaultLayout,
    },
    {
      path: PATH.THIETBI.path,
      component: QuanLiThietBi,
      layout: DefaultLayout,
    },
    {
      path: PATH.YEUCAU.path,
      component: DanhSachYeuCau,
      layout: DefaultLayout,
    },
    {
      path: PATH.DICHVU.path,
      component: DanhSachDichVu,
      layout: DefaultLayout,
    },
    {
      path: PATH.THIETBICUAPHONG.path,
      component: QuanLiThietBiCuaPhong,
      layout: DefaultLayout,
    },
    {
      path: PATH.CHOTDIENNUOC.path,
      component: DanhSachChotDienNuoc,
      layout: DefaultLayout
    },
  ],
  USER: [
    { path: PATH.USER.path, component: User, layout: Header },
    { path: PATH.USER.HOADON, component: HoaDon, layout: DefaultLayout },
  ],
  VISITOR: [
    { path: PATH.HOME.path, component: Visitor, layout: null },
    {
      path: PATH.REGISTER.DANGKYPHONG,
      component: DangKyPhong,
      layout: null,
    },
    {
      path: PATH.REGISTER.DANGKYTHONGTIN,
      component: DangKyThongTin,
      layout: null,
    },
    {
      path: PATH.LOGIN.forgotpassword,
      component: ForgotPassword,
      layout: null,
    },

  ],
};

const cookies = new Cookies();

const PublicRoutes = () => {
  const token = cookies.get("token");
  const role = localStorage.getItem("role");

  // console.log(token);
  // console.log(role);

  return (
    <Routes>
      {/* Accessed by both Admin and User */}
      <Route element={<ProtectedRoutes roles={[ROLES.ADMIN, ROLES.USER]} />}>
        {publicRoutes.BOTH.map((route, index) => {
          let Layout = DefaultLayout;
          if (route.layout) Layout = route.layout;
          else if (route.layout === null) Layout = Fragment;
          const Component = route.component;

          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Component />
                </Layout>
              }
            ></Route>
          );
        })}
      </Route>

      {/* Accessed by Admin only */}
      <Route element={<ProtectedRoutes roles={[ROLES.ADMIN]} />}>
        {publicRoutes.ADMIN.map((route, index) => {
          let Layout = DefaultLayout;
          if (route.layout) Layout = route.layout;
          else if (route.layout === null) Layout = Fragment;
          const Component = route.component;

          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Component />
                </Layout>
              }
            ></Route>
          );
        })}
      </Route>

      {/* Accessed by User only */}
      <Route element={<ProtectedRoutes roles={[ROLES.USER]} />}>
        {publicRoutes.USER.map((route, index) => {
          let Layout = DefaultLayout;
          if (route.layout) Layout = route.layout;
          else if (route.layout === null) Layout = Fragment;
          const Component = route.component;

          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Component />
                </Layout>
              }
            ></Route>
          );
        })}
      </Route>

      {publicRoutes.VISITOR.map((route, index) => {
        let Layout = DefaultLayout;
        if (route.layout) Layout = route.layout;
        else if (route.layout === null) Layout = Fragment;
        const Component = route.component;

        return (
          <Route
            key={index}
            path={route.path}
            element={
              <Layout>
                <Component />
              </Layout>
            }
          ></Route>
        );
      })}

      <Route
        path={PATH.LOGIN.path}
        element={
          // token && !isTokenExpired(jwt(token).exp) ? (
          role === ROLES.USER ? (
            <Navigate to={PATH.USER.path} replace />
          ) : role === ROLES.ADMIN ? (
            <Navigate to={PATH.ADMIN_HOME.path} replace />
          ) : (
            <Login />
          )
        }
      />
      <Route
        path={PATH.HOME.path}
        element={
          // token && !isTokenExpired(jwt(token).exp) ? (
          role === ROLES.USER ? (
            <Navigate to={PATH.USER.path} replace />
          ) : role === ROLES.ADMIN ? (
            <Navigate to={PATH.ADMIN_HOME.path} replace />
          ) : (
            <Visitor />
          )
        }
      />
       <Route
        path="/500"
        element={<Page500 />}
      />
      <Route
        path="*"
        element={<Page404 />}
      />
    </Routes>
  );
};

export default PublicRoutes;
