import "bootstrap/dist/css/bootstrap.css";
import { Box, Flex, Icon, useToast } from "@chakra-ui/react";
import { MdKeyboardArrowRight } from "react-icons/md";
import {
    Card,
    FormControl,
    CardBody,
    FormLabel,
    Input,
    Image,
    Button,
    Center,
} from "@chakra-ui/react";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { emailSchema } from "../../schemas/schema";
import serverApis from "../../api/serverApis";
import { useState } from "react";

function ForgotPassword() {
    // Xử lý toast message
    const toast = useToast();

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const {
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setErrors,
    } = useFormik({
        enableReinitialize: true,
        initialValues: { email: "" },
        validationSchema: emailSchema,
        onSubmit: (values, actions) => {
            sendEmail(values);
        },
    });

    const sendEmail = async (values) => {
        try {
            setLoading(true);
            await serverApis.getUserByEmail({
                params: {
                    email: values.email,
                },
            });

            setLoading(false);
            toast({
                title: "Đã gửi mật khẩu qua email vui lòng check email để lấy lại mật khẩu ",
                status: "success",
                isClosable: true,
                position: "top-right",
                duration: 3000,
            });
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setErrors({ email: "Email không tồn tại" }); // Đặt lỗi email
            }
            setLoading(false);
        }
    };
    return (
        <div style={{ backgroundImage: "url('/assets/img/BG_DMC.webp')" }}>
            <div className="container d-flex vh-100">
                <Center width="auto" m={"auto"}>
                    <Card maxW="sm" boxShadow={"lg"}>
                        <form mt="6" spacing="3">
                            <CardBody>
                                <Image
                                    src="/assets/img/DMC.png"
                                    alt="ảnh"
                                    w={"35%"}
                                    m={"auto"}
                                    borderRadius="lg"
                                />
                                <h4 className="mb-2 ">Quên mật khẩu? 🔒 </h4>
                                <p className="mb-4">
                                    Nhập email của bạn và chúng tôi sẽ gửi cho
                                    bạn mật khẩu mới qua email
                                </p>
                                <FormControl mb={5}>
                                    <FormLabel>Email</FormLabel>
                                    <Input
                                        placeholder="Nhập email"
                                        htmlSize={40}
                                        id="email"
                                        name="email"
                                        value={values.email || ""}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    ></Input>
                                    {errors.email && touched.email && (
                                        <small className="error">
                                            {errors.email}
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
                                    >
                                        Sending...
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={handleSubmit}
                                        w={"100%"}
                                        className="cl-696cff"
                                    >
                                        Gửi email
                                    </Button>
                                )}

                                <Flex
                                    align="center"
                                    justify="center"
                                    my={3}
                                    className="icon-hover"
                                >
                                    <Box
                                        color={"#696cff"}
                                        d="flex"
                                        alignItems="center"
                                        onClick={() => {
                                            navigate("/login");
                                        }}
                                    >
                                        <Icon
                                            as={MdKeyboardArrowRight}
                                            transform="scaleX(-1)"
                                            boxSize={5}
                                        />
                                        Quay lại đăng nhập
                                    </Box>
                                </Flex>
                            </CardBody>
                        </form>
                    </Card>
                </Center>
            </div>
        </div>
    );
}
export default ForgotPassword;
