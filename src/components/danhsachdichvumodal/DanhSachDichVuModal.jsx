import {
    Box,
    Button,
    Center,
    Flex,
    FormControl,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spacer,
} from "@chakra-ui/react";

function DanhSachDichVuModal({
    isOpen,
    handleCloseClick,
    service,
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    handleSubmit,
}) {
    return (
        <Modal
            onClose={handleCloseClick}
            isOpen={isOpen}
            isCentered
            size={"2xl"}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Chi tiết dịch vụ</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <hr />
                    <FormControl>
                        <Input
                            type="hidden"
                            value={service ? service.serviceID : ""}
                            variant="filled"
                            htmlSize={40}
                            width="auto"
                        ></Input>

                        <Flex my={3} flexWrap="wrap">
                            <Center width="auto">
                                <Center as="b">Tên dịch vụ</Center>
                            </Center>
                            <Spacer />
                            <Box flex={1}>
                                <Input
                                    htmlSize={40}
                                    width="auto"
                                    id="serviceName"
                                    name="serviceName"
                                    value={values.serviceName || ""}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                ></Input>
                                {errors.serviceName && touched.serviceName && (
                                    <small className="error">
                                        {errors.serviceName}
                                    </small>
                                )}
                            </Box>
                        </Flex>
                        <Flex my={3} flexWrap="wrap">
                            <Center width="auto">
                                <Center as="b">Giá</Center>
                            </Center>
                            <Spacer />
                            <Box flex={1}>
                                <Input
                                    htmlSize={40}
                                    width="auto"
                                    id="price"
                                    name="price"
                                    value={values.price || ""}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                ></Input>
                                {errors.price && touched.price && (
                                    <small className="error">
                                        {errors.price}
                                    </small>
                                )}
                            </Box>
                        </Flex>
                        <Flex my={3} flexWrap="wrap">
                            <Center width="auto">
                                <Center as="b">Đơn vị tính</Center>
                            </Center>
                            <Spacer />
                            <Box flex={1}>
                                <Input
                                    htmlSize={40}
                                    width="auto"
                                    id="unit"
                                    name="unit"
                                    value={values.unit || ""}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                ></Input>
                                {errors.unit && touched.unit && (
                                    <small className="error">
                                        {errors.unit}
                                    </small>
                                )}
                            </Box>
                        </Flex>
                    </FormControl>
                    <hr />
                </ModalBody>
                <ModalFooter>
                    <Button
                        onClick={handleCloseClick}
                        me={2}
                        colorScheme="orange"
                        variant="outline"
                    >
                        Đóng
                    </Button>
                    <Button onClick={handleSubmit} colorScheme="orange">
                        Cập nhập
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
export default DanhSachDichVuModal;
