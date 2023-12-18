import { FormLabel } from "@chakra-ui/form-control";
import { Stack } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import serverApis from "../../api/serverApis";
import { splitAddress } from "../../util/format";
import { useToast } from "@chakra-ui/react";

ThongTinNguoiThue.propTypes = {};

function ThongTinNguoiThue(props) {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const toast = useToast();
  useEffect(() => {
    getUsersOfRoom();
  }, []);

  const getUsersOfRoom = () => {
    serverApis
      .getUserDetail(id)
      .then((response) => {
        // const splitAddress = splitAddress(response.address);
        setUser(response);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          navigate("/404");
        } else if (error.response.status === 500) {
          navigate("/500");
        } else {
          navigate("/404")
        }
      });
  };
  return (
    <div className="container-xxl">
      <div className="border-1 p-3 rounded-2">
        <div className="pb-3">
          <b className="fs-3">THÔNG TIN NGƯỜI THUÊ</b>
          <div className="border-1 p-3">
            <b className="fs-5">I.THÔNG TIN CÁ NHÂN</b>
            <div className="border">
              <div className="border-bottom ">
                <Stack direction={"row"}>
                  <FormLabel className="col-4 text-end m-0 pe-2" backgroundColor={"#edf2f7"}>
                    CMND/CCCD
                  </FormLabel>
                  <p>{user.cmnd}</p>
                </Stack>
              </div>
              <div className="border-bottom ">
                <Stack direction={"row"}>
                  <FormLabel className="col-4 text-end m-0 pe-2" backgroundColor={"#edf2f7"}>
                    Họ và tên
                  </FormLabel>
                  <p>{user.name}</p>
                </Stack>
              </div>
              <div className="border-bottom ">
                <Stack direction={"row"}>
                  <FormLabel className="col-4 text-end m-0 pe-2" backgroundColor={"#edf2f7"}>
                    Ngày sinh
                  </FormLabel>
                  <p>{user.birthDay}</p>
                </Stack>
              </div>
              <div className="border-bottom ">
                <Stack direction={"row"}>
                  <FormLabel className="col-4 text-end m-0 pe-2" backgroundColor={"#edf2f7"}>
                    Giới tính
                  </FormLabel>
                  <p>{user.gender}</p>
                </Stack>
              </div>
              <div className="border-bottom ">
                <Stack direction={"row"}>
                  <FormLabel className="col-4 text-end m-0 pe-2" backgroundColor={"#edf2f7"}>
                    Email
                  </FormLabel>
                  <p>{user.email}</p>
                </Stack>
              </div>
              <div className="border-bottom ">
                <Stack direction={"row"}>
                  <FormLabel className="col-4 text-end m-0 pe-2" backgroundColor={"#edf2f7"}>
                    Điện thoại
                  </FormLabel>
                  <p>{user.phoneNumber}</p>
                </Stack>
              </div>
              <div className="border-bottom ">
                <Stack direction={"row"}>
                  <FormLabel className="col-4 text-end m-0 pe-2" backgroundColor={"#edf2f7"}>
                    Phòng
                  </FormLabel>
                  <p>{user.roomName}</p>
                </Stack>
              </div>
              {/* <div className="border-bottom ">
                  <Stack direction={"row"}>
                    <FormLabel className="col-4 text-end m-0 pe-2" backgroundColor={"#edf2f7"}>
                      Dân tộc
                    </FormLabel>
                    <p>Kinh</p>
                  </Stack>
                </div>
                <div className=" ">
                  <Stack direction={"row"}>
                    <FormLabel className="col-4 text-end m-0 pe-2" backgroundColor={"#edf2f7"}>
                      Tôn giáo
                    </FormLabel>
                    <p>Phat giao</p>
                  </Stack>
                </div> */}
            </div>
            <b className="fs-5">II.HỘ KHẨU THƯỜNG TRÚ</b>
            <div className="border">
              <div className="border-bottom ">
                <Stack direction={"row"}>
                  <FormLabel className="col-4 text-end m-0 pe-2" backgroundColor={"#edf2f7"}>
                    Tỉnh/Thành phố
                  </FormLabel>
                  <p>{splitAddress(user.address, 0)}</p>
                </Stack>
              </div>
              <div className="border-bottom ">
                <Stack direction={"row"}>
                  <FormLabel className="col-4 text-end m-0 pe-2" backgroundColor={"#edf2f7"}>
                    Quận/Huyện
                  </FormLabel>
                  <p>{splitAddress(user.address, 1)}</p>
                </Stack>
              </div>
              <div className="border-bottom ">
                <Stack direction={"row"}>
                  <FormLabel className="col-4 text-end m-0 pe-2" backgroundColor={"#edf2f7"}>
                    Phường/Xã
                  </FormLabel>
                  <p>{splitAddress(user.address, 2)}</p>
                </Stack>
              </div>
              <div className=" ">
                <Stack direction={"row"}>
                  <FormLabel className="col-4 text-end m-0 pe-2" backgroundColor={"#edf2f7"}>
                    Số nhà, tên đường, tổ/xóm, khu phố/thôn/ấp
                  </FormLabel>
                  <p>{splitAddress(user.address, 3)}</p>
                </Stack>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThongTinNguoiThue;
