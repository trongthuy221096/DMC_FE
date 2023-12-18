import "bootstrap/dist/css/bootstrap.css";
import {
    AiOutlineEye,
    AiOutlineEyeInvisible,
    AiOutlineHome,
} from "react-icons/ai";
import {
    Card,
    FormControl,
    CardBody,
    CardFooter,
    FormLabel,
    Input,
    Image,
    Button,
    InputGroup,
    InputRightElement,
    Center,
    Flex,
    Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import serverApis from "../../api/serverApis";
import "./styles.scss";
import jwt from "jwt-decode";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import PATH from "../../constants/path";
import { GrLinkPrevious } from "react-icons/gr";

const LoginErrorMessage = {
    REQUIRED: "Trường này phải nhập",
    INVALID: "Sai số điện thoại hoặc password",
};

const cookies = new Cookies();

function Login() {
    const [emailStatusMessage, setEmailStatusMessage] = useState("");
    const [passwordStatusMessage, setPasswordStatusMessage] = useState("");
    const [show, setShow] = useState(false);
    const [formValue, setFormValue] = useState({
        phoneNumber: "",
        password: "",
    });
    const navigate = useNavigate();
    const handleClick = () => setShow(!show);

    const onChangeValue = (e) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
        if ("phoneNumber" === name) {
            setEmailStatusMessage("");
        }
    };

    const loginWithCredential = () => {
        // e.preventDefault();
        serverApis
            .login(formValue)
            .then((response) => {
                if (response.accessToken) {
                    // Read tokens
                    const token = response.accessToken;
                    const decodedToken = jwt(token);
                    const role = decodedToken.Role;
                    const name = decodedToken.Name;
                    const phoneNumber = decodedToken.sub;
                    const id = decodedToken.Id;
                    const roomId = decodedToken.RoomId;

                    cookies.set("token", token, { path: "/" });
                    localStorage.setItem("id", id);
                    localStorage.setItem("role", role);
                    localStorage.setItem("name", name);
                    localStorage.setItem("phoneNumber", phoneNumber);
                    localStorage.setItem("roomId", roomId);

                    if (role === "[ROLE_ADMIN]") {
                        navigate("/admin");
                    }
                    if (role === "[ROLE_USER]") {
                        navigate("/user");
                    }
                } else {
                    setPasswordStatusMessage(LoginErrorMessage.INVALID);
                }
            })
            .catch((e) => console.error(e));
    };

    const onLoginSubmit = (e) => {
        e.preventDefault();
        validateEmailAndPassword(formValue.phoneNumber, formValue.password) &&
            loginWithCredential();
    };

    const validateEmailAndPassword = (phoneNumber, password) => {
        let res = true;
        const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})\b$/;
        if (!phoneNumber) {
            setEmailStatusMessage(LoginErrorMessage.REQUIRED);
            res &&= false;
        } else if (!phoneRegex.test(phoneNumber)) {
            setEmailStatusMessage(
                "Số điện thoại bắt đầu (03,05,07,08,09) bao gồm 10 số"
            );
            res &&= false;
        } else {
            setEmailStatusMessage("");
            res &&= true;
        }
        if (!password) {
            setPasswordStatusMessage(LoginErrorMessage.REQUIRED);
            res &&= false;
        } else {
            setPasswordStatusMessage("");
            res &&= true;
        }
        return res;
    };

    return (
        <div style={{ backgroundImage: "url('/assets/img/BG_DMC.webp')" }}>
            <div className="container d-flex vh-100">
                <Center width="auto" m={"auto"}>
                    <Card maxW="sm" boxShadow={"lg"}>
                        <Stack
                            direction="row"
                            spacing={4}
                            className="w-100 justify-content-between mb-2"
                        >
                            <Button
                                leftIcon={<AiOutlineHome />}
                                onClick={() => {
                                    navigate(PATH.HOME.path);
                                }}
                            >
                                Trang chủ
                            </Button>
                        </Stack>
                        <form
                            mt="6"
                            spacing="3"
                            onSubmit={(e) => onLoginSubmit(e)}
                        >
                            <CardBody>
                                <Image
                                    src="/assets/img/DMC.png"
                                    alt="ảnh"
                                    w={"35%"}
                                    m={"auto"}
                                    borderRadius="lg"
                                />
                                <h4 className="mb-2 ">Chào mừng đến với DMC</h4>
                                <p className="mb-4">
                                    Đăng nhập tài khoản của bạn
                                </p>
                                <FormControl>
                                    <FormLabel>Số điện thoại</FormLabel>
                                    <Input
                                        type="text"
                                        placeholder="Nhập số điện thoại"
                                        mb={3}
                                        name="phoneNumber"
                                        htmlSize={40}
                                        value={formValue.phoneNumber}
                                        onChange={(e) => {
                                            onChangeValue(e);
                                        }}
                                    />
                                    <p className="error-message">
                                        {emailStatusMessage}
                                    </p>
                                </FormControl>
                                <FormControl>
                                    <Flex
                                        justifyContent={"space-between"}
                                        alignContent={"end"}
                                    >
                                        <FormLabel>Mật khẩu</FormLabel>
                                        <small
                                            onClick={() => {
                                                navigate(
                                                    PATH.LOGIN.forgotpassword
                                                );
                                            }}
                                            style={{ color: "#696cff" }}
                                            className="icon-hover"
                                        >
                                            Quên mật khẩu?
                                        </small>
                                    </Flex>
                                    <InputGroup>
                                        <Input
                                            pr="4.5rem"
                                            type={show ? "text" : "password"}
                                            placeholder="********"
                                            name="password"
                                            htmlSize={40}
                                            value={formValue.password}
                                            onChange={(e) => {
                                                onChangeValue(e);
                                            }}
                                        />
                                        <InputRightElement width="4.5rem">
                                            <Button
                                                h="1.75rem"
                                                onClick={handleClick}
                                                colorScheme="teal"
                                                variant="ghost"
                                            >
                                                {show ? (
                                                    <AiOutlineEye />
                                                ) : (
                                                    <AiOutlineEyeInvisible />
                                                )}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                    <p className="error-message">
                                        {passwordStatusMessage}
                                    </p>{" "}
                                </FormControl>
                            </CardBody>
                            <CardFooter justifyContent={"center"}>
                                <Button
                                    type="submit"
                                    w={"100%"}
                                    className="cl-696cff"
                                >
                                    Đăng nhập
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </Center>
            </div>
        </div>
    );
}
export default Login;
