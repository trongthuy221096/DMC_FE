import { React, useEffect, useState } from "react";

import {
    Spacer,
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
    useDisclosure,
    Box,
    Badge,
    FormLabel,
    Select,
    Tooltip,
} from "@chakra-ui/react";

import { FaEye, FaPlus } from "react-icons/fa";
import serverApis from "../../api/serverApis";
import { useNavigate } from "react-router-dom";
import PATH from "../../constants/path";
import DienNuocModal from "../../components/hoadonModal/DienNuocMoDal";
import RoomMoDal from "../../components/hoadonModal/RoomMoDal";
import _ from "lodash";
import { LuArrowDownWideNarrow, LuArrowUpWideNarrow } from "react-icons/lu";
import { formatCurrencyVND } from "../../util/format";
import { AiOutlineEye } from "react-icons/ai";

const QuanLiHoaDon = () => {
    const [listBill, setListBill] = useState([]);
    const [listBillFiltered, setListBillFiltered] = useState([]);
    const [listPage, setListPage] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const {
        isOpen: isViewOpen,
        onOpen: onViewOpen,
        onClose: onViewClose,
    } = useDisclosure();
    const navigate = useNavigate();
    const [inputValues, setInputValues] = useState({
        dateCreated: "",
        status: "",
    });

    useEffect(() => {
        getListBill();
    }, []);

    const getListBill = (params) => {
        serverApis.getListBill({ params: params }).then((response) => {
            setListBill(response.content);
            setListBillFiltered(response.content);
            let newListPages = [];
            for (let i = 0; i < response.totalPages; i++) {
                newListPages.push(i + 1);
            }
            setListPage([...newListPages]);
            setCurrentPage(response.number + 1);
        });
    };

    const [bill, setBill] = useState();

    const handleOnclick = (item) => {
        setBill(item);
        onViewOpen();
    };

    const handleOnchange = (e) => {
        const { name, value } = e.target;
        setInputValues({ ...inputValues, [name]: value });
    };

    useEffect(() => {
        filterListBill();
        setColumns(initialColumns);
    }, [inputValues]);

    const filterListBill = () => {
        let newListBill = [...listBill];
        if (inputValues.dateCreated) {
            newListBill = [
                ...newListBill.filter((bill) =>
                    bill.createdDate.includes(inputValues.dateCreated)
                ),
            ];
        }
        if (inputValues.status) {
            newListBill = [
                ...newListBill.filter(
                    (bill) => bill.status === inputValues.status
                ),
            ];
        }

        setListBillFiltered([...newListBill]);
    };

    // Khai báo xử lý phần tử có Th có trong table
    const initialColumns = [
        { name: "billID", ten: "mã hóa đơn", show: false },
        { name: "userID", ten: "mã người dùng", show: false },
        { name: "createdDate", ten: "Ngày tạo", show: false },
        { name: "total", ten: "tổng tiền", show: false },
        { name: "status", ten: "trạng thái", show: false },
    ];

    const [columns, setColumns] = useState(initialColumns);
    const [selectedColumn, setSelectedColumn] = useState({
        name: null,
        show: false,
    });
    // Hàm xử lý sự kiện khi nhấp vào tiêu đề cột để sắp xếp
    const handleSort = () => {
        console.log(listBillFiltered);
        let updatedList = { ...listBillFiltered };
        updatedList = _.orderBy(
            updatedList,
            [selectedColumn.name],
            [selectedColumn.show === false ? "asc" : "desc"]
        );
        setListBillFiltered(updatedList);
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
        <>
            <div className="border-1 p-3 rounded-2">
                <div>
                    <Center h="200px">
                        <Text fontSize="4xl" as="b">
                            Danh Sách Hóa Đơn
                        </Text>
                    </Center>
                </div>
                <div>
                    <div>
                        <Flex>
                            <div className="row col-9">
                                <div className="col-lg-6 col-md-6 col-sm-12 col-xl-3">
                                    <FormLabel m={0}>Ngày tạo</FormLabel>
                                    <Input
                                        type="month"
                                        name="dateCreated"
                                        value={inputValues.dateCreated}
                                        onChange={handleOnchange}
                                    />
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12 col-xl-3">
                                    <FormLabel m={0}>Trạng thái</FormLabel>
                                    <Select
                                        placeholder="--Tất cả--"
                                        name="status"
                                        value={inputValues.status}
                                        onChange={handleOnchange}
                                    >
                                        <option value="true">
                                            Đã thanh toán
                                        </option>
                                        <option value="false">
                                            Chưa thanh toán
                                        </option>
                                    </Select>
                                </div>
                            </div>

                            <Spacer />

                            <Button
                                colorScheme="orange"
                                size="md"
                                onClick={() => navigate(PATH.CHOTDIENNUOC.path)}
                            >
                                <Center>
                                    <FaPlus size={12} />
                                    &nbsp;Danh sách chốt điện nước
                                </Center>
                            </Button>
                        </Flex>
                    </div>

                    <div>
                        <Box overflow={"hidden"}>
                            <TableContainer mt={10}>
                                <Table
                                    variant="striped"
                                    size="md"
                                    colorScheme="orange"
                                >
                                    <Thead>
                                        <Tr>
                                            <Th>#</Th>
                                            {columns.map((column, index) => (
                                                <Th
                                                    key={index}
                                                    className="icon-hover"
                                                    onClick={() => {
                                                        handleClick(
                                                            column.name
                                                        );
                                                    }}
                                                >
                                                    {column.ten}{" "}
                                                    {column.show ? (
                                                        <LuArrowDownWideNarrow
                                                            size={16}
                                                            style={{
                                                                display:
                                                                    "inline-block",
                                                            }}
                                                        />
                                                    ) : (
                                                        <LuArrowUpWideNarrow
                                                            size={16}
                                                            style={{
                                                                display:
                                                                    "inline-block",
                                                            }}
                                                        />
                                                    )}
                                                </Th>
                                            ))}
                                            <Th>Bill Content</Th>
                                            <Th>hành động</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {listBillFiltered &&
                                            listBillFiltered.map(
                                                (bill, index) => {
                                                    return (
                                                        <Tr key={index}>
                                                            <Td>
                                                                {5 *
                                                                    (currentPage -
                                                                        1) +
                                                                    index +
                                                                    1}
                                                            </Td>
                                                            <Td>
                                                                {bill.billID}
                                                            </Td>
                                                            <Td>
                                                                {bill.userID}
                                                            </Td>
                                                            <Td>
                                                                {
                                                                    bill.createdDate
                                                                }
                                                            </Td>
                                                            <Td>
                                                                {formatCurrencyVND(
                                                                    bill.total
                                                                )}
                                                            </Td>
                                                            <Td>
                                                                {bill.status ===
                                                                    "true" ? (
                                                                    <Badge colorScheme="green">
                                                                        Đã thanh
                                                                        toán
                                                                    </Badge>
                                                                ) : (
                                                                    <Badge colorScheme="red">
                                                                        Chưa
                                                                        thanh
                                                                        toán
                                                                    </Badge>
                                                                )}
                                                            </Td>
                                                            <Td>
                                                                {
                                                                    bill.billContent
                                                                }
                                                            </Td>
                                                            <Td>
                                                                <Flex
                                                                    justify={
                                                                        "center"
                                                                    }
                                                                >
                                                                    <Tooltip label="Chi tiết" size={'md'} hasArrow placement="bottom-start">
                                                                        <span>
                                                                            <AiOutlineEye
                                                                                className="icon-hover"
                                                                                color="#ea580c"
                                                                                size={
                                                                                    20
                                                                                }
                                                                                onClick={() => {
                                                                                    handleOnclick(
                                                                                        bill
                                                                                    );
                                                                                }}
                                                                            />
                                                                        </span>
                                                                    </Tooltip>
                                                                </Flex>
                                                            </Td>
                                                        </Tr>
                                                    );
                                                }
                                            )}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </Box>
                        <div>
                            {bill?.billContent.includes("roomBill") && (
                                <RoomMoDal
                                    isOpen={isViewOpen}
                                    onClose={onViewClose}
                                    data={bill}
                                    resetData={getListBill}
                                />
                            )}
                            {bill?.billContent.includes("serviceBill") && (
                                <DienNuocModal
                                    isOpen={isViewOpen}
                                    onClose={onViewClose}
                                    data={bill}
                                    resetData={getListBill}
                                />
                            )}
                        </div>
                        <div className="d-flex justify-content-end mt-3">
                            <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                    <li
                                        className={
                                            "page-item " +
                                            (currentPage === 1 && "disabled")
                                        }
                                    >
                                        <button
                                            className="page-link"
                                            onClick={() =>
                                                getListBill({
                                                    page: currentPage - 1,
                                                })
                                            }
                                        >
                                            Trước
                                        </button>
                                    </li>
                                    {listPage.map((page) => {
                                        return (
                                            <li
                                                key={page}
                                                className="page-item"
                                            >
                                                <button
                                                    className={
                                                        "page-link " +
                                                        (currentPage === page &&
                                                            "active")
                                                    }
                                                    onClick={() =>
                                                        getListBill({
                                                            page: page,
                                                        })
                                                    }
                                                >
                                                    {page}
                                                </button>
                                            </li>
                                        );
                                    })}
                                    <li
                                        className={
                                            "page-item " +
                                            (currentPage === listPage.length &&
                                                "disabled")
                                        }
                                    >
                                        <button
                                            className="page-link"
                                            onClick={() =>
                                                getListBill({
                                                    page: currentPage + 1,
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
        </>
    );
};
export default QuanLiHoaDon;
