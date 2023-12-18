import {
    Button,
    Text,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Box,
} from "@chakra-ui/react";

function DeleteYeuCauModal({ onClose, isOpen, deleteRequest }) {
    return (
        <Modal onClose={onClose} isOpen={isOpen} size={"lg"}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Xóa yêu cầu</ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <Box>
                        <Text>
                            Bạn có chắc muốn xóa, sau khi xóa không thể khôi
                            phục !
                        </Text>
                    </Box>
                </ModalBody>
                <ModalFooter>
                    <Button
                        colorScheme="orange"
                        variant="outline"
                        onClick={() => {
                            onClose();
                        }}
                        me={2}
                    >
                        Từ chối
                    </Button>
                    <Button
                        colorScheme="orange"
                        onClick={() => {
                            deleteRequest();
                        }}
                    >
                        Xác nhận
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
export default DeleteYeuCauModal;
