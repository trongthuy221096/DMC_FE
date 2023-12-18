import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableContainer, Tbody, Td, Text, Th, Tr } from '@chakra-ui/react'
import { useFormik } from 'formik';
import React, { useState } from 'react'
import serverApis from '../../api/serverApis';

const ThemSuDungDichVuModal = ({ isOpen, onClose }) => {
  const [inputValues, setInputValues] = useState({

  })
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
    initialValues: inputValues,

    onSubmit: (values, actions) => {
      serverApis.addUsedService(values).then(response => {
        console.log()
      })
    },
  });
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="3xl">Chốt điện nước</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
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
                      <Td>
                        <Input id="" name="" size={'sx'} value={values} onChange={handleChange} placeholder="Nhập tên thiết bị" />
                      </Td>
                      <Td>
                        <Input id="" name="" size={'sx'} value={values} onChange={handleChange} placeholder="Nhập tên thiết bị" />
                      </Td>
                      <Td>180</Td>
                      <Td className='text-end'><b style={{ color: "red" }}>{(172.800 + 142.880) / 8} đ</b></Td>
                    </Tr>
                    <Tr>
                      <Td colspan="5" className='text-end'>
                        100
                        x 1.728
                        = <b>172.800 đ</b>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td colspan="5" className='text-end'>
                        80
                        x 1.786
                        = <b>142.880 đ</b>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td colspan="5" className='text-end'>
                        {172.800 + 142.880} / 8
                        = <b>{(172.800 + 142.880) / 8} đ</b>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td colspan="4"><b>NƯỚC</b></Td>
                      <Td className='text-end'><b style={{ color: "red" }}>25.000 đ</b></Td>
                    </Tr>
                    <Tr>
                      <Td colspan="4"><b>Tổng cộng</b></Td>
                      <Td className='text-end'><b style={{ color: "red" }}>489.029 đ</b></Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="orange"
              variant="outline"
              mr={3}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit} colorScheme="orange">
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ThemSuDungDichVuModal