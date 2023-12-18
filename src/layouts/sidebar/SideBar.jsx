import { Box, Flex, Link, VStack, ListItem, Image, UnorderedList } from "@chakra-ui/react";
import { LuArmchair } from "react-icons/lu";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { PiUserList } from "react-icons/pi";
import { LiaBedSolid } from "react-icons/lia";
import { MdOutlineMeetingRoom } from "react-icons/md";
import { RiWaterFlashLine, RiBillLine } from "react-icons/ri";
import { BiSolidUserDetail } from "react-icons/bi";
import "../sidebar/sidebar.css";
import PATH from "../../constants/path";
import { useNavigate, useLocation } from "react-router-dom";
import ROLES from "../../constants/roles";

function SideBar() {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const location = useLocation();

  const adminLayout = () => {
    return (
      <UnorderedList listStyleType="none" p={0} m={0} overflow={"hidden"} w={"100%"}>
        <ListItem
          className={`list-item ${location.pathname === PATH.PHONG.path ? "active-custom" : ""}`}
          onClick={() => {
            navigate(PATH.PHONG.path);
          }}
        >
          <Flex p={3}>
            <MdOutlineMeetingRoom size={22} />
            <Link fontWeight={"bold"} size={"16px"} style={{ textDecoration: "none" }}>
              &ensp; Quản lý phòng
            </Link>
          </Flex>
        </ListItem>

        <ListItem
          className={`list-item ${location.pathname === PATH.NGUOITHUE.path ? "active-custom" : ""
            }`}
          onClick={() => {
            navigate(PATH.NGUOITHUE.path);
          }}
        >
          <Flex p={3}>
            <PiUserList size={22} />
            <Link fontWeight={"bold"} size={"16px"} style={{ textDecoration: "none" }}>
              &ensp; Quản lý người thuê
            </Link>
          </Flex>
        </ListItem>
        <ListItem
          className={`list-item ${location.pathname === PATH.THIETBI.path ? "active-custom" : ""}`}
          onClick={() => {
            navigate(PATH.THIETBI.path);
          }}
        >
          <Flex p={3}>
            <LuArmchair size={22} />
            <Link fontWeight={"bold"} size={"16px"} style={{ textDecoration: "none" }}>
              &ensp; Quản lý thiết bị
            </Link>
          </Flex>
        </ListItem>
        <ListItem
          className={`list-item ${location.pathname === PATH.THIETBICUAPHONG.path ? "active-custom" : ""}`}
          onClick={() => {
            navigate(PATH.THIETBICUAPHONG.path);
          }}
        >
          <Flex p={3}>
            <LiaBedSolid size={22} />
            <Link fontWeight={"bold"} size={"16px"} style={{ textDecoration: "none" }}>
              &ensp; Thiết bị của phòng
            </Link>
          </Flex>
        </ListItem>
        <ListItem
          className={`list-item ${location.pathname === PATH.DICHVU.path ? "active-custom" : ""}`}
          onClick={() => {
            navigate(PATH.DICHVU.path);
          }}
        >
          <Flex p={3}>
            <RiWaterFlashLine size={22} />
            <Link fontWeight={"bold"} size={"16px"} style={{ textDecoration: "none" }}>
              &ensp; Quản lý dịch vụ
            </Link>
          </Flex>
        </ListItem>
        <ListItem
          className={`list-item ${location.pathname === PATH.YEUCAU.path ? "active-custom" : ""}`}
          onClick={() => {
            navigate(PATH.YEUCAU.path);
          }}
        >
          <Flex p={3}>
            <VscGitPullRequestGoToChanges size={22} />
            <Link fontWeight={"bold"} size={"16px"} style={{ textDecoration: "none" }}>
              &ensp; Quản lý yêu cầu
            </Link>
          </Flex>
        </ListItem>
        <ListItem
          className={`list-item ${location.pathname === PATH.HOADON.path ? "active-custom" : ""}`}
          onClick={() => {
            navigate(PATH.HOADON.path);
          }}
        >
          <Flex p={3}>
            <RiBillLine size={22} />
            <Link fontWeight={"bold"} size={"16px"} style={{ textDecoration: "none" }}>
              &ensp; Quản lý hóa đơn
            </Link>
          </Flex>
        </ListItem>
      </UnorderedList>
    );
  };

  const userLayout = () => {
    const userLocal = {
      id: localStorage.getItem('id'),
      roomId: localStorage.getItem('roomId')
    }
    console.log(userLocal)
    return (
      <UnorderedList listStyleType="none" p={0} m={0} overflow={"hidden"} w={"100%"}>
        <ListItem
          className={`list-item ${location.pathname === PATH.THONGTINCANHAN.path ? "active-custom" : ""
            }`}
          onClick={() => {
            navigate("/user/" + userLocal.id);
          }}
        >
          <Flex p={3}>
            <BiSolidUserDetail size={22} />
            <Link fontWeight={"bold"} size={"16px"} style={{ textDecoration: "none" }}>
              &ensp; Thông tin cá nhân
            </Link>
          </Flex>
        </ListItem>

        <ListItem
          className={`list-item ${location.pathname === PATH.PHONG.DETAIL ? "active-custom" : ""
            }`}
          onClick={() => {
            navigate("/room/" + userLocal.roomId);
          }}
        >
          <Flex p={3}>
            <MdOutlineMeetingRoom size={22} />
            <Link fontWeight={"bold"} size={"16px"} style={{ textDecoration: "none" }}>
              &ensp; Thông tin phòng
            </Link>
          </Flex>
        </ListItem>

        <ListItem
          className={`list-item ${location.pathname === PATH.USER.HOADON ? "active-custom" : ""}`}
          onClick={() => {
            navigate(PATH.USER.HOADON);
          }}
        >
          <Flex p={3}>
            <RiBillLine size={22} />
            <Link fontWeight={"bold"} size={"16px"} style={{ textDecoration: "none" }}>
              &ensp; Hóa đơn
            </Link>
          </Flex>
        </ListItem>
      </UnorderedList>
    );
  };

  return (
    <Box
      bg="white"
      w="260px"
      h="100%"
      position="fixed"
      top="0"
      left="0"
      overflowY="auto"
      boxShadow="xl"
      className="sidebar-hidden"
    >
      <VStack spacing={4} align="start" m={4}>
        <Image
          m={"auto"}
          boxSize="100px"
          objectFit="cover"
          src="/assets/img/DMC.png"
          alt="Dan Abramov"
        ></Image>
        {role === ROLES.ADMIN ? adminLayout() : userLayout()}
      </VStack>
    </Box>
  );
}
export default SideBar;
