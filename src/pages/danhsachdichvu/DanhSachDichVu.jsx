import {
    Box,
    Center,
    Flex,
    FormControl,
    IconButton,
    Input,
    InputGroup,
    InputRightAddon,
    Select,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useDisclosure,
    FormLabel,
    useToast,
    Tooltip,
} from "@chakra-ui/react";

import "bootstrap/dist/css/bootstrap.css";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { LuArrowDownWideNarrow, LuArrowUpWideNarrow } from "react-icons/lu";
import { BsSearch } from "react-icons/bs";

import DanhSachDichVuModal from "../../components/danhsachdichvumodal/DanhSachDichVuModal";
import { basicSchema } from "../../schemas/schema";
import serverApis from "../../api/serverApis";
import _ from "lodash";
import { formatCurrencyVND, formatNumberWithCommas } from "../../util/format";

function DanhSachDichVu() {
    //khai báo xử lý đóng mở DanhSachDichVuModal
    const { isOpen, onOpen, onClose } = useDisclosure();

    //khai báo xử lý state cho service
    const [listService, setListService] = useState([]);
    const [service, setService] = useState({});
    const {
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setValues,
    } = useFormik({
        enableReinitialize: true,
        initialValues: service,
        validationSchema: basicSchema,
        onSubmit: (values, actions) => {
            updateService(values);

            onClose();
        },
    });

    const handleOpenClick = (item) => {
        setService(item);
        onOpen();
    };

    const handleCloseClick = (item) => {
        onClose();
        setValues(service);
    };

    // Khai báo xử lý phần tử có Th có trong table
    const initialColumns = [
        { name: "serviceName", ten: "Tên dịch vụ", show: false },
        { name: "price", ten: "Giá", show: false },
        { name: "unit", ten: "đơn vị tính", show: false },
    ];
    const [columns, setColumns] = useState(initialColumns);
    const [selectedColumn, setSelectedColumn] = useState({
        name: null,
        show: false,
    });
    // Hàm xử lý sự kiện khi nhấp vào tiêu đề cột để sắp xếp
    const handleSort = () => {
        const updatedListService = { ...listService };
        updatedListService.content = _.orderBy(
            updatedListService.content,
            [selectedColumn.name],
            [selectedColumn.show === false ? "asc" : "desc"]
        );
        setListService(updatedListService);
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

    useEffect(() => {
        handleSort();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedColumn]);

    // Xử lý toast message
    const toast = useToast();

    // Khai báo và xử lý page
    const [page, setPage] = useState({
        pageSize: 5,
        currentPage: 1,
    });
    const handleChangePage = (event) => {
        const newPageSize = event.target.value;
        setPage({ currentPage: 1, pageSize: newPageSize });
    };

    const pageNumbers = [];
    for (let i = 1; i <= listService.totalPages; i++) {
        pageNumbers.push(i);
    }

    // Hàm update service
    const updateService = async (data) => {
        try {
            // Gọi serverApis.updateService(data) và đợi cho nó hoàn thành
            await serverApis.updateService(data);

            // Gọi getList(values) và đợi cho nó hoàn thành
            await getList(values);

            // Nếu cả hai lời gọi hoàn thành mà không có lỗi, thì hiển thị toast thành công
            toast({
                title: "Cập nhập thành công",
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
                    title: "cập nhập thất bại",
                    status: "error",
                    isClosable: true,
                    position: "top-right",
                    duration: 2000,
                });
            }
        }
        onClose();
    };

    // Hàm lấy tất cả danh sách service
    const getList = (values) => {
        serverApis
            .getListService({
                params: {
                    // Truyền tham số vào URL dưới dạng object params
                    page: page.currentPage,
                    pageSize: page.pageSize,
                    valueSearch: values.valueSearch,
                },
            })
            .then((data) => {
                // Cập nhật state với dữ liệu nhận được
                setListService(data);
                setColumns(initialColumns);
            })
            .catch((error) => {
                // Xử lý lỗi nếu có
                setListService({});
            });
    };

    // Gọi hàm getList
    useEffect(() => {
        getList(values);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    return (
        <div className="border-1 p-3 rounded-2">
            <Box as="div" className="col-auto ">
                <Center>
                    <h1 className="">Danh sách dịch vụ</h1>
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

                    <Flex alignItems="center" flexWrap="wrap" className="col-4">
                        <Box as="div" className="col-auto w-100">
                            <FormLabel m={0}>
                                Tìm kiếm
                            </FormLabel>
                            <InputGroup>
                                <Input
                                    placeholder="Tìm theo ServiceName hoặc Price"
                                    value={values.valueSearch || ""}
                                    onChange={handleChange}
                                    id="valueSearch"
                                />

                                <InputRightAddon p={0}>
                                    <IconButton
                                        onClick={() => {
                                            getList(values);
                                        }}
                                    >
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
                        {listService.content &&
                            listService.content.length > 0 ? (
                            listService.content.map((item, index) => (
                                <Tr key={item.serviceID}>
                                    <Td>
                                        {page.pageSize *
                                            (page.currentPage - 1) +
                                            index +
                                            1}
                                    </Td>
                                    <Td>{item.serviceName}</Td>
                                    <Td>{formatCurrencyVND(item.price)}</Td>
                                    <Td>{item.unit}</Td>
                                    <Td>
                                        <Flex>
                                            <Tooltip label="Chi tiết" size={'md'} hasArrow placement="bottom-start">
                                                <span>
                                                    <AiOutlineEye
                                                        className="icon-hover"
                                                        onClick={() =>
                                                            handleOpenClick(item)
                                                        }
                                                        color={"#ea580c"}
                                                        size={24}
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
            </TableContainer>

            <DanhSachDichVuModal
                isOpen={isOpen}
                handleCloseClick={handleCloseClick}
                service={service}
                values={values}
                handleChange={handleChange}
                handleBlur={handleBlur}
                errors={errors}
                touched={touched}
                handleSubmit={handleSubmit}
            ></DanhSachDichVuModal>
            {/* Pagination */}
            <div className="d-flex justify-content-end mt-3">
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li
                            className={`page-item ${page.currentPage === 1 ||
                                    !listService.totalPages
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
                            className={`page-item ${page.currentPage === listService.totalPages ||
                                    !listService.totalPages
                                    ? "disabled"
                                    : ""
                                }`}
                        >
                            <button
                                className="page-link"
                                onClick={() => {
                                    if (
                                        page.currentPage <
                                        listService.totalPages ||
                                        !listService.totalPages
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
export default DanhSachDichVu;
