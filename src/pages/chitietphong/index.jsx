import React, { useState } from "react";
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
  Button,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import serverApis from "../../api/serverApis";
import { GrLinkPrevious } from "react-icons/gr";

const ChiTietPhong = () => {
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUsersOfRoom();
  }, []);

  const getUsersOfRoom = () => {
    serverApis
      .getUsersOfRoom(id)
      .then((response) => {
        setUsers(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Container maxW="container.lg">
        <Button
          mt={10}
          leftIcon={<GrLinkPrevious />}
          onClick={() => {
            navigate("/room");
          }}
        >
          Quay lại
        </Button>
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
              Phòng A101
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
                <Th>User ID</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Phone Number</Th>
                <Th>Gender</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users &&
                users.map((item) => (
                  <Tr key={item.userID}>
                    <Td>{item.userID}</Td>
                    <Td>{item.name}</Td>
                    <Td>{item.email}</Td>
                    <Td>{item.phoneNumber}</Td>
                    <Td>{item.gender}</Td>
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
