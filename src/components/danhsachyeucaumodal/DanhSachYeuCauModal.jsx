import {
    Button,
    Center,
    Flex,
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

function DanhSachYeuCauModal({
    onClose,
    isOpen,
    request,
    confirmRequest,
    loading,
}) {
    return (
        <Modal onClose={onClose} isOpen={isOpen} isCentered size={"2xl"}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Xác nhận yêu cầu</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <hr />
                    <Flex my={3}>
                        <Center width="auto">
                            <Center as="b">Mã yêu cầu</Center>
                        </Center>
                        <Spacer />
                        <Input
                            readOnly
                            variant="filled"
                            value={request ? request.requestID : ""}
                            htmlSize={40}
                            width="auto"
                        ></Input>
                    </Flex>
                    <Flex my={3}>
                        <Center width="auto">
                            <Center as="b">Tên phòng</Center>
                        </Center>
                        <Spacer />
                        <Input
                            readOnly
                            value={request ? request.roomName : ""}
                            variant="filled"
                            htmlSize={40}
                            width="auto"
                        ></Input>
                    </Flex>
                    <Flex my={3}>
                        <Center width="auto">
                            <Center as="b">Tên người dùng</Center>
                        </Center>
                        <Spacer />
                        <Input
                            readOnly
                            variant="filled"
                            value={request ? request.userName : ""}
                            htmlSize={40}
                            width="auto"
                        ></Input>
                    </Flex>
                    <Flex my={3}>
                        <Center width="auto">
                            <Center as="b">Trạng thái</Center>
                        </Center>
                        <Spacer />
                        <Input
                            readOnly
                            variant="filled"
                            value={request ? request.requestStatus : ""}
                            htmlSize={40}
                            width="auto"
                        ></Input>
                    </Flex>
                    <Flex my={3}>
                        <Center width="auto">
                            <Center as="b">Nội dung</Center>
                        </Center>
                        <Spacer />
                        <Input
                            readOnly
                            variant="filled"
                            value={request ? request.requestContent : ""}
                            htmlSize={40}
                            width="auto"
                        ></Input>
                    </Flex>
                    <Flex my={3}>
                        <Center width="auto">
                            <Center as="b">Khu</Center>
                        </Center>
                        <Spacer />
                        <Input
                            readOnly
                            variant="filled"
                            value={request ? request.area : ""}
                            htmlSize={40}
                            width="auto"
                        ></Input>
                    </Flex>
                    <Flex my={3}>
                        <Center width="auto">
                            <Center as="b">Ngày tạo</Center>
                        </Center>
                        <Spacer />
                        <Input
                            readOnly
                            variant="filled"
                            value={request ? request.dateOfCreate : ""}
                            htmlSize={40}
                            width="auto"
                        ></Input>
                    </Flex>
                    <Flex my={3}>
                        <Center width="auto">
                            <Center as="b">Ngày cập nhập</Center>
                        </Center>
                        <Spacer />
                        <Input
                            readOnly
                            variant="filled"
                            value={request ? request.dateOfUpdate : ""}
                            htmlSize={40}
                            width="auto"
                        ></Input>
                    </Flex>
                    <hr />
                </ModalBody>
                <ModalFooter>
                    {request &&
                    (request.requestStatus === "accepted" ||
                        request.requestStatus === "refused") ? (
                        <Button colorScheme="orange" onClick={onClose} me={2}>
                            Đã Confirm
                        </Button>
                    ) : loading ? (
                        <Button
                            isLoading
                            loadingText="Loading"
                            spinnerPlacement="start"
                            className="cl-696cff"
                        >
                            Sending...
                        </Button>
                    ) : (
                        <>
                            <Button
                                colorScheme="orange"
                                variant="outline"
                                onClick={() => {
                                    confirmRequest({
                                        requestStatus: "refused",
                                        id: request.requestID,
                                    });
                                }}
                                me={2}
                            >
                                Từ chối
                            </Button>
                            <Button
                                colorScheme="orange"
                                onClick={() => {
                                    confirmRequest({
                                        requestStatus: "accepted",
                                        id: request.requestID,
                                    });
                                }}
                            >
                                Xác nhận
                            </Button>
                        </>
                    )}
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
export default DanhSachYeuCauModal;
