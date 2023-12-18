import React, { useEffect, useState } from 'react'
import serverApis from '../../api/serverApis'
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useToast } from '@chakra-ui/react'
import { formatCurrencyVND } from '../../util/format';

const RoomMoDal = ({ isOpen, onClose, data, resetData }) => {
    const toast = useToast();
    const [inputValues, setInputValues] = useState({
        status: data.status
    })

    const handleOnchange = (e) => {
        const { name, value } = e.target
        setInputValues({ ...inputValues, [name]: value })
    }
    const handleOnSubmit = async () => {
        try{
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
        }catch(error){
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
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size={'3xl'}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Hóa đơn phòng</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Accordion defaultIndex={[0]} allowMultiple >
                            <AccordionItem className='border-1' >
                                <AccordionButton className='d-flex justify-content-between' _expanded={{ bg: '#ea580c', color: 'white' }}>
                                    <div className='d-flex align-items-center'>
                                        <b className='fs-5 me-2'>Hóa đơn phòng tháng: {data.billContent.split(": ").at(1)}</b>
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
                                            <Thead>
                                                <Tr>
                                                    <Th>Nội dung</Th>
                                                    <Th isNumeric>Số tiền</Th>
                                                </Tr>
                                            </Thead>
                                            <Tbody>
                                                <Tr>
                                                    <Td>{data.billContent}</Td>
                                                    <Td isNumeric>{formatCurrencyVND(data.total)}</Td>
                                                </Tr>
                                            </Tbody>
                                        </Table>
                                    </TableContainer>
                                    <p className='mt-4'>Ghi chú: </p>
                                    <Select
                                        name="status"
                                        value={inputValues.status}
                                        onChange={handleOnchange}
                                    >
                                        <option value="true">Đã thanh toán</option>
                                        <option value="false">Chưa thanh toán</option>
                                    </Select>

                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={handleOnSubmit} colorScheme="orange">Lưu</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default RoomMoDal