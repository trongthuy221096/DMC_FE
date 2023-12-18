import { React, useState, useEffect } from "react";
import { useFormik } from "formik";

import {
  Spacer,
  IconButton,
  Text,
  Flex,
  Input,
  Button,
  Table,
  Thead,
  Tbody,
  Select,
  Tr,
  Th,
  Td,
  TableContainer,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  useToast,
  Tooltip,
} from "@chakra-ui/react";

import { FaPlus, FaTrash } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { LuArrowDownWideNarrow, LuArrowUpWideNarrow } from "react-icons/lu";
import serverApis from "../../api/serverApis";
import { equipmentRoomSchema } from "../../schemas/schema";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
function ThietBiPhong() {
  const [equipmentRooms, setEquipmentRooms] = useState([]);
  const [equipmentRoom, setEquipmentRoom] = useState({});
  const [rooms, setRooms] = useState([]);
  const [equipmentID, setEquipmentID] = useState([]);
  const [page, setPage] = useState({
    pageSize: 5,
    currentPage: 1,
  });
  const initialEquipmentRoom = {
    roomID: null,
    equipmentID: null,
    originalQuantity: null,
    curentQuatity: null,
  };
  // Khai báo xử lý phần tử có Th có trong table
  const initialColumns = [
    { name: "roomName", ten: "Tên phòng", show: false },
    { name: "equipmentID", ten: "Mã thiết bị", show: false },
    { name: "equipmentName", ten: "Tên thiết bị", show: false },
    { name: "originalQuantity", ten: "Số lượng gốc", show: false },
    { name: "curentQuatity", ten: "số lượng hiện tại", show: false },
  ];
  const [columns, setColumns] = useState(initialColumns);
  const [selectedColumn, setSelectedColumn] = useState({
    name: null,
    show: false,
  });
  // Hàm xử lý sự kiện khi nhấp vào tiêu đề cột để sắp xếp
  const handleSort = () => {
    const updatedListRequest = { ...equipmentRooms };
    updatedListRequest.content = _.orderBy(
      updatedListRequest.content,
      [selectedColumn.name],
      [selectedColumn.show === false ? "asc" : "desc"]
    );
    setEquipmentRooms(updatedListRequest);
  };
  // Xử lý toast message
  const toast = useToast();

  // Hàm xử lý sự kiện khi nhấp vào biểu tượng
  const handleClick = (columnName) => {
    // Kiểm tra nếu cột đang được chọn là cột hiện tại
    if (selectedColumn.name === columnName) {
      // Đảo ngược trạng thái hiển thị của cột hiện tại
      const updatedSelectedColumn = {
        ...selectedColumn,
        show: !selectedColumn.show,
      };
      setSelectedColumn(updatedSelectedColumn);
    } else {
      // Nếu không phải là cột đang được chọn trước đó, đặt cột hiện tại là cột mới
      setSelectedColumn({ name: columnName, show: true });
    }

    // Cập nhật trạng thái hiển thị của các cột dựa trên cột hiện tại
    const updatedColumns = columns.map((column) => ({
      ...column,
      show: column.name === columnName && !column.show, // Đặt show của cột được chọn thành true, các cột khác thành false
    }));

    setColumns(updatedColumns);
  };
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setValues,
    setTouched,
  } = useFormik({
    enableReinitialize: true,
    initialValues: initialEquipmentRoom,
    validationSchema: equipmentRoomSchema,
    onSubmit: (values, actions) => {
      if (values.equipmentID) {
        updateEquipmentRoom();
        setTouched({})
      } else {
        saveEquipmentRoom();
        setTouched({});
        onAddClose();
      }
    },
  });

  const navigate = useNavigate();
  //Lấy dữ liệu từ database in ra màn hình
  const getList = (values) => {
    serverApis
      .getListEquipmentRoom({
        params: {
          // Truyền tham số vào URL dưới dạng object params
          page: page.currentPage,
          pageSize: page.pageSize,
          valueSearch: values.valueSearch,
        },
      })
      .then((data) => {
        // Cập nhật state với dữ liệu nhận được
        setEquipmentRooms(data);
        setColumns(initialColumns);
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        setEquipmentRooms({});
      });
  };
  // phân trang
  const pageNumbers = [];
  for (let i = 1; i <= equipmentRooms.totalPages; i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    handleSort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedColumn]);

  //chạy lần đầu
  useEffect(() => {
    getList(values);
    loadListRoom();
    loadListEquipment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  //Call api getListRoom
  const loadListRoom = () => {
    serverApis
      .getListRoom()
      .then((response) => {
        // Cập nhật state với dữ liệu nhận được
        setRooms(response);
        console.log(response);
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.log(error);
      });
  };

  const handleCloseClick = () => {
    setEquipmentRoom(initialEquipmentRoom);
    onAddClose();
    onEditClose();
    onDeleteClose();
  };

  //Call api getListEquipmentID
  const loadListEquipment = () => {
    serverApis
      .getListEquipmentID()
      .then((response) => {
        // Cập nhật state với dữ liệu nhận được
        setEquipmentID(response);
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.log(error);
      });
  };
  //Thêm mới EquipmentRoom
  const saveEquipmentRoom = () => {
    console.log(values);
    serverApis
      .createEquipmentRoom(values)
      .then((response) => {
        console.log(response);
        toast({
          title: "Thêm thành công",
          status: "success",
          isClosable: true,
          position: "top-right",
          duration: 2000,
        });
        setValues(initialEquipmentRoom);
        getList(values);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          navigate("/404");
        } else if (error.response && error.response.status === 500) {
          toast({
            title: "ID của phòng và thiết bị đã tồn tại",
            status: "error",
            isClosable: true,
            position: "top-right",
            duration: 2000,
          });
        } else {
          toast({
            title: "Có lỗi trong quá trình xử lý",
            status: "error",
            isClosable: true,
            position: "top-right",
            duration: 2000,
          });
        }
      });
  };

  const updateEquipmentRoom = () => {
    serverApis
      .updateEquipmentRoom(values)
      .then((response) => {
        console.log(response);
        toast({
          title: "Cập nhập thành công",
          status: "success",
          isClosable: true,
          position: "top-right",
          duration: 2000,
        });
        setValues(initialEquipmentRoom);
        getList(values);
        onEditClose();
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          navigate("/404");
        } else if (error.response && error.response.status === 500) {
          navigate("/500");
        } else {
          toast({
            title: "Có lỗi trong quá trình xử lý",
            status: "error",
            isClosable: true,
            position: "top-right",
            duration: 2000,
          });
        }
      });
  };

  const deleteEquipmentRoom = () => {
    serverApis
      .deleteEquipmentRoom({
        params: {
          // Truyền tham số vào URL dưới dạng object params
          equipmentId: equipmentRoom.equipmentID,
          roomId: equipmentRoom.roomID,
        },
      })
      .then((response) => {
        console.log(response);
        toast({
          title: "Xóa thành công",
          status: "success",
          isClosable: true,
          position: "top-right",
          duration: 2000,
        });
        setValues(initialEquipmentRoom);
        getList(values);
        onDeleteClose();
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 404) {
          navigate("/404");
        } else if (error.response && error.response.status === 500) {
          navigate("/500");
        } else {
          toast({
            title: "Có lỗi trong quá trình xử lý",
            status: "error",
            isClosable: true,
            position: "top-right",
            duration: 2000,
          });
        }
      });
  };

  const handleOpenClick = (item) => {
    setEquipmentRoom(item);
    setValues(item);
    onEditOpen();
  };

  const handleDeleteClick = (item) => {
    setEquipmentRoom(item);
    onDeleteOpen();
  };

  //Lấy EquipmentID cho select
  let equipmentIDs = [];
  if (equipmentID) {
    equipmentIDs = equipmentID.map((equipment) => ({
      id: equipment.equipmentID,
      name: equipment.equipmentName,
    }));
  }

  //Lấy RoomID cho select
  let roomsList = [];
  if (rooms) {
    roomsList = rooms.map((room) => ({
      id: room.roomID,
      name: room.roomName,
    }));
  }
  return (
    <div className="border-1 p-3 rounded-2">
      <div>
        <Center h="200px">
          <Text fontSize="4xl" as="b">
            Danh Sách Thiết Bị Của Từng Phòng
          </Text>
        </Center>
      </div>
      <div>
        <div>
          <Flex>
            <Spacer />

            <Button colorScheme="orange" size="md" onClick={onAddOpen}>
              <Center>
                <FaPlus size={12} />
                &nbsp;Thêm mới
              </Center>
            </Button>
          </Flex>
        </div>

        <div>
          <TableContainer mt={10}>
            <Table variant="striped" size="md" colorScheme="orange">
              <Thead>
                <Tr>
                  <Th>#</Th>
                  {columns.map((column, index) => (
                    <Th
                      key={index}
                      className="icon-hover"
                      onClick={() => {
                        handleClick(column.name);
                      }}
                    >
                      {column.ten}{" "}
                      {column.show ? (
                        <LuArrowDownWideNarrow
                          size={16}
                          style={{ display: "inline-block" }}
                        />
                      ) : (
                        <LuArrowUpWideNarrow
                          size={16}
                          style={{ display: "inline-block" }}
                        />
                      )}
                    </Th>
                  ))}
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {equipmentRooms.content && equipmentRooms.content.length > 0 ? (
                  equipmentRooms.content.map((equipment, index) => (
                    <Tr key={index}>
                      <Td>
                        {page.pageSize * (page.currentPage - 1) + index + 1}
                      </Td>
                      <Td>{equipment.roomName}</Td>
                      <Td>{equipment.equipmentID}</Td>
                      <Td>{equipment.equipmentName}</Td>
                      <Td>{equipment.originalQuantity}</Td>
                      <Td>{equipment.curentQuatity}</Td>
                      <Td>
                        <Flex justify={"start"}>
                          <Tooltip label="Chi tiết" size={'md'} hasArrow placement="bottom-start">
                            <span>
                              <AiOutlineEye
                                className="icon-hover"
                                style={{ marginRight: "4px" }}
                                color={"#ea580c"}
                                onClick={() => handleOpenClick(equipment)}
                                size={24}
                              />
                            </span>
                          </Tooltip>
                          <Tooltip label="Xóa" size={'md'} hasArrow placement="bottom-start">
                            <span>
                              <FaTrash
                                className="icon-hover"
                                color={"#ea580c"}
                                onClick={() => handleDeleteClick(equipment)}
                                size={21}
                              />
                            </span>
                          </Tooltip>
                        </Flex>
                      </Td>
                    </Tr>
                  ))
                ) : (
                  <Tr>
                    <Td colSpan={7}>Không có danh sách nào.</Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </TableContainer>
          <Modal isOpen={isAddOpen} onClose={onAddClose} size="xl">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader fontSize="3xl">
                Thêm Mới Thiết Bị Của Phòng
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl>
                  <FormLabel>Tên Phòng</FormLabel>
                  <Select
                    value={values.roomID || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="roomID"
                    name="roomID"
                    placeholder="Chọn phòng"
                  >
                    {roomsList.map((id) => (
                      <option key={id.id} value={id.id}>
                        {id.name}
                      </option>
                    ))}
                  </Select>
                  {errors.roomID && touched.roomID && (
                    <small className="error">{errors.roomID}</small>
                  )}
                  <FormLabel mt={4}>Tên Thiết bị</FormLabel>
                  <Select
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="equipmentID"
                    name="equipmentID"
                    value={values.equipmentID || ""}
                    placeholder="Chọn thiết bị"
                  >
                    {equipmentIDs.map((equipment) => (
                      <option key={equipment.id} value={equipment.id}>
                        {equipment.name}
                      </option>
                    ))}
                  </Select>
                  {errors.equipmentID && touched.equipmentID && (
                    <small className="error">{errors.equipmentID}</small>
                  )}

                  <FormLabel mt={4}>Số Lượng Ban Đầu</FormLabel>
                  <Input
                    value={values.originalQuantity || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="originalQuantity"
                    name="originalQuantity"
                    placeholder="Nhập số lượng thiết bị ban đầu"
                  />
                  {errors.originalQuantity && touched.originalQuantity && (
                    <small className="error">{errors.originalQuantity}</small>
                  )}

                  <FormLabel mt={4}>Số Lượng Hiện Tại</FormLabel>
                  <Input
                    value={values.curentQuatity || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="curentQuatity"
                    name="curentQuatity"
                    placeholder="Nhập số lượng thiết bị hiện tại"
                  />
                  {errors.curentQuatity && touched.curentQuatity && (
                    <small className="error">{errors.curentQuatity}</small>
                  )}
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="orange"
                  variant="outline"
                  mr={3}
                  onClick={handleCloseClick}
                >
                  Hủy
                </Button>
                <Button onClick={handleSubmit} colorScheme="orange">
                  Thêm
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <Modal isOpen={isEditOpen} onClose={onEditClose} size="xl">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader fontSize="3xl">
                Cập Nhật Thiết Bị Của Phòng
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl>
                  <FormLabel>Tên Phòng</FormLabel>
                  <Input
                    value={equipmentRoom ? equipmentRoom.roomName : ""}
                    onChange={(e) =>
                      setEquipmentRoom({
                        ...equipmentRoom,
                        roomID: e.target.value,
                      })
                    }
                    id="roomID"
                    name="roomID"
                    placeholder="Chọn phòng"
                    readOnly
                  ></Input>
                  <FormLabel mt={4}>Tên Thiết bị</FormLabel>
                  <Input
                    onChange={(e) =>
                      setEquipmentRoom({
                        ...equipmentRoom,
                        equipmentID: e.target.value,
                      })
                    }
                    id="equipmentID"
                    name="equipmentID"
                    value={equipmentRoom ? equipmentRoom.equipmentName : ""}
                    placeholder="Chọn thiết bị"
                    readOnly
                  ></Input>

                  <FormLabel mt={4}>Số Lượng Ban Đầu</FormLabel>
                  <Input
                    value={values.originalQuantity || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="originalQuantity"
                    name="originalQuantity"
                    placeholder="Nhập số lượng thiết bị ban đầu"
                  />
                  {errors.originalQuantity && touched.originalQuantity && (
                    <small className="error">{errors.originalQuantity}</small>
                  )}

                  <FormLabel mt={4}>Số Lượng Hiện Tại</FormLabel>
                  <Input
                    value={values.curentQuatity || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="curentQuatity"
                    name="curentQuatity"
                    placeholder="Nhập số lượng thiết bị hiện tại"
                  />
                  {errors.curentQuatity && touched.curentQuatity && (
                    <small className="error">{errors.curentQuatity}</small>
                  )}
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="orange"
                  variant="outline"
                  mr={3}
                  onClick={handleCloseClick}
                >
                  Hủy
                </Button>
                <Button onClick={handleSubmit} colorScheme="orange">
                  Cập Nhật
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <Modal isOpen={isDeleteOpen} onClose={onDeleteClose} size="xl">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader fontSize="3xl">Xóa Thiết Bị</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>Bạn có muốn xóa thiết bị này không!</Text>
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="orange"
                  variant="outline"
                  mr={3}
                  onClick={handleCloseClick}
                >
                  Hủy
                </Button>
                <Button colorScheme="orange" onClick={deleteEquipmentRoom}>
                  Xóa
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <div className="d-flex justify-content-end mt-3">
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li
                  className={`page-item ${page.currentPage === 1 ? "disabled" : ""
                    }`}
                >
                  <button
                    className="page-link"
                    onClick={() =>
                      setPage({
                        ...page,
                        currentPage: page.currentPage - 1,
                      })
                    }
                  >
                    Trước
                  </button>
                </li>

                {pageNumbers.map((pageNum) => (
                  <li
                    key={pageNum}
                    className={`page-item ${page.currentPage === pageNum ? "active" : ""
                      }`}
                  >
                    <button
                      className="page-link"
                      href="#"
                      onClick={() =>
                        setPage({
                          ...page,
                          currentPage: pageNum,
                        })
                      }
                    >
                      {pageNum}
                    </button>
                  </li>
                ))}

                <li
                  className={`page-item ${page.currentPage === equipmentRooms.totalPages
                    ? "disabled"
                    : ""
                    }`}
                >
                  <button
                    className="page-link"
                    onClick={() =>
                      setPage({
                        ...page,
                        currentPage: page.currentPage + 1,
                      })
                    }
                  >
                    Sau
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThietBiPhong;
