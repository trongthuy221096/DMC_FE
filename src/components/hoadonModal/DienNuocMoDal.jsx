import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Badge, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import serverApis from '../../api/serverApis'
import { formatCurrencyVND } from '../../util/format';

const DienNuocModal = ({ isOpen, onClose, data, resetData }) => {
    const toast = useToast();
    const date = data?.billContent.split(": ").at(1)
    const [dienService, setDienService] = useState()
    const [nuocService, setNuocService] = useState()
    const [inputValues, setInputValues] = useState({
        status: data.status
    })
    const [userLocal, setUserLocal] = useState(() => {
        const role = localStorage.getItem('role')
        return { role: role }
    })
    useEffect(() => {
        getUsedServices()
    }, [])
    const getUsedServices = () => {
        serverApis.getAllUsedService(date)
            .then(response => {
                setDienService(response.find((value) => value.name === "dien"))
                setNuocService(response.find((value) => value.name === "nuoc"))

            })
            .catch(error => {
                console.log(error)
            })
    }
    const handleOnchange = (e) => {
        const { name, value } = e.target
        setInputValues({ ...inputValues, [name]: value })
    }
    const handleOnSubmit = async () => {
        try {
            await serverApis.updateBill({
                billId: data.billID,
                status: inputValues.status
            })
            onClose()
            await resetData()
            toast({
                title: "Cập nhật trạng thái hóa đơn thành công",
                status: "success",
                isClosable: true,
                position: "top-right",
                duration: 2000,
            });
        } catch (error) {
            toast({
                title: "Cập nhật trạng thái hóa đơn thất bại",
                status: "error",
                isClosable: true,
                position: "top-right",
                duration: 2000,
            });
        }
    }
    return (
        <>
            {(dienService && nuocService) && (<Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size={'3xl'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Hóa đơn điện nước</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Accordion defaultIndex={[0]} allowMultiple >
                            <AccordionItem className='border-1' >
                                <AccordionButton className='d-flex justify-content-between' _expanded={{ bg: '#ea580c', color: 'white' }}>
                                    <div className='d-flex align-items-center'>
                                        <b className='fs-5 me-2'>Ngày chốt chỉ số: {date}</b>
                                    </div>
                                    <AccordionIcon />
                                </AccordionButton>
                                <AccordionPanel >
                                    <p>
                                        <b>Ngày in biên lai:    </b>
                                        <span>{data.createdDate}</span>
                                    </p>
                                    <p>
                                        <b>Trạng thái:  </b>
                                        <span>{data.status === 'true' ? 'Đã thanh toán' : 'Chưa thanh toán'}</span>
                                    </p>
                                    <TableContainer>
                                        <Table className='border-1' >
                                            <Tbody>
                                                <Tr>
                                                    <Th></Th>
                                                    <Th>Chỉ số đầu</Th>
                                                    <Th>Chỉ số cuối</Th>
                                                    <Th>Số tiêu thụ</Th>
                                                    <Th className='text-end'>Số tiền</Th>
                                                </Tr>
                                                <Tr>
                                                    <Td><b>ĐIỆN</b></Td>
                                                    <Td>{dienService.startNumber}</Td>
                                                    <Td>{dienService.endNumber}</Td>
                                                    <Td>{dienService.endNumber - dienService.startNumber}</Td>
                                                    <Td className='text-end'><b style={{ color: "red" }}>{formatCurrencyVND((dienService.endNumber - dienService.startNumber) * dienService.price)} đ</b></Td>
                                                </Tr>
                                                <Tr>
                                                    <Td colSpan="5" className='text-end'>
                                                        {(dienService.endNumber - dienService.startNumber)}
                                                        x
                                                        {formatCurrencyVND(dienService.price)}
                                                        = <b>{formatCurrencyVND((dienService.endNumber - dienService.startNumber) * dienService.price)} đ</b>
                                                    </Td>
                                                </Tr>
                                                <Tr>
                                                    <Td ><b>NƯỚC</b></Td>
                                                    <Td>{nuocService.startNumber}</Td>
                                                    <Td>{nuocService.endNumber}</Td>
                                                    <Td>{nuocService.endNumber - nuocService.startNumber}</Td>
                                                    <Td className='text-end'><b style={{ color: "red" }}>{formatCurrencyVND((nuocService.endNumber - nuocService.startNumber) * nuocService.price)} đ</b></Td>

                                                </Tr>
                                                <Tr>
                                                    <Td colSpan="5" className='text-end'>
                                                        {(nuocService.endNumber - nuocService.startNumber)}
                                                        x
                                                        {formatCurrencyVND(nuocService.price)}
                                                        = <b>{formatCurrencyVND((nuocService.endNumber - nuocService.startNumber) * nuocService.price)} đ</b>
                                                    </Td>
                                                </Tr>
                                                <Tr>
                                                    <Td colSpan="4"><b>Tổng cộng</b></Td>
                                                    <Td className='text-end'><b style={{ color: "red" }}>{formatCurrencyVND(((dienService.endNumber - dienService.startNumber) * dienService.price) + ((nuocService.endNumber - nuocService.startNumber) * nuocService.price))} đ</b></Td>
                                                </Tr>
                                            </Tbody>
                                        </Table>
                                    </TableContainer>
                                    <p className='mt-4'>Ghi chú: </p>
                                    {
                                        userLocal.role.includes('ROLE_ADMIN')&&(<Select
                                        name="status"
                                        value={inputValues.status}
                                        onChange={handleOnchange}
                                    >
                                        <option value="true">Đã thanh toán</option>
                                        <option value="false">Chưa thanh toán</option>
                                    </Select>)
                                    }

                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    </ModalBody>

                    <ModalFooter>
                        {userLocal.role.includes('ROLE_ADMIN')&&<Button onClick={handleOnSubmit} colorScheme="orange">Lưu</Button>}
                    </ModalFooter>
                </ModalContent>
            </Modal>)}
        </>
    )
}

export default DienNuocModal