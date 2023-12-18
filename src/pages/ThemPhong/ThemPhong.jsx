import React from "react";
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Select,
    useToast,
} from "@chakra-ui/react";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import serverApis from "../../api/serverApis";
import { useFormik } from "formik";
import { addRoomSchema } from "../../schemas/schema";
import PATH from "../../constants/path";

ThemPhong.propTypes = {};

function ThemPhong(props) {
    const navigate = useNavigate();
    const initialValue = {
        area: "",
        floor: "",
        roomName: "",
        numberOfBed: "",
        price: "",
    };

    // Xử lý toast message
    const toast = useToast();

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            enableReinitialize: true,
            initialValues: initialValue,
            validationSchema: addRoomSchema,
            onSubmit: (values) => {
                serverApis
                    .addRoom(values)
                    .then((response) => {
                        if (response.message === "successful") {
                            toast({
                                title: "Add thành công",
                                status: "success",
                                isClosable: true,
                                position: "top-right",
                                duration: 2000,
                            });
                            navigate(PATH.PHONG.path);
                        } else if (response.message === "existed") {
                            toast({
                                title: "Phòng đã tồn tại",
                                status: "error",
                                isClosable: true,
                                position: "top-right",
                                duration: 2000,
                            });
                        }
                    })
                    .catch((error) => {
                        if (error.response.status === 404) {
                            navigate("/404");
                        } else if (error.response.status === 500) {
                            navigate("/500");
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

    return (
        <div className="container-xl border-1 rounded-2 mt-3 p-5">
            <h1 align={"center"}>Thêm mới phòng</h1>
            <form className="p-2" onSubmit={handleSubmit}>
                <FormControl>
                    <FormLabel>Khu</FormLabel>
                    <Select
                        placeholder="Chọn khu..."
                        id="area"
                        onChange={handleChange}
                    >
                        <option value="A">Khu A</option>
                        <option value="B">Khu B</option>
                        <option value="C">Khu C</option>
                    </Select>
                    {errors.area && touched.area && (
                        <p className="error ">{errors.area}</p>
                    )}
                </FormControl>
                <FormControl>
                    <FormLabel>Tầng</FormLabel>
                    <Select
                        placeholder="Chọn tầng..."
                        id="floor"
                        onChange={handleChange}
                    >
                        <option value="1">Tầng 1</option>
                        <option value="2">Tầng 2</option>
                        <option value="3">Tầng 3</option>
                        <option value="4">Tầng 4</option>
                        <option value="5">Tầng 5</option>
                    </Select>
                    {errors.floor && touched.floor && (
                        <p className="error ">{errors.floor}</p>
                    )}
                </FormControl>
                <FormControl>
                    <FormLabel>Tên phòng</FormLabel>
                    <Input
                        className="roomName"
                        id="roomName"
                        value={values.roomName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    ></Input>
                    {errors.roomName && touched.floor && (
                        <p className="error">{errors.roomName}</p>
                    )}
                </FormControl>
                <FormControl>
                    <FormLabel>Số giường</FormLabel>
                    <Input
                        className="numberOfBed"
                        id="numberOfBed"
                        value={values.numberOfBed}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    ></Input>
                    {errors.numberOfBed && touched.numberOfBed && (
                        <p className="error">{errors.numberOfBed}</p>
                    )}
                </FormControl>
                <FormControl mb={"5"}>
                    <FormLabel>Giá</FormLabel>
                    <Input
                        className="price"
                        id="price"
                        value={values.price}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    ></Input>
                    {errors.price && touched.price && (
                        <p className="error">{errors.price}</p>
                    )}
                </FormControl>
                <Button type="submit" mr={3} colorScheme="orange" size="md">
                    Lưu
                </Button>
                <Button
                    colorScheme="gray"
                    size="md"
                    onClick={() => {
                        navigate(PATH.PHONG.path);
                    }}
                >
                    Hủy
                </Button>
            </form>
        </div>
    );
}

export default ThemPhong;
