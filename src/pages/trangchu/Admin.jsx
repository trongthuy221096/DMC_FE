import React from "react";
import { MdOutlineMeetingRoom } from "react-icons/md";
import { PiUserList } from "react-icons/pi";
import { LiaBedSolid } from "react-icons/lia";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { RiBillLine, RiWaterFlashLine } from "react-icons/ri";
import PATH from "../../constants/path";
import { LuArmchair } from "react-icons/lu";

const services = [
    {
        name: "QUẢN LÝ PHÒNG",
        icon: <MdOutlineMeetingRoom />,
        to: PATH.PHONG.path,
    },
    {
        name: "NGƯỜI DÙNG",
        icon: <PiUserList />,
        to: PATH.NGUOITHUE.path,
    },
    {
        name: "YÊU CẦU",
        icon: <VscGitPullRequestGoToChanges />,
        to: PATH.YEUCAU.path,
    },
    {
        name: "THIẾT BỊ",
        icon: <LuArmchair />,
        to: PATH.THIETBI.path,
    },
    {
        name: "THIẾT BỊ PHÒNG",
        icon: <LiaBedSolid />,
        to: PATH.THIETBICUAPHONG.path,
    },
    {
        name: "DỊCH VỤ",
        icon: <RiWaterFlashLine />,
        to: PATH.DICHVU.path,
    },
    {
        name: "HÓA ĐƠN",
        icon: <RiBillLine />,
        to: PATH.HOADON.path,
    },
];

const Admin = () => {
    return (
        <>
            <div style={{ backgroundImage: "url('/assets/img/BG_DMC.webp')" }}>
                <div className="container-xl">
                    <div className="row p-5">
                        {services.map((value, index) => {
                            return (
                                <div
                                    key={index}
                                    className="col-lg-6 col-md-6 col-sm-12 col-xl-4 mb-5 "
                                >
                                    <div className="card">
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
        </>
    );
};

export default Admin;
