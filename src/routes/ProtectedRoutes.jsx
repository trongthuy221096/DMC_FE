import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import jwt from "jwt-decode";
import Cookies from "universal-cookie";
import PATH from "../constants/path";
import { isTokenExpired } from "../util/date";

const cookies = new Cookies();

function ProtectedRoutes({ roles }) {
  const token = cookies.get("token");

  if (!token) {
    return <Navigate to={PATH.LOGIN.path} replace />;
  }

  const role = localStorage.getItem("role");
  const decoded = jwt(token);
  const expiredTime = decoded.exp;

  if (isTokenExpired(expiredTime)) {
    return <Navigate to={PATH.LOGIN.path} replace />;
  }

  /*
    Check if user has logged in or not. (Authentication)
    If no, they have to do.
    If yes, check their role (Authorization)
    <Outlet/> return the child route's element that matches the current page.
  */
  return !roles.includes(role) ? <Navigate to={PATH.LOGIN.path} replace /> : <Outlet />;
}

export default ProtectedRoutes;
