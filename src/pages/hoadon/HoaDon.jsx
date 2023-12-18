import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Badge, Button, Select, Stack, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import DienNuocModal from '../../components/hoadonModal/DienNuocMoDal'
import { GrLinkPrevious } from 'react-icons/gr'
import serverApis from '../../api/serverApis'

const HoaDon = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [listBill, setListBill] = useState([])
    const [userLocal, setUserLocal] = useState(() => {
        const phoneNumber = localStorage.getItem('phoneNumber')
        return { phoneNumber: phoneNumber }
    })
    const [statusFilter, setStatusFilter] = useState('')
    const [listBillFiltered, setListBillFiltered] = useState([])
    const [data, setData] = useState()

    useEffect(() => {
        serverApis.getListBillByUserID(userLocal.phoneNumber)
            .then(response => {
                response.forEach(value => {

                    value.total = formatCurrencyVND(parseFloat(value.total))
                })
                setListBill(response)
                setListBillFiltered(response)
            })
            .catch(e => {
                console.log(e)
            })
    }, [])

    useEffect(() => {
        filterListBill()
    }, [statusFilter])

    const filterListBill = () => {
        let newListBill = [...listBill]
        // console.log(newListBill)
        if (statusFilter) {
            newListBill = [...newListBill.filter((bill) => bill.status === statusFilter)]
        }
        setListBillFiltered([...newListBill])
    }

    const formatCurrencyVND = (value) => {
        const formatter = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", });
        return formatter.format(value);
    }

    const handleOnclick = (item) => {
        console.log(data)
        setData(item)
        onOpen()
    }
    return (
        <>
            <div className='container-xxl'>

                <div className='border-1 p-3 rounded-2'>
                    <div>
                        <b className='fs-3'>
                            HÓA ĐƠN LỆ PHÍ
                        </b>
                        <div className='mt-3 mb-3 col-3'>
                            <Select placeholder='--Trạng thái thanh toán--' value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                                <option value={'true'}>Đã thanh toán</option>
                                <option value={'false'}>Chưa thanh toán</option>
                            </Select>
                        </div>
                        <div>
                            <Accordion defaultIndex={[0]} allowMultiple >
                                {
                                    listBillFiltered.map((value, index) => {
                                        return (
                                            <AccordionItem key={value.billID} className='border-1' >
                                                <AccordionButton className='d-flex justify-content-between' _expanded={{ bg: '#ea580c', color: 'white' }}>
                                                    <div className='d-flex align-items-center'>
                                                        <b className='fs-5 me-2'>Số biên lai: {value.billID}</b>
                                                        {
                                                            value.status === 'true' ? (
                                                                <Badge colorScheme='green'>Đã thanh toán</Badge>
                                                            ) : (
                                                                <Badge colorScheme='red'>Chưa thanh toán</Badge>
                                                            )
                                                        }
                                                    </div>
                                                    <AccordionIcon />
                                                </AccordionButton>
                                                <AccordionPanel >
                                                    <p>
                                                        <b>Ngày in biên lai:    </b>
                                                        <span>{value.createdDate}</span>
                                                    </p>
                                                    <p>
                                                        <b>Trạng thái:  </b>
                                                        <span>{value.status === 'true' ? 'Đã thanh toán' : 'Chưa thanh toán'}</span>
                                                    </p>
                                                    <TableContainer>
                                                        <Table className='border-1' >
                                                            <Thead>
                                                                <Tr>
                                                                    <Th>Nội dung</Th>
                                                                    <Th isNumeric>Số tiền</Th>
                                                                </Tr>
                                                            </Thead>
                                                            <Tbody>
                                                                <Tr>
                                                                    <Td>{value.billContent}</Td>
                                                                    <Td isNumeric>{value.total}</Td>
                                                                </Tr>
                                                            </Tbody>
                                                        </Table>
                                                    </TableContainer>
                                                    <div className='d-flex flex-column align-items-end mt-2'>
                                                        {
                                                            value.billContent.includes("serviceBill") &&
                                                            (<Button className='ms-3' onClick={() => { handleOnclick(value) }} colorScheme='blue' size={'sm'}>Xem diễn giải điện nước</Button>)
                                                        }
                                                        <p className='text-end m-3'>
                                                            <span> <b>TỔNG CỘNG :</b> <b style={{ color: 'red' }}>{value.total}</b></span>
                                                        </p>
                                                    </div>

                                                </AccordionPanel>
                                            </AccordionItem>
                                        )
                                    })
                                }
                                {/* <AccordionItem className='border-1' >
                                        <AccordionButton className='d-flex justify-content-between' _expanded={{ bg: '#ea580c', color: 'white' }}>
                                            <div className='d-flex align-items-center'>
                                                <b className='fs-5 me-2'>Số biên lai: 30634</b>
                                                <Badge colorScheme='red'>Chưa thanh toán</Badge>
                                            </div>
                                            <AccordionIcon />
                                        </AccordionButton>
                                        <AccordionPanel >
                                            <p>
                                                <b>Đợt thanh toán:</b>
                                            </p>
                                            <p>
                                                <b>Ngày in biên lai:</b>
                                            </p>
                                            <p>
                                                <b>Người thu tiền:</b>
                                            </p>
                                            <p>
                                                <b>Trạng thái: </b>
                                            </p>
                                            <TableContainer>
                                                <Table className='border-1' >
                                                    <Thead>
                                                        <Tr>
                                                            <Th>Nội dung</Th>
                                                            <Th isNumeric>Số tiền</Th>
                                                        </Tr>
                                                    </Thead>
                                                    <Tbody>
                                                        <Tr>
                                                            <Td>Lệ phí phòng</Td>
                                                            <Td isNumeric>123.200 đ</Td>
                                                        </Tr>
                                                        <Tr>
                                                            <Td>Điện nước <Button className='ms-3' onClick={onOpen} colorScheme='blue' size={'sm'}>Xem diễn giải</Button></Td>

                                                            <Td isNumeric>423.200 đ</Td>
                                                        </Tr>
                                                    </Tbody>
                                                </Table>
                                            </TableContainer>
                                            <p className='text-end m-3'>
                                                <span>
                                                    <b>TỔNG CỘNG :</b> <b style={{ color: 'red' }}>680.400 đ</b>
                                                </span>

                                            </p>
                                        </AccordionPanel>
                                    </AccordionItem> */}
                            </Accordion>
                        </div>
                        <div>
                            {data && (<DienNuocModal isOpen={isOpen} onClose={onClose} data={data} />)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HoaDon
