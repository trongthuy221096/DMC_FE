import React from "react";
import { GiArchiveRegister } from "react-icons/gi";
import { FiLogIn } from "react-icons/fi";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import PATH from "../../constants/path";

const Visitor = () => {
    const services = [
        {
            name: "ĐĂNG NHẬP",
            icon: <FiLogIn />,
            des: "Dành cho người dùng",
            to: PATH.LOGIN.path,
        },
        {
            name: "ĐĂNG KÝ",
            icon: <GiArchiveRegister />,
            des: "Dành cho người chưa đăng ký KTX",
            to: PATH.REGISTER.DANGKYPHONG,
        },
    ];
    const navigate = useNavigate();

    return (
        <>
            <div style={{ backgroundImage: "url('/assets/img/BG_DMC.webp')" }}>
                <div className="container-xxl vh-100 flex-column d-flex justify-content-center">
                    <div className="row p-5 justify-content-center position">
                        {services.map((value, index) => {
                            return (
                                <div
                                    key={index}
                                    className="col-lg-6 col-md-6 col-sm-12 col-xl-6 mb-5 row justify-content-center"
                                >
                                    <div className="card col-10">
                                        <div className="card-body z-1 text-center d-flex flex-column align-items-center">
                                            <b className="fs-4 mb-3">
                                                {value.des}
                                            </b>
                                            <Button
                                                onClick={() =>
                                                    navigate(value.to)
                                                }
                                                leftIcon={value.icon}
                                                size={"lg"}
                                            >
                                                {value.name}
                                            </Button>
                                        </div>
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

export default Visitor;
