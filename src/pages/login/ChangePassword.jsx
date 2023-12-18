import {
    Button,
    Card,
    CardBody,
    Center,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    useToast,
} from "@chakra-ui/react";
import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import "./styles.scss";
import { useFormik } from "formik";
import { changePassWord } from "../../schemas/schema";
import serverApis from "../../api/serverApis";

function ChangePassword() {
    const [loading, setLoading] = useState(false);
    const [showPassWord, setShowPassWord] = useState(false);
    const [showRePassWord, setShowRePasssWord] = useState(false);
    const [showCurrentPassWord, setShowCurrentPassWord] = useState(false);
    const handleClickShowCurrentPassWord = () => {
        setShowCurrentPassWord(!showCurrentPassWord);
    };
    const handleClickShowPassword = () => {
        setShowPassWord(!showPassWord);
    };
    const handleClickShowRePassword = () => {
        setShowRePasssWord(!showRePassWord);
    };
    // Xử lý toast message
    const toast = useToast();

    const phoneNumber = localStorage.getItem("phoneNumber");
    const initialValue = {
        password: "",
        repassword: "",
        currentPassword: "",
        phoneNumber: phoneNumber,
    };
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            enableReinitialize: true,
            initialValues: initialValue,
            validationSchema: changePassWord,
            onSubmit: (values, actions) => {
                updatePassword(values, actions);
            },
        });
    // Hàm update service
    const updatePassword = async (data, actions) => {
        try {
            setLoading(true);
            // Gọi serverApis.updateService(data) và đợi cho nó hoàn thành
            await serverApis.updatePassword(data);
            setLoading(false);
            // Nếu cả hai lời gọi hoàn thành mà không có lỗi, thì hiển thị toast thành công
            toast({
                title: "Cập nhập mật khẩu thành công",
                status: "success",
                isClosable: true,
                position: "top-right",
                duration: 2000,
            });
            actions.resetForm();
        } catch (error) {
            // Kiểm tra nếu status code là 404, thì hiển thị toast lỗi
            if (error.response && error.response.status === 404) {
                toast({
                    title: "Mật khẩu hiện tại không đúng!",
                    status: "error",
                    isClosable: true,
                    position: "top-right",
                    duration: 2000,
                });
            } else {
                toast({
                    title: "Có lỗi trong quá trình xử lý!",
                    status: "error",
                    isClosable: true,
                    position: "top-right",
                    duration: 2000,
                });
            }
            setLoading(false);
        }
    };
    console.log(values);
    return (
        <div className="container">
            <Center width="auto" m={"auto"}>
                <Card maxW="sm" boxShadow={"lg"}>
                    <form mt="6" spacing="3">
                        <CardBody>
                            <h4 className="mb-2 ">Thay đổi mật khẩu</h4>
                            <p className="mb-4">
                                Nhập mật khẩu của bạn để thay đổi
                            </p>

                            <FormControl mb={2}>
                                <FormLabel>Mật khẩu hiện tại</FormLabel>
                                <InputGroup>
                                    <Input
                                        pr="4.5rem"
                                        type={
                                            showCurrentPassWord
                                                ? "text"
                                                : "password"
                                        }
                                        placeholder="********"
                                        htmlSize={40}
                                        id="currentPassword"
                                        value={values.currentPassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    ></Input>

                                    <InputRightElement width="4.5rem">
                                        <Button
                                            h="1.75rem"
                                            onClick={
                                                handleClickShowCurrentPassWord
                                            }
                                            colorScheme="teal"
                                            variant="ghost"
                                        >
                                            {showCurrentPassWord ? (
                                                <AiOutlineEye />
                                            ) : (
                                                <AiOutlineEyeInvisible />
                                            )}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                {errors.currentPassword &&
                                    touched.currentPassword && (
                                        <small className="error">
                                            {errors.currentPassword}
                                        </small>
                                    )}
                            </FormControl>
                            <FormControl mb={2}>
                                <FormLabel>Mật khẩu</FormLabel>
                                <InputGroup>
                                    <Input
                                        pr="4.5rem"
                                        type={
                                            showPassWord ? "text" : "password"
                                        }
                                        placeholder="********"
                                        autoComplete="new-password"
                                        htmlSize={40}
                                        id="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    ></Input>

                                    <InputRightElement width="4.5rem">
                                        <Button
                                            h="1.75rem"
                                            onClick={handleClickShowPassword}
                                            colorScheme="teal"
                                            variant="ghost"
                                        >
                                            {showPassWord ? (
                                                <AiOutlineEye />
                                            ) : (
                                                <AiOutlineEyeInvisible />
                                            )}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                {errors.password && touched.password && (
                                    <small className="error">
                                        {errors.password}
                                    </small>
                                )}
                            </FormControl>
                            <FormControl mb={2}>
                                <FormLabel>Nhập lại mật khẩu</FormLabel>
                                <InputGroup>
                                    <Input
                                        pr="4.5rem"
                                        type={
                                            showRePassWord ? "text" : "password"
                                        }
                                        placeholder="********"
                                        autoComplete="new-password"
                                        htmlSize={40}
                                        id="repassword"
                                        value={values.repassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    ></Input>

                                    <InputRightElement width="4.5rem">
                                        <Button
                                            h="1.75rem"
                                            onClick={handleClickShowRePassword}
                                            colorScheme="teal"
                                            variant="ghost"
                                        >
                                            {showRePassWord ? (
                                                <AiOutlineEye />
                                            ) : (
                                                <AiOutlineEyeInvisible />
                                            )}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                {errors.repassword && touched.repassword && (
                                    <small className="error">
                                        {errors.repassword}
                                    </small>
                                )}
                            </FormControl>

                            {loading ? (
                                <Button
                                    isLoading
                                    loadingText="Loading"
                                    spinnerPlacement="start"
                                    w={"100%"}
                                    className="cl-696cff"
                                    my={5}
                                >
                                    Sending...
                                </Button>
                            ) : (
                                <Button
                                    w={"100%"}
                                    my={5}
                                    className="cl-696cff"
                                    onClick={handleSubmit}
                                >
                                    Xác nhận mật khẩu
                                </Button>
                            )}
                        </CardBody>
                    </form>
                </Card>
            </Center>
        </div>
    );
}
export default ChangePassword;
