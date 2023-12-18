import React from "react";
import { GiThreeFriends } from "react-icons/gi";
import { IoIosInformationCircle } from "react-icons/io";
import { FaReceipt } from "react-icons/fa";
import {
    MdOutlineMeetingRoom,
    MdOutlineSettingsInputComposite,
} from "react-icons/md";
import PATH from "../../constants/path";
import { useNavigate } from "react-router-dom";

const User = () => {
    const userLocal = {
        id: localStorage.getItem("id"),
        roomId: localStorage.getItem("roomId"),
    };

    const services = [
        {
            name: "THÔNG TIN CÁ NHÂN",
            icon: <IoIosInformationCircle />,
            to: "/user/" + userLocal.id,
        },
        {
            name: "THÔNG TIN PHÒNG",
            icon: <MdOutlineMeetingRoom />,
            to: "/room/" + userLocal.roomId,
        },
        {
            name: "HÓA ĐƠN",
            icon: <FaReceipt />,
            to: PATH.USER.HOADON,
        },
        //THEM CHUC NANG THI THEM VO DAY
    ];
    return (
        <>
            <div className="vh-100">
                <div
                    style={{
                        backgroundImage: "url('/assets/img/BG_DMC.webp')",
                    }}
                    className="h-100 "
                >
                    <div className="container-xl">
                        <div className="row  p-5">
                            {services.map((value, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="col-lg-6 col-md-6 col-sm-6 col-xl-4 mb-5 "
                                    >
                                        <div
                                            className="card"
                                            style={{ height: "230px" }}
                                        >
                                            <a
                                                href={value.to}
                                                className="text-decoration-none blue"
                                            >
                                                <div className="card-body z-1 text-center">
                                                    <div className="d-flex flex-column align-items-center p-5">
                                                        <div className="fs-1">
                                                            {value.icon}
                                                        </div>
                                                        <div className="d-flex flex-column z-1 mt-4">
                                                            <span className="fs-4">
                                                                {value.name}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default User;
