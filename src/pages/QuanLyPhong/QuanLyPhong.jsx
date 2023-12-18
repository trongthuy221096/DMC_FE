import React, { useEffect, useState } from "react";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    FormControl,
    FormLabel,
    Flex,
    Spacer,
    Button,
    Center,
    Select,
    useDisclosure,
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Tooltip,
} from "@chakra-ui/react";
import "./styles.scss";
import { FaPlus } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { AiOutlineEye } from "react-icons/ai";
import serverApis from "../../api/serverApis";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import { LuArrowDownWideNarrow, LuArrowUpWideNarrow } from "react-icons/lu";
import { formatCurrencyVND } from "../../util/format";
QuanLyPhong.propTypes = {};

function QuanLyPhong(props) {
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [rooms, setRooms] = useState([]);
    const [roomID, setRoomID] = useState(null);
    const [page, setPage] = useState({
        pageSize: 5,
        currentPage: 1,
    });
    const pageNumbers = [];
    for (let i = 1; i <= rooms.totalPages; i++) {
        pageNumbers.push(i);
    }

    // Xử lý toast message
    const toast = useToast();

    useEffect(() => {
        loadListRoom();
    }, [page]);

    const loadListRoom = () => {
        serverApis
            .getRooms({
                params: {
                    // Truyền tham số vào URL dưới dạng object params
                    page: page.currentPage,
                    pageSize: page.pageSize,
                },
            })
            .then((response) => {
                // Cập nhật state với dữ liệu nhận được
                setRooms(response);
                setColumns(initialColumns);
            })
            .catch((error) => { });
    };

    const onAddButton = () => {
        navigate("/room/addRoom");
    };

    const onOpenDeleteModal = (id) => {
        setRoomID(id);
        onOpen();
    };

    const onDelete = () => {
        serverApis
            .deleteRoom(roomID)
            .then(() => {
                toast({
                    title: "Xóa thành công",
                    status: "success",
                    isClosable: true,
                    position: "top-right",
                    duration: 2000,
                });
                onClose();
                setRoomID(null);
                loadListRoom();
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    navigate("/404");
                } else if (error.response.status === 500) {
                    toast({
                        title: "Xóa thất bại vì có người đang sử dụng phòng",
                        status: "error",
                        isClosable: true,
                        position: "top-right",
                        duration: 2000,
                    });
                }
                onClose();
            });
    };

    const onSearchChange = (e) => {
        let search = e.target.value;
        serverApis
            .getRooms({
                params: {
                    // Truyền tham số vào URL dưới dạng object params
                    page: page.currentPage,
                    pageSize: page.pageSize,
                    valueSearch: search,
                },
            })
            .then((response) => {
                // Cập nhật state với dữ liệu nhận được
                setRooms(response);
                setColumns(initialColumns);
            })
            .catch((error) => {
                // Xử lý lỗi nếu có
                console.log(error);
            });
    };

    const onDetailButton = (id) => {
        navigate("/room/" + id);
    };
    // Khai báo xử lý phần tử có Th có trong table
    const initialColumns = [
        { name: "roomName", ten: "tên phòng", show: false },
        { name: "numberOfBed", ten: "số giường", show: false },
        { name: "numberOfPeople", ten: "số người", show: false },
        { name: "price", ten: "giá", show: false },
        { name: "roomStatus", ten: "trạng thái", show: false },
    ];

    const [columns, setColumns] = useState(initialColumns);
    const [selectedColumn, setSelectedColumn] = useState({
        name: null,
        show: false,
    });
    // Hàm xử lý sự kiện khi nhấp vào tiêu đề cột để sắp xếp
    const handleSort = () => {
        const updatedList = { ...rooms };
        updatedList.content = _.orderBy(
            updatedList.content,
            [selectedColumn.name],
            [selectedColumn.show === false ? "asc" : "desc"]
        );
        setRooms(updatedList);
    };

    useEffect(() => {
        handleSort();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedColumn]);

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

    return (
        <div className="border-1 p-3 rounded-2">
            <h1>Quản lý phòng</h1>
            <Flex>
                <FormControl className="form">
                    <FormLabel>Khu</FormLabel>
                    <Select
                        maxW={300}
                        placeholder="Chọn khu..."
                        name="searchValue"
                        onChange={onSearchChange}
                    >
                        <option value="A">Khu A</option>
                        <option value="B">Khu B</option>
                        <option value="C">Khu C</option>
                    </Select>
                </FormControl>
                <Spacer />
                <Flex align={"flex-end"}>
                    <Button
                        colorScheme="orange"
                        size="md"
                        onClick={onAddButton}
                    >
                        <Center>
                            <FaPlus size={12} />
                            &nbsp;Thêm phòng
                        </Center>
                    </Button>
                </Flex>
            </Flex>
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
                        {rooms.content &&
                            rooms.content.map((item, index) => (
                                <Tr key={index}>
                                    <Td>
                                        {page.pageSize *
                                            (page.currentPage - 1) +
                                            index +
                                            1}
                                    </Td>
                                    <Td>{item.roomName}</Td>
                                    <Td>{item.numberOfBed}</Td>
                                    <Td>{item.numberOfPeople}</Td>
                                    <Td>{formatCurrencyVND(item.price)}</Td>
                                    <Td>{item.roomStatus}</Td>
                                    <Td>
                                        <Flex justify={"start"}>
                                            <Tooltip label="Chi tiết" size={'md'} has placement="bottom-start" hasArrow>
                                                <span>
                                                    <AiOutlineEye
                                                        className="icons-group"
                                                        size={20}
                                                        color="#ea580c"
                                                        onClick={() => {
                                                            onDetailButton(item.roomID);
                                                        }}
                                                    />
                                                </span>
                                            </Tooltip>
                                        </Flex>
                                    </Td>
                                </Tr>
                            ))}
                    </Tbody>
                </Table>
            </TableContainer>
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
                            className={`page-item ${page.currentPage === rooms.totalPages
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
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete Room</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>Do you want to delete this room?</ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="orange"
                            mr={3}
                            onClick={() => {
                                onDelete();
                            }}
                        >
                            Delete
                        </Button>
                        <Button variant="ghost" onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}

export default QuanLyPhong;
