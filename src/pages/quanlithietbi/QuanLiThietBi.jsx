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
  Box,
  InputGroup,
  InputRightAddon,
  Tooltip,
} from "@chakra-ui/react";

import { FaPlus, FaTrash } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { LuArrowDownWideNarrow, LuArrowUpWideNarrow } from "react-icons/lu";
import { equipmentSchema } from "../../schemas/schema";
import serverApis from "../../api/serverApis";
import _ from "lodash";
import { useNavigate } from "react-router-dom";

const QuanLiThietBi = () => {
  const [equipments, setEquipments] = useState([]);
  const [page, setPage] = useState({
    pageSize: 5,
    currentPage: 1,
  });
  const initialEquipment = {
    equipmentID: null,
    equipmentName: "",
    equipmentInfomation: "",
  };
  const [edit, setEdit] = useState(initialEquipment);
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
    initialValues: edit,
    validationSchema: equipmentSchema,
    onSubmit: (values, actions) => {
      if (values.equipmentID) {
        updateEquipment();
        setTouched({});
      } else {
        saveEquipment();
        setTouched({});
      }
    },
  });
  console.log(values);
  const navigate = useNavigate();
  // Khai báo xử lý phần tử có Th có trong table
  const initialColumns = [
    { name: "equipmentName", ten: "tên thiết bị", show: false },
    { name: "equipmentInfomation", ten: "thông tin thiết bị", show: false },
  ];
  const [columns, setColumns] = useState(initialColumns);
  const [selectedColumn, setSelectedColumn] = useState({
    name: null,
    show: false,
  });
  // Hàm xử lý sự kiện khi nhấp vào tiêu đề cột để sắp xếp
  const handleSort = () => {
    const updatedListRequest = { ...equipments };
    updatedListRequest.content = _.orderBy(
      updatedListRequest.content,
      [selectedColumn.name],
      [selectedColumn.show === false ? "asc" : "desc"]
    );
    setEquipments(updatedListRequest);
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

  const pageNumbers = [];
  for (let i = 1; i <= equipments.totalPages; i++) {
    pageNumbers.push(i);
  }
  function fetchUsers() {
    getList(values);
  }

  const saveEquipment = () => {
    serverApis
      .create(values)
      .then((response) => {
        toast({
          title: "Add thành công",
          status: "success",
          isClosable: true,
          position: "top-right",
          duration: 2000,
        });
        setValues(initialEquipment);
        onAddClose();
        fetchUsers();
        setColumns(initialColumns);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          navigate("/404");
        } else if (error.response.status === 500) {
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
  const updateEquipment = () => {
    serverApis
      .update(values.equipmentID, values)
      .then((response) => {
        toast({
          title: "Update thành công",
          status: "success",
          isClosable: true,
          position: "top-right",
          duration: 2000,
        });
        setValues(initialEquipment);
        onEditClose();
        fetchUsers();
        setColumns(initialColumns);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          navigate("/404");
        } else if (error.response.status === 500) {
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
  const deleteEquipment = () => {
    serverApis
      .remove(edit.equipmentID)
      .then((response) => {
        // Nếu cả hai lời gọi hoàn thành mà không có lỗi, thì hiển thị toast thành công
        toast({
          title: "Delete thành công",
          status: "success",
          isClosable: true,
          position: "top-right",
          duration: 2000,
        });
        getList(values);
        setValues(initialEquipment);
        onDeleteClose();
        setColumns(initialColumns);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          navigate("/404");
        } else if (error.response.status === 500) {
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

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  function handleOpenEdit(item) {
    setValues(item);
    onEditOpen();
  }
  function handleOpenDelete(item) {
    setEdit(item);
    onDeleteOpen();
  }
  const handleCloseClick = () => {
    onAddClose();
    onEditClose();
    onDeleteClose();
    setValues(initialEquipment);
  };

  // const findByName = () => {
  //   serverApis
  //     .findByEquipmentName(searchTitle)
  //     .then((response) => {
  //       setEquipments(response);
  //       console.log(response);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  const getList = (values) => {
    serverApis
      .getListEquipment({
        params: {
          // Truyền tham số vào URL dưới dạng object params
          page: page.currentPage,
          pageSize: page.pageSize,
          valueSearch: values.valueSearch,
        },
      })
      .then((data) => {
        // Cập nhật state với dữ liệu nhận được
        setEquipments(data);
        setColumns(initialColumns);
        console.log(123);
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        setEquipments({});

      });
  };
  useEffect(() => {
    handleSort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedColumn]);

  useEffect(() => {
    getList(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  return (
    <div className="border-1 p-3 rounded-2">
      <div>
        <Center h="200px">
          <Text fontSize="4xl" as="b">
            Danh Sách Thiết Bị
          </Text>
        </Center>
      </div>
      <div>
        <div>
          <Flex>
            <Box as="div" className="col-auto"  >
              <FormLabel m={0}>
                Tìm kiếm
              </FormLabel>
              <InputGroup>
                <Input
                  //onChange={onChangeSearchName}
                  placeholder="Tìm theo tên thiết bị"
                  htmlSize={30}
                  width="auto"
                  size="md"
                  value={values.valueSearch || ""}
                  onChange={handleChange}
                  id="valueSearch"
                />
                <InputRightAddon p={0}>
                  <IconButton
                    aria-label="Search database"
                    size="md"

                  >
                    <BsSearch onClick={() => getList(values)} />
                  </IconButton>
                </InputRightAddon>
              </InputGroup>
            </Box  >

            <Spacer />

            <Button colorScheme="orange" size="md" onClick={onAddOpen}>
              <Center>
                <FaPlus size={12} />
                &nbsp;Thêm thiết bị mới
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
                  <Th>Hành động</Th>
                </Tr>
              </Thead>
              <Tbody>
                {equipments.content && equipments.content.length > 0 ? (
                  equipments.content.map((equipment, index) => (
                    <Tr key={equipment.equipmentID}>
                      <Td>{index + 1}</Td>
                      <Td>{equipment.equipmentName}</Td>
                      <Td>{equipment.equipmentInfomation}</Td>
                      <Td className="d-flex">
                        <Flex justify={"start"}>
                          <Tooltip label="Chi tiết" size={'md'} hasArrow placement="bottom-start">
                            <span>
                              <AiOutlineEye
                                className="icon-hover"
                                style={{ marginRight: "4px" }}
                                color={"#ea580c"}
                                onClick={() => handleOpenEdit(equipment)}
                                size={24}
                              />
                            </span>
                          </Tooltip >
                          <Tooltip label="Xóa" size={'md'} hasArrow placement="bottom-start">
                            <span>
                              <FaTrash
                                className="icon-hover"
                                color={"#ea580c"}
                                onClick={() => handleOpenDelete(equipment)}
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
                    <Td colSpan={5}>Không có danh sách nào.</Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </TableContainer >
          <Modal isOpen={isEditOpen} onClose={onEditClose} size="xl">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader fontSize="3xl">Cập Nhật Thiết Bị</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl>
                  <FormLabel>Tên thiết bị</FormLabel>
                  <Input
                    id="equipmentName"
                    name="equipmentName"
                    value={values.equipmentName || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Nhập tên thiết bị"
                  />
                  {errors.equipmentName && touched.equipmentName && (
                    <small className="error">{errors.equipmentName}</small>
                  )}
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Thông tin thiết bị</FormLabel>
                  <Input
                    id="equipmentInfomation"
                    name="equipmentInfomation"
                    value={values.equipmentInfomation || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Nhập thông tin thiết bị"
                  />
                  {errors.equipmentInfomation &&
                    touched.equipmentInfomation && (
                      <small className="error">
                        {errors.equipmentInfomation}
                      </small>
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
                <Button colorScheme="orange" onClick={handleSubmit}>
                  Cập nhật
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <Modal isOpen={isAddOpen} onClose={onAddClose} size="xl">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader fontSize="3xl">Thêm Mới Thiết Bị</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl>
                  <FormLabel>Tên Thiết bị</FormLabel>
                  <Input
                    id="equipmentName"
                    name="equipmentName"
                    value={values.equipmentName || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Nhập tên thiết bị"
                  />
                  {errors.equipmentName && touched.equipmentName && (
                    <small className="error">{errors.equipmentName}</small>
                  )}

                  <FormLabel mt={4}>Thông tin thiết bị</FormLabel>
                  <Input
                    id="equipmentInfomation"
                    name="equipmentInfomation"
                    value={values.equipmentInfomation || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Nhập thông tin thiết bị"
                  />
                  {errors.equipmentInfomation &&
                    touched.equipmentInfomation && (
                      <small className="error">
                        {errors.equipmentInfomation}
                      </small>
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
                <Button colorScheme="orange" onClick={deleteEquipment}>
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
                    className={`page-item ${page.currentPage === pageNum
                      ? "active"
                      : ""
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
                  className={`page-item ${page.currentPage === equipments.totalPages ? "disabled" : ""
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
        </div >
      </div >
    </div >
  );
};
export default QuanLiThietBi;
