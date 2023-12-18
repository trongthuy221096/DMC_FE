import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Stack } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { Box } from '@chakra-ui/react'
import { Textarea } from "@chakra-ui/textarea";
import { GrLinkPrevious } from "react-icons/gr";
import { TfiSave } from "react-icons/tfi";
import serverApis from "../../api/serverApis";
import { routes } from "../../routes";
import { useLocation, useNavigate } from "react-router";
import { useFormik } from "formik";
import { dangKyThongTinSchema } from "../../schemas/schema";
import nations from "../../assets/nations";
import { useEffect, useState } from "react";
import provinceApis from "../../api/provinceApis";
import PATH from "../../constants/path";
import religions from "../../assets/religions";
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";

const DangKyThongTin = () => {
    // Xử lý toast message
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
    const location = useLocation();
    const { room } = location.state;
    const initialValue = {
        name: "",
        gender: "",
        birthDay: "",
        email: "",
        cmnd: "",
        phoneNumber: "",
        city: "",
        district: "",
        ward: "",
        street: "",
        roomID: room.roomID,
        nation: "",
        religion: "",
    };
    const [provinceCode, setProvinceCode] = useState(0);
    const [districtCode, setDistrictCode] = useState(0);
    const [wardCode, setWardCode] = useState(0);
    const [listProvinces, setListProvinces] = useState([]);
    const [listDistricts, setListDistricts] = useState([]);
    const [listWards, setListWards] = useState([]);

    const { values, errors, touched, handleBlur, handleSubmit, setValues } =
        useFormik({
            enableReinitialize: true,
            initialValues: initialValue,
            validationSchema: dangKyThongTinSchema,
            onSubmit: (values) => {
                console.log(values);
                serverApis.register(values).then((response) => {
                    if (response.message === "successful") {
                        onOpen();
                    } else if (response.message === "existed") {
                        toast({
                            title: "Chứng minh nhân dân hoặc số điện thoại hoặc email đã được đăng ký",
                            status: "error",
                            isClosable: true,
                            position: "top-right",
                            duration: 2000,
                        });
                    } else {
                        toast({
                            title: "Có lỗi trong quá trình xử lý",
                            status: "error",
                            isClosable: true,
                            position: "top-right",
                            duration: 2000,
                        });
                    }
                });
            },
        });

    useEffect(() => {
        getListProvinces();
    }, []);

    useEffect(() => {
        setListDistricts([]);
        setListWards([]);
        if (provinceCode != 0) {
            getListDistricts();
        }
    }, [provinceCode]);

    useEffect(() => {
        setListWards([]);
        if (districtCode != 0) getListWards();
    }, [districtCode]);

    const getListProvinces = () => {
        provinceApis
            .getListProvinces()
            .then((response) => {
                setListProvinces([...response]);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const getListDistricts = () => {
        provinceApis
            .getListDistrictsByProvinceCode(provinceCode)
            .then((response) => {
                setListDistricts([...response.districts]);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const getListWards = () => {
        provinceApis
            .getListWardsByDistrictCode(districtCode)
            .then((response) => {
                setListWards([...response.wards]);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const handleOnChange = (e) => {
        let { id, value } = e.target;
        if (id === "city") {
            setProvinceCode(value);
            const province = listProvinces
                .filter((p) => {
                    return p.code == value;
                })
                .at(0);
            console.log(province);
            value = province?.name;
        } else if (id === "district") {
            setDistrictCode(value);
            const district = listDistricts
                .filter((d) => {
                    return d.code == value;
                })
                .at(0);
            value = district?.name;
        } else if (id === "ward") {
            setWardCode(value);
            const ward = listWards
                .filter((w) => {
                    return w.code == value;
                })
                .at(0);
            value = ward?.name;
        }
        setValues({ ...values, [id]: value });
    };

    // const handleOnSubmit = (e) => {
    //     e.preventDefault()

    //     serverApis.register(inputValues)
    //         .then(response => {
    //             console.log(response)
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })
    // }

    return (
        <>
            <div className="container-xxl">
                <div className="pt-5">
                    <Stack
                        direction="row"
                        spacing={4}
                        className="w-100 justify-content-between mb-2"
                    >
                        <Button
                            leftIcon={<GrLinkPrevious />}
                            onClick={() => navigate(PATH.REGISTER.DANGKYPHONG)}
                        >
                            Quay lại
                        </Button>
                        <Button
                            leftIcon={<TfiSave />}
                            backgroundColor={"#ea580c"}
                            variant="solid"
                            type="submit"
                            onClick={handleSubmit}
                        >
                            Lưu
                        </Button>
                    </Stack>
                    <div className="border-1 p-3 rounded-2">
                        <div className="pb-3">
                            <b className="fs-3">
                                THÔNG TIN ĐĂNG KÝ KHU {room.area} - PHÒNG {room.roomName}
                            </b>
                            <div className="border-1 p-3">
                                <form>
                                    <b className="fs-5">I.THÔNG TIN CÁ NHÂN</b>
                                    <div className="border">
                                        <FormControl isRequired className="border-bottom ">
                                            <Stack direction={"row"}>
                                                <FormLabel
                                                    className="col-4 text-end m-0 pe-2"
                                                    backgroundColor={"#edf2f7"}
                                                >
                                                    CMND/CCCD
                                                </FormLabel>
                                                <Input
                                                    width={"96"}
                                                    className="m-1 border-secondary"
                                                    id="cmnd"
                                                    value={values.cmnd || ""}
                                                    onChange={handleOnChange}
                                                    onBlur={handleBlur}
                                                    type="number"
                                                ></Input>
                                                {errors.cmnd && touched.cmnd && (
                                                    <small className="error">{errors.cmnd}</small>
                                                )}
                                            </Stack>
                                        </FormControl>
                                        <FormControl isRequired className="border-bottom ">
                                            <Stack direction={"row"}>
                                                <FormLabel
                                                    className="col-4 text-end m-0 pe-2 "
                                                    backgroundColor={"#edf2f7"}
                                                >
                                                    Họ và tên
                                                </FormLabel>
                                                <Input
                                                    width={"96"}
                                                    className="m-1 border-secondary "
                                                    id="name"
                                                    value={values.name || ""}
                                                    onChange={handleOnChange}
                                                    onBlur={handleBlur}
                                                ></Input>

                                                {errors.name && touched.name && (
                                                    <small className="error ">{errors.name}</small>
                                                )}
                                            </Stack>
                                        </FormControl>
                                        <FormControl isRequired className="border-bottom ">
                                            <Stack direction={"row"}>
                                                <FormLabel
                                                    className="col-4 text-end m-0 pe-2"
                                                    backgroundColor={"#edf2f7"}
                                                >
                                                    Ngày sinh
                                                </FormLabel>
                                                <Input
                                                    width={"96"}
                                                    className="m-1 border-secondary"
                                                    type="date"
                                                    id="birthDay"
                                                    value={values.birthDay || ""}
                                                    onChange={handleOnChange}
                                                    onBlur={handleBlur}
                                                ></Input>
                                                {errors.birthDay && touched.birthDay && (
                                                    <small className="error">{errors.birthDay}</small>
                                                )}
                                            </Stack>
                                        </FormControl>
                                        <FormControl isRequired className="border-bottom ">
                                            <Stack direction={"row"}>
                                                <FormLabel
                                                    className="col-4 text-end m-0 pe-2"
                                                    backgroundColor={"#edf2f7"}
                                                >
                                                    Giới tính
                                                </FormLabel>
                                                <Box className="m-1" width={'96'}>
                                                    <Select
                                                        placeholder="--Không--"
                                                        className=" border-secondary"
                                                        id="gender"
                                                        value={values.gender}
                                                        onChange={handleOnChange}
                                                    >
                                                        <option value={"nam"}>Nam</option>
                                                        <option value={"nu"}>Nữ</option>
                                                        <option value={"khac"}>Khác</option>
                                                    </Select>
                                                </Box>
                                                {errors.gender && touched.gender && (
                                                    <small className="error ms-2">{errors.gender}</small>
                                                )}
                                            </Stack>
                                        </FormControl>
                                        <FormControl isRequired className="border-bottom ">
                                            <Stack direction={"row"}>
                                                <FormLabel
                                                    className="col-4 text-end m-0 pe-2"
                                                    backgroundColor={"#edf2f7"}
                                                >
                                                    Email
                                                </FormLabel>
                                                <Input
                                                    width={"96"}
                                                    className="m-1 border-secondary"
                                                    id="email"
                                                    value={values.email || ""}
                                                    onChange={handleOnChange}
                                                    onBlur={handleBlur}
                                                ></Input>
                                                {errors.email && touched.email && (
                                                    <small className="error">{errors.email}</small>
                                                )}
                                            </Stack>
                                        </FormControl>
                                        <FormControl isRequired className="border-bottom ">
                                            <Stack direction={"row"}>
                                                <FormLabel
                                                    className="col-4 text-end m-0 pe-2"
                                                    backgroundColor={"#edf2f7"}
                                                >
                                                    Điện thoại
                                                </FormLabel>
                                                <Input
                                                    type="number"
                                                    width={"96"}
                                                    className="m-1 border-secondary"
                                                    id="phoneNumber"
                                                    value={values.phoneNumber || ""}
                                                    onChange={handleOnChange}
                                                    onBlur={handleBlur}
                                                ></Input>
                                                {errors.phoneNumber && touched.phoneNumber && (
                                                    <small className="error">{errors.phoneNumber}</small>
                                                )}
                                            </Stack>
                                        </FormControl>
                                        <FormControl isRequired className="border-bottom ">
                                            <Stack direction={"row"}>
                                                <FormLabel
                                                    className="col-4 text-end m-0 pe-2"
                                                    backgroundColor={"#edf2f7"}
                                                >
                                                    Dân tộc
                                                </FormLabel>
                                                <Box className="m-1" width={'96'}>
                                                    <Select
                                                        placeholder="--Không--"
                                                        className=" border-secondary"
                                                        id="nation"
                                                        value={values.folk}
                                                        onChange={handleOnChange}
                                                    >
                                                        {nations.map((value, index) => {
                                                            return (
                                                                <option key={value.code} value={value.name}>
                                                                    {value.name}
                                                                </option>
                                                            );
                                                        })}
                                                    </Select>
                                                </Box>
                                                {errors.folk && touched.folk && (
                                                    <small className="error  ms-2">{errors.folk}</small>
                                                )}
                                            </Stack>
                                        </FormControl>
                                        <FormControl isRequired className=" ">
                                            <Stack direction={"row"}>
                                                <FormLabel
                                                    className="col-4 text-end m-0 pe-2"
                                                    backgroundColor={"#edf2f7"}
                                                >
                                                    Tôn giáo
                                                </FormLabel>
                                                <Box className="m-1" width={'96'}>
                                                    <Select
                                                        placeholder="--Không--"
                                                        className=" border-secondary"
                                                        id="religion"
                                                        value={values.religion}
                                                        onChange={handleOnChange}
                                                    >
                                                        {religions.map((value, index) => {
                                                            return (
                                                                <option key={value.code} value={value.name}>
                                                                    {value.name}
                                                                </option>
                                                            );
                                                        })}
                                                    </Select>
                                                </Box>
                                                {errors.religion && touched.religion && (
                                                    <small className="error  ms-2">
                                                        {errors.religion}
                                                    </small>
                                                )}
                                            </Stack>
                                        </FormControl>
                                    </div>
                                    <b className="fs-5">II.HỘ KHẨU THƯỜNG TRÚ</b>
                                    <div className="border">
                                        <FormControl isRequired className="border-bottom ">
                                            <Stack direction={"row"}>
                                                <FormLabel
                                                    className="col-4 text-end m-0 pe-2"
                                                    backgroundColor={"#edf2f7"}
                                                >
                                                    Tỉnh/Thành phố
                                                </FormLabel>
                                                <Box className="m-1" width={'96'}>
                                                    <Select
                                                        placeholder="--Không--"
                                                        className=" border-secondary"
                                                        id="city"
                                                        onChange={handleOnChange}
                                                    >
                                                        {listProvinces.map((value, index) => {
                                                            return (
                                                                <option key={value.code} value={value.code}>
                                                                    {value.name}
                                                                </option>
                                                            );
                                                        })}
                                                    </Select>
                                                </Box>
                                                {errors.city && touched.city && (
                                                    <small className="error  ms-2">{errors.city}</small>
                                                )}
                                            </Stack>
                                        </FormControl>
                                        <FormControl isRequired className="border-bottom ">
                                            <Stack direction={"row"}>
                                                <FormLabel
                                                    className="col-4 text-end m-0 pe-2"
                                                    backgroundColor={"#edf2f7"}
                                                >
                                                    Quận/Huyện
                                                </FormLabel>
                                                <Box className="m-1" width={'96'}>
                                                    <Select
                                                        placeholder="--Không--"
                                                        className=" border-secondary"
                                                        id="district"
                                                        onChange={handleOnChange}
                                                    >
                                                        {listDistricts.map((value, index) => {
                                                            return (
                                                                <option key={value.code} value={value.code}>
                                                                    {value.name}
                                                                </option>
                                                            );
                                                        })}
                                                    </Select>
                                                </Box>
                                                {errors.district && touched.district && (
                                                    <small className="error  ms-2">
                                                        {errors.district}
                                                    </small>
                                                )}
                                            </Stack>
                                        </FormControl>
                                        <FormControl isRequired className="border-bottom ">
                                            <Stack direction={"row"}>
                                                <FormLabel
                                                    className="col-4 text-end m-0 pe-2"
                                                    backgroundColor={"#edf2f7"}
                                                >
                                                    Phường/Xã
                                                </FormLabel>
                                                <Box className="m-1" width={'96'}>
                                                    <Select
                                                        placeholder="--Không--"
                                                        className=" border-secondary"
                                                        id="ward"
                                                        onChange={handleOnChange}
                                                    >
                                                        {listWards.map((value, index) => {
                                                            return (
                                                                <option key={value.code} value={value.code}>
                                                                    {value.name}
                                                                </option>
                                                            );
                                                        })}
                                                    </Select>
                                                </Box>
                                                {errors.ward && touched.ward && (
                                                    <small className="error  ms-2">{errors.ward}</small>
                                                )}
                                            </Stack>
                                        </FormControl>
                                        <FormControl isRequired className=" ">
                                            <Stack direction={"row"}>
                                                <FormLabel
                                                    className="col-4 text-end m-0 pe-2"
                                                    backgroundColor={"#edf2f7"}
                                                >
                                                    Số nhà, tên đường, tổ/xóm, khu phố/thôn/ấp
                                                </FormLabel>
                                                <Textarea
                                                    width={"96"}
                                                    className="m-1 border-secondary "
                                                    id="street"
                                                    value={values.street}
                                                    onChange={handleOnChange}
                                                    onBlur={handleBlur}
                                                />
                                                {errors.street && touched.street && (
                                                    <small className="error ">{errors.street}</small>
                                                )}
                                            </Stack>
                                        </FormControl>
                                    </div>
                                </form>
                                <Modal isOpen={isOpen} onClose={onClose}>
                                    <ModalOverlay />
                                    <ModalContent>
                                        <ModalHeader>Thông báo</ModalHeader>
                                        <ModalCloseButton />
                                        <ModalBody>
                                            Yêu cầu của bạn đã được gửi,vui lòng chờ admin xác nhận.
                                        </ModalBody>

                                        <ModalFooter>
                                            <Button
                                                mr={3}
                                                onClick={onClose}
                                                colorScheme="orange"
                                                variant="outline"
                                            >
                                                Đóng
                                            </Button>
                                            <Button
                                                onClick={() => {
                                                    navigate("/");
                                                }}
                                                colorScheme="orange"
                                            >
                                                Quay về trang chủ
                                            </Button>
                                        </ModalFooter>
                                    </ModalContent>
                                </Modal>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DangKyThongTin;
