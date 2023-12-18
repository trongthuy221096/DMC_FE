import {
    IconButton,
    Input,
    InputGroup,
    Table,
    Thead,
    Tbody,
    Select,
    Tr,
    Th,
    Td,
    TableContainer,
    InputRightAddon,
    useDisclosure,
    Flex,
    Center,
    FormControl,
    Box,
    FormLabel,
    useToast,
    Tooltip,
} from "@chakra-ui/react";
import { AiOutlineEye } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { useFormik } from "formik";
import { useState, React, useEffect } from "react";
import DanhSachYeuCauModal from "../../components/danhsachyeucaumodal/DanhSachYeuCauModal";
import serverApis from "../../api/serverApis";
import DeleteYeuCauModal from "../../components/danhsachyeucaumodal/DeleteYeuCauModal";
import { LuArrowDownWideNarrow, LuArrowUpWideNarrow } from "react-icons/lu";
import _ from "lodash";

function DanhSachYeuCau() {
    const [loading, setLoading] = useState(false);

    //khai báo xử lý state cho request
    const [listRequest, setListRequest] = useState([]);
    const [request, setRequest] = useState();
    const [requestID, setRequestID] = useState();
    const { values, handleChange, handleSubmit } = useFormik({
        enableReinitialize: true,
        initialValues: {},
        onSubmit: (values) => {
            getList(values);
        },
    });

    // Xử lý chức năng page
    const [page, setPage] = useState({
        pageSize: 5,
        currentPage: 1,
    });
    const handleChangePage = (event) => {
        const newPageSize = event.target.value;
        setPage({ currentPage: 1, pageSize: newPageSize });
    };
    const pageNumbers = [];
    for (let i = 1; i <= listRequest.totalPages; i++) {
        pageNumbers.push(i);
    }

    // Khai báo xử lý phần tử có Th có trong table
    const initialColumns = [
        { name: "roomName", ten: "tên phòng", show: false },
        { name: "userName", ten: "tên người dùng", show: false },
        { name: "requestStatus", ten: "trạng thái ", show: false },
        { name: "requestContent", ten: "nội dung ", show: false },
        { name: "area", ten: "khu", show: false },
        { name: "dateOfCreate", ten: "ngày tạo", show: false },
        { name: "dateOfUpdate", ten: "ngày cập nhập", show: false },
    ];

    const [columns, setColumns] = useState(initialColumns);
    const [selectedColumn, setSelectedColumn] = useState({
        name: null,
        show: false,
    });
    // Hàm xử lý sự kiện khi nhấp vào tiêu đề cột để sắp xếp
    const handleSort = () => {
        const updatedListRequest = { ...listRequest };
        updatedListRequest.content = _.orderBy(
            updatedListRequest.content,
            [selectedColumn.name],
            [selectedColumn.show === false ? "asc" : "desc"]
        );
        setListRequest(updatedListRequest);
    };

    useEffect(() => {
        handleSort();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedColumn]);

    // Xử lý toast message
    const toast = useToast();

    // Xử lý DeleteYeuCauModal
    const {
        isOpen: isOpenDelete,
        onOpen: onOpenDelete,
        onClose: onCloseDelete,
    } = useDisclosure();
    const handleDelete = (id) => {
        setRequestID(id);
        onOpenDelete();
    };

    // Xử lý DanhSachYeuCauModal
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleOpenClick = (item) => {
        setRequest(item);
        onOpen();
    };

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

    // Hàm lấy tất cả danh sách request
    const getList = (values) => {
        serverApis
            .requestList({
                params: {
                    // Truyền tham số vào URL dưới dạng object params
                    page: page.currentPage,
                    pageSize: page.pageSize,
                    valueSearch: values.valueSearch,
                    tuNgay: values.tuNgay,
                    denNgay: values.denNgay,
                },
            })
            .then((data) => {
                // Cập nhật state với dữ liệu nhận được
                const userList = { ...data };
                userList.content = _.filter(userList.content, { role: "USER" });
                setListRequest(userList);
                setColumns(initialColumns);
            })
            .catch((error) => {
                // Xử lý lỗi nếu có
                setListRequest({});
            });
    };

    // Hàm xóa request
    const deleteRequest = async () => {
        try {
            // Gọi serverApis.deleteRequest(data) và đợi cho nó hoàn thành
            await serverApis.deleteRequest(requestID);

            // Gọi getList(values) và đợi cho nó hoàn thành
            await getList(values);

            // Nếu cả hai lời gọi hoàn thành mà không có lỗi, thì hiển thị toast thành công
            toast({
                title: "Xóa thành công",
                status: "success",
                isClosable: true,
                position: "top-right",
                duration: 2000,
            });

            // Sau khi cả hai lời gọi hoàn thành và toast đã được hiển thị, đóng onClose()
        } catch (error) {
            // Kiểm tra nếu status code là 404, thì hiển thị toast lỗi
            if (error.response && error.response.status === 404) {
                toast({
                    title: "Xóa thất bại",
                    status: "error",
                    isClosable: true,
                    position: "top-right",
                    duration: 2000,
                });
            }
        }
        onCloseDelete();
    };

    //Hàm xác nhận hoặc từ chối request
    const confirmRequest = async (data) => {
        try {
            setLoading(true);
            // Gọi serverApis.updateRequest(data) và đợi cho nó hoàn thành
            await serverApis.updateRequest(data);
            // Gọi getList(values) và đợi cho nó hoàn thành
            await getList(values);
            setLoading(false);
            // Nếu cả hai lời gọi hoàn thành mà không có lỗi, thì hiển thị toast thành công
            toast({
                title: "Đã cập nhập yêu cầu",
                status: "success",
                isClosable: true,
                position: "top-right",
                duration: 2000,
            });

            // Sau khi cả hai lời gọi hoàn thành và toast đã được hiển thị, đóng onClose()
            onClose();
        } catch (error) {
            // Kiểm tra nếu status code là 404, thì hiển thị toast lỗi
            if (error.response && error.response.status === 404) {
                toast({
                    title: "Cập nhập yêu cầu thất bại",
                    status: "error",
                    isClosable: true,
                    position: "top-right",
                    duration: 2000,
                });
            } else if (error.response.status === 412) {
                toast({
                    title: "Trạng thái đã cập nhập không thể cập nhập lại",
                    status: "error",
                    isClosable: true,
                    position: "top-right",
                    duration: 2000,
                });
            } else if (error.response.status === 500) {
                toast({
                    title: "Lỗi hệ thống",
                    status: "error",
                    isClosable: true,
                    position: "top-right",
                    duration: 2000,
                });
            }

            setLoading(false);
            onClose();
        }
    };

    useEffect(() => {
        getList(values);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);
    return (
        <div className="border-1 p-3 rounded-2">
            <Box as="div" className="col-auto">
                <Center>
                    <h1 className="">Danh sách yêu cầu</h1>
                </Center>
            </Box>
            <FormControl>
                <Flex
                    justify="space-between"
                    my={4}
                    ms={2}
                    alignItems={"end"}
                    flexWrap={"wrap"}
                >
                    <Box
                        as="div"
                        className="row g-3 align-items-center"
                        minWidth={"206px"}
                    >
                        <Box as="div" className="col-auto pe-0">
                            <FormLabel m={0}>Hiển thị</FormLabel>
                        </Box>

                        <Box as="div" className="col-auto">
                            <Select onChange={handleChangePage}>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                            </Select>
                        </Box>
                        <Box as="div" className="col-auto p-0">
                            <FormLabel m={0}>hàng</FormLabel>
                        </Box>
                    </Box>

                    <Flex alignItems="center" flexWrap="wrap">
                        <Box as="div" className="col-auto" mr={4}>
                            <FormLabel m={0}>Từ ngày tạo</FormLabel>
                            <Input
                                type="date"
                                value={values.tuNgay || ""}
                                onChange={handleChange}
                                id="tuNgay"
                            />
                        </Box>
                        <Box as="div" className="col-auto" mr={4}>
                            <FormLabel m={0}>Đến ngày tạo</FormLabel>
                            <Input
                                type="date"
                                value={values.denNgay || ""}
                                onChange={handleChange}
                                id="denNgay"
                            />
                        </Box>

                        <Box as="div" className="col-auto">
                            <FormLabel m={0}>
                                Tìm kiếm
                            </FormLabel>
                            <InputGroup>
                                <Input
                                    placeholder="Tìm theo Room hoặc User hoặc Status"
                                    value={values.valueSearch || ""}
                                    onChange={handleChange}
                                    id="valueSearch"
                                />
                                <InputRightAddon p={0}>
                                    <IconButton onClick={handleSubmit}>
                                        <BsSearch />
                                    </IconButton>
                                </InputRightAddon>
                            </InputGroup>
                        </Box>
                    </Flex>
                </Flex>
            </FormControl>
            <TableContainer>
                <Table variant="striped" colorScheme="orange">
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
                            <Th>hành động</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {listRequest.content &&
                            listRequest.content.length > 0 ? (
                            listRequest.content.map((item, index) => (
                                <Tr key={item.requestID}>
                                    <Td>
                                        {page.pageSize *
                                            (page.currentPage - 1) +
                                            index +
                                            1}
                                    </Td>
                                    <Td>{item.roomName}</Td>
                                    <Td>{item.userName}</Td>
                                    <Td>{item.requestStatus}</Td>
                                    <Td>{item.requestContent}</Td>
                                    <Td>{item.area}</Td>
                                    <Td>{item.dateOfCreate}</Td>
                                    <Td>{item.dateOfUpdate}</Td>
                                    <Td>
                                        <Flex justify={"center"}>
                                            <Tooltip label="Chi tiết" size={'md'} hasArrow placement="bottom-start">
                                                <span>
                                                    <AiOutlineEye
                                                        className="icon-hover"
                                                        style={{ marginRight: "4px" }}
                                                        color={"#ea580c"}
                                                        onClick={() =>
                                                            handleOpenClick(item)
                                                        }
                                                        size={24}
                                                    />
                                                </span>
                                            </Tooltip>
                                            <Tooltip label="Chi tiết" size={'md'} hasArrow placement="bottom-start">
                                                <span>
                                                    <FaTrash
                                                        className="icon-hover"
                                                        color={"#ea580c"}
                                                        onClick={() => {
                                                            handleDelete(
                                                                item.requestID
                                                            );
                                                        }}
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
                                <Td colSpan={9}>Không có danh sách nào.</Td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>
            </TableContainer>
            <DanhSachYeuCauModal
                onClose={onClose}
                isOpen={isOpen}
                request={request}
                confirmRequest={confirmRequest}
                loading={loading}
            ></DanhSachYeuCauModal>
            <DeleteYeuCauModal
                onClose={onCloseDelete}
                isOpen={isOpenDelete}
                deleteRequest={deleteRequest}
            ></DeleteYeuCauModal>
            {/* Pagination */}
            <div className="d-flex justify-content-end mt-3">
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li
                            className={`page-item ${page.currentPage === 1 ||
                                !listRequest.totalPages
                                ? "disabled"
                                : ""
                                }`}
                        >
                            <button
                                className="page-link"
                                onClick={() => {
                                    if (page.currentPage > 1) {
                                        setPage({
                                            ...page,
                                            currentPage: page.currentPage - 1,
                                        });
                                    }
                                }}
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
                            className={`page-item ${page.currentPage === listRequest.totalPages ||
                                !listRequest.totalPages
                                ? "disabled"
                                : ""
                                }`}
                        >
                            <button
                                className="page-link"
                                onClick={() => {
                                    if (
                                        page.currentPage <
                                        listRequest.totalPages ||
                                        !listRequest.totalPages
                                    ) {
                                        setPage({
                                            ...page,
                                            currentPage: page.currentPage + 1,
                                        });
                                    }
                                }}
                            >
                                Sau
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}
export default DanhSachYeuCau;
