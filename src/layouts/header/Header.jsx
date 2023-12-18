import {
    Avatar,
    Menu,
    MenuButton,
    MenuList,
    Button,
    MenuItem,
    MenuDivider,
    Image,
    Flex,
    ModalHeader,
    ModalOverlay,
    Modal,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Text,
    useDisclosure,
    Drawer,
    DrawerOverlay,
    DrawerContent,
} from "@chakra-ui/react";
import { AiOutlineLogout } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaListUl } from "react-icons/fa";
import "../header/header.css";
import SideBarReponsive from "../sidebar/SideBarReponsive";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Link, useNavigate } from "react-router-dom";
import PATH from "../../constants/path";
import { getRoleFromUserRole } from "../../util/format";

const cookies = new Cookies();

function Header(props) {
    const {
        isOpen: drawerIsOpen,
        onOpen: drawerOnOpen,
        onClose: drawerOnClose,
    } = useDisclosure();
    const {
        isOpen: modalIsOpen,
        onOpen: modalOnOpen,
        onClose: modalOnClose,
    } = useDisclosure();
    const navigate = useNavigate();
    const [userLocal, setUserLocal] = useState(() => {
        const name = localStorage.getItem("name");
        const role = localStorage.getItem("role");
        return { name: name, role: role };
    });

    // Hàm để kiểm tra kích thước màn hình và đóng Drawer nếu cần
    const checkScreenWidthAndCloseDrawer = () => {
        if (window.innerWidth >= 998 && drawerIsOpen) {
            drawerOnClose();
        }
    };

    // Sử dụng useEffect để bắt sự kiện thay đổi kích thước màn hình
    useEffect(() => {
        window.addEventListener("resize", checkScreenWidthAndCloseDrawer);
        return () => {
            window.removeEventListener(
                "resize",
                checkScreenWidthAndCloseDrawer
            );
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [drawerIsOpen]);

    const onLogout = () => {
        cookies.remove("token");
        localStorage.clear();

        window.location.reload();
    };

    return (
        <>
            <div style={{ position: "relative" }}>
                <Flex
                    p={"2"}
                    justify={"space-between"}
                    backgroundColor={"white"}
                    boxShadow={"md"}
                    borderRadius={"4px"}
                >
                    <div style={{ marginTop: "10px" }}>
                        <FaListUl
                            className="list-icon list-icon-hidden"
                            onClick={drawerOnOpen}
                            size={30}
                        />
                    </div>
                    <Drawer
                        isOpen={drawerIsOpen}
                        placement="left"
                        onClose={drawerOnClose}
                    >
                        <DrawerOverlay />
                        <DrawerContent style={{ width: "260px" }}>
                            <SideBarReponsive></SideBarReponsive>
                        </DrawerContent>
                    </Drawer>
                    <Menu>
                        <MenuButton>
                            <Avatar name={userLocal.name} />
                        </MenuButton>
                        <MenuList>
                            <MenuItem minH="40px">
                                <Avatar
                                    name={userLocal.name}
                                    className="me-2"
                                />

                                <Flex flexDirection="column">
                                    <Text m={0}>{userLocal.name}</Text>
                                    <Text
                                        m={0}
                                        color={"#a1acb8"}
                                        fontWeight={"500"}
                                    >
                                        {getRoleFromUserRole(userLocal.role)}
                                    </Text>
                                </Flex>
                            </MenuItem>
                            <MenuDivider />
                            <MenuItem
                                minH="40px"
                                onClick={() => {
                                    navigate("/changepassword");
                                }}
                            >
                                <RiLockPasswordLine size={20} />
                                <span style={{ marginLeft: "12px" }}>
                                    Thay đổi mật khẩu
                                </span>
                            </MenuItem>
                            <MenuDivider />
                            <MenuItem minH="40px" onClick={modalOnOpen}>
                                <AiOutlineLogout size={20} />
                                <span style={{ marginLeft: "12px" }}>
                                    Đăng xuất
                                </span>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>

                <Modal
                    blockScrollOnMount={false}
                    isOpen={modalIsOpen}
                    onClose={modalOnClose}
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Đăng xuất</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Text>Bạn có chắc muốn đăng xuất không?</Text>
                        </ModalBody>

                        <ModalFooter>
                            <Button
                                onClick={modalOnClose}
                                colorScheme="orange"
                                mr={3}
                                variant="outline"
                            >
                                Từ chối
                            </Button>
                            <Button colorScheme="orange" onClick={onLogout}>
                                Xác nhận
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </div>
            {props.children}
        </>
    );
}
export default Header;
