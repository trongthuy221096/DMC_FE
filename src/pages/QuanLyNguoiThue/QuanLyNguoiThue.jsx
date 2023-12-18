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
    Input,
    IconButton,
    Flex,
    InputGroup,
    InputRightAddon,
    Tooltip,
} from "@chakra-ui/react";
import "./styles.scss";
import { BsSearch } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import serverApis from "../../api/serverApis";
import { formatRoomName } from "../../util/format";
import { LuArrowDownWideNarrow, LuArrowUpWideNarrow } from "react-icons/lu";
import _ from "lodash";
QuanLyNguoiThue.propTypes = {};

function QuanLyNguoiThue(props) {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState({
        pageSize: 5,
        currentPage: 1,
    });
    const [searchValue, setSearchValue] = useState("");
    const pageNumbers = [];
    for (let i = 1; i <= users.totalPages; i++) {
        pageNumbers.push(i);
    }

    useEffect(() => {
        loadListUser();
    }, [page]);

    const loadListUser = async () => {
        try {
            const response = await serverApis.getUsers({
                params: {
                    // Truyền tham số vào URL dưới dạng object params
                    page: page.currentPage,
                    pageSize: page.pageSize,
                },
            });

            setUsers(response);
        } catch (error) {
            // Xử lý lỗi nếu có
            console.error(error);
        }
    };

    const onDetail = (id) => {
        navigate("/user/" + id);
    };

    const onSearchValueChange = (e) => {
        let search = e.target.value;
        setSearchValue(search);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        serverApis
            .getUsers({
                params: {
                    // Truyền tham số vào URL dưới dạng object params
                    page: page.currentPage,
                    pageSize: page.pageSize,
                    valueSearch: searchValue,
                },
            })
            .then((response) => {
                // Cập nhật state với dữ liệu nhận được
                setUsers(response);
                setColumns(initialColumns);
            })
            .catch((error) => {
                // Xử lý lỗi nếu có
                console.log(error);
            });
    };
    // Khai báo xử lý phần tử có Th có trong table
    const initialColumns = [
        { name: "cmnd", ten: "CMND", show: false },
        { name: "name", ten: "tên người dùng", show: false },
        { name: "gender", ten: "Giới tính", show: false },
        { name: "birthDay", ten: "ngày sinh", show: false },
        { name: "address", ten: "địa chỉ", show: false },
        { name: "email", ten: "email", show: false },
        { name: "phoneNumber", ten: "số điện thoại", show: false },
        { name: "roomName", ten: "tên phòng", show: false },
    ];

    const [columns, setColumns] = useState(initialColumns);
    const [selectedColumn, setSelectedColumn] = useState({
        name: null,
        show: false,
    });
    // Hàm xử lý sự kiện khi nhấp vào tiêu đề cột để sắp xếp
    const handleSort = () => {
        const updatedList = { ...users };
        updatedList.content = _.orderBy(
            updatedList.content,
            [selectedColumn.name],
            [selectedColumn.show === false ? "asc" : "desc"]
        );
        setUsers(updatedList);
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
        <div className="container-xl border-1 p-3 rounded-2">
            <h1>Quản lý người thuê</h1>
            <form onSubmit={onSubmit}>
                <FormControl className="form">
                    <FormLabel>Tìm kiếm</FormLabel>
                    <div className="search-group">
                        <InputGroup>
                            <Input
                                type="text"
                                placeholder="Tìm theo CMND"
                                value={searchValue}
                                onChange={(e) => {
                                    onSearchValueChange(e);
                                }}
                            />
                            <InputRightAddon p={0}>
                                <IconButton
                                    type="submit"
                                    aria-label="Search database"
                                    size="md"
                                >
                                    <BsSearch />
                                </IconButton>
                            </InputRightAddon>
                        </InputGroup>
                    </div>
                </FormControl>
            </form>

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
                        {users.content &&
                            users.content.map((item, index) => (
                                <Tr key={item.cmnd}>
                                    <Td>
                                        {page.pageSize *
                                            (page.currentPage - 1) +
                                            index +
                                            1}
                                    </Td>
                                    <Td>{item.cmnd}</Td>
                                    <Td>{item.name}</Td>
                                    <Td>{item.gender}</Td>
                                    <Td>{item.birthDay}</Td>
                                    <Td
                                        className="out-text-range"
                                        overflowX="hidden"
                                    >
                                        {item.address}
                                    </Td>
                                    <Td>{item.email}</Td>
                                    <Td>{item.phoneNumber}</Td>
                                    <Td>{formatRoomName(item.roomName)}</Td>
                                    <Td>
                                        <Flex justify={"center"}>
                                            <Tooltip label="Chi tiết" size={'md'} hasArrow placement="bottom-start">
                                                <span>
                                                    <AiOutlineEye
                                                        textalign={"Center"}
                                                        className="icons-group"
                                                        size={20}
                                                        color="#ea580c"
                                                        onClick={() => {
                                                            onDetail(item.userID);
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
                            className={`page-item ${page.currentPage === users.totalPages
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
    );
}

export default QuanLyNguoiThue;
