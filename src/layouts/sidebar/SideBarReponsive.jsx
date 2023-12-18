import {
    Box,
    Flex,
    Link,
    VStack,
    ListItem,
    Image,
    UnorderedList,
} from "@chakra-ui/react";

import "../sidebar/sidebar.css";
import PATH from "../../constants/path";
import { useLocation, useNavigate } from "react-router-dom";
import { MdOutlineMeetingRoom } from "react-icons/md";
import { PiUserList } from "react-icons/pi";
import { LuArmchair } from "react-icons/lu";
import { RiBillLine, RiWaterFlashLine } from "react-icons/ri";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
function SideBarReponsive() {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <div>
            <Box
                bg="white"
                w="260px"
                h="100%"
                position="fixed"
                top="0"
                left="0"
                overflowY="auto"
                boxShadow="xl"
            >
                <VStack spacing={4} align="start" m={4}>
                    <Image
                        m={"auto"}
                        boxSize="100px"
                        objectFit="cover"
                        src="/assets/img/DMC.png"
                        alt="Dan Abramov"
                    ></Image>

                    <UnorderedList
                        listStyleType="none"
                        p={0}
                        m={0}
                        overflow={"hidden"}
                        w={"100%"}
                    >
                        <ListItem
                            className={`list-item ${location.pathname === PATH.PHONG.path
                                    ? "active-custom"
                                    : ""
                                }`}
                            onClick={() => {
                                navigate(PATH.PHONG.path);
                            }}
                        >
                            <Flex p={3}>
                                <MdOutlineMeetingRoom size={22} />
                                <Link
                                    fontWeight={"bold"}
                                    size={"16px"}
                                    style={{ textDecoration: "none" }}
                                >
                                    &ensp; Quản lý phòng
                                </Link>
                            </Flex>
                        </ListItem>

                        <ListItem
                            className={`list-item ${location.pathname === PATH.NGUOITHUE.path
                                    ? "active-custom"
                                    : ""
                                }`}
                            onClick={() => {
                                navigate(PATH.NGUOITHUE.path);
                            }}
                        >
                            <Flex p={3}>
                                <PiUserList size={22} />
                                <Link
                                    fontWeight={"bold"}
                                    size={"16px"}
                                    style={{ textDecoration: "none" }}
                                >
                                    &ensp; Quản lý người thuê
                                </Link>
                            </Flex>
                        </ListItem>
                        <ListItem
                            className={`list-item ${location.pathname === PATH.THIETBI.path
                                    ? "active-custom"
                                    : ""
                                }`}
                            onClick={() => {
                                navigate(PATH.THIETBI.path);
                            }}
                        >
                            <Flex p={3}>
                                <LuArmchair size={22} />
                                <Link
                                    fontWeight={"bold"}
                                    size={"16px"}
                                    style={{ textDecoration: "none" }}
                                >
                                    &ensp; Quản lý thiết bị
                                </Link>
                            </Flex>
                        </ListItem>
                        <ListItem
                            className={`list-item ${location.pathname === PATH.DICHVU.path
                                    ? "active-custom"
                                    : ""
                                }`}
                            onClick={() => {
                                navigate(PATH.DICHVU.path);
                            }}
                        >
                            <Flex p={3}>
                                <RiWaterFlashLine size={22} />
                                <Link
                                    fontWeight={"bold"}
                                    size={"16px"}
                                    style={{ textDecoration: "none" }}
                                >
                                    &ensp; Quản lý dịch vụ
                                </Link>
                            </Flex>
                        </ListItem>
                        <ListItem
                            className={`list-item ${location.pathname === PATH.YEUCAU.path
                                    ? "active-custom"
                                    : ""
                                }`}
                            onClick={() => {
                                navigate(PATH.YEUCAU.path);
                            }}
                        >
                            <Flex p={3}>
                                <VscGitPullRequestGoToChanges size={22} />
                                <Link
                                    fontWeight={"bold"}
                                    size={"16px"}
                                    style={{ textDecoration: "none" }}
                                >
                                    &ensp; Quản lý yêu cầu
                                </Link>
                            </Flex>
                        </ListItem>
                        <ListItem
                            className={`list-item ${location.pathname === PATH.HOADON.path
                                    ? "active-custom"
                                    : ""
                                }`}
                            onClick={() => {
                                navigate(PATH.HOADON.path);
                            }}
                        >
                            <Flex p={3}>
                                <RiBillLine size={22} />
                                <Link
                                    fontWeight={"bold"}
                                    size={"16px"}
                                    style={{ textDecoration: "none" }}
                                >
                                    &ensp; Quản lý hóa đơn
                                </Link>
                            </Flex>
                        </ListItem>
                    </UnorderedList>
                </VStack>
            </Box>
        </div>
    );
}
export default SideBarReponsive;
