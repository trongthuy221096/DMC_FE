import React, { useState, useEffect } from "react";
import {
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Center,
  Box,
  Container,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import serverApis from "../../api/serverApis";

const ChiTietPhong = () => {
  const { id } = useParams();
  const [room, setRoom] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getRoomDetail();
    // getEquipmentOfRoom();
  }, []);

  const getRoomDetail = () => {
    serverApis
      .getRoomDetail(id)
      .then((response) => {
        console.log(response)
        setRoom(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getEquipmentOfRoom = () => {
    serverApis
      .getEquipmentOfRoom(id)
      .then((response) => {
        console.log(response);
        setEquipment(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Container maxW="container.lg">
        <div>
          <Center h="100px">
            <Text fontSize="4xl" as="b">
              Chi Tiết Phòng
            </Text>
          </Center>
        </div>
        <div>
          <Box>
            <Text fontSize="xl" as="b">
              Phòng {room.roomName} - Khu {room.area} - Phòng {room.numberOfBed} giường
            </Text>
          </Box>
        </div>
        <div>
          <Center>
            <Text fontSize="xl" as="b" mt={10}>
              Danh sách thành viên
            </Text>
          </Center>
        </div>
        <TableContainer mt={5}>
          <Table variant="striped" colorScheme="orange">
            <Thead>
              <Tr>
                <Th>#</Th>
                <Th>Tên người dùng</Th>
                <Th>Email</Th>
                <Th>Số điện thoại</Th>
                <Th>Giới tính</Th>
              </Tr>
            </Thead>
            <Tbody>
              {room.users &&
                room.users.map((item, index) => (
                  <Tr key={item.userID}>
                    <Td>{index + 1}</Td>
                    <Td>{item.name}</Td>
                    <Td>{item.email}</Td>
                    <Td>{item.phoneNumber}</Td>
                    <Td>{item.gender}</Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
        <div>
          <Center>
            <Text fontSize="xl" as="b" mt={10}>
              Danh sách thiết bị
            </Text>
          </Center>
        </div>
        <TableContainer mt={5}>
          <Table variant="striped" colorScheme="orange">
            <Thead>
              <Tr>
                <Th>#</Th>
                <Th>Tên thiết bị</Th>
                <Th>Số lượng gốc</Th>
                <Th>Số lượng hiện tại</Th>
              </Tr>
            </Thead>
            <Tbody>
              {room.equipments &&
                room.equipments.map((item, index) => (
                  <Tr key={item.equipmentName}>
                    <Td>{index + 1}</Td>
                    <Td>{item.equipmentName}</Td>
                    <Td>{item.originalQuantity}</Td>
                    <Td>{item.curentQuatity}</Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default ChiTietPhong;
