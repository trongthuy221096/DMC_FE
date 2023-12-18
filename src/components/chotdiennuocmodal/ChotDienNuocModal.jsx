import {
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Toast,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import serverApis from "../../api/serverApis";
import { chotDienNuocSchema } from "../../schemas/schema";

const ChotDienNuocModal = ({
  isOpen,
  onClose,
  children,
  date,
  handleReset,
}) => {
  const toast = useToast();
  const dienRoom = children.usedService?.[0];
  const nuocRoom = children.usedService?.[1];
  const [year, month] = date.split("-").map(Number);
  const firstDay = new Date(year, month - 1, 1).toJSON().slice(0, 10);
  const lastDay = new Date(year, month, 1).toJSON().slice(0, 10);

  const inputValues = {
    roomID: children.roomID,
    dien_startNumber: dienRoom ? dienRoom.startNumber : "",
    dien_endNumber: dienRoom ? dienRoom.endNumber : "",
    nuoc_startNumber: nuocRoom ? nuocRoom.startNumber : "",
    nuoc_endNumber: nuocRoom ? nuocRoom.endNumber : "",
    endDate: dienRoom ? dienRoom.endDate : lastDay,
    startDate: dienRoom ? dienRoom.startDate : firstDay,
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setValues } =
    useFormik({
      enableReinitialize: true,
      initialValues: inputValues,
      validationSchema: chotDienNuocSchema,
      onSubmit: async (values, actions) => {
        try {
          const response = await serverApis.addUsedService(values);
          onClose();
          handleReset();
          toast({
            title: "Chốt điện nước thành công",
            status: "success",
            isClosable: true,
            position: "top-right",
            duration: 2000,
          });
        } catch (error) {
          toast({
            title: "Chốt điện nước thất bại",
            status: "error",
            isClosable: true,
            position: "top-right",
            duration: 2000,
          });
        }
      },
    });

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => {
        setValues(inputValues)
        onClose()
      }} size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="3xl">Chốt điện nước</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <TableContainer>
                <Table className="border-1">
                  <Tbody>
                    <Tr>
                      <Th></Th>
                      <Th>Ngày ghi</Th>
                      <Th>Ngày chốt</Th>
                      <Th></Th>
                      {/* <Th className='text-end'>Số tiền</Th> */}
                    </Tr>
                    <Tr>
                      <Td></Td>
                      <Td>
                        <Input
                          id="startDate"
                          type="date"
                          size={"sx"}
                          value={values.startDate}
                          onChange={handleChange}
                          disabled
                        />
                      </Td>
                      <Td>
                        <Input
                          id="endDate"
                          type="date"
                          size={"sx"}
                          value={values.endDate}
                          onChange={handleChange}
                          disabled
                        />
                      </Td>
                      <Td></Td>
                    </Tr>
                    <Tr>
                      <Th></Th>
                      <Th>Chỉ số đầu</Th>
                      <Th>Chỉ số cuối</Th>
                      <Th>Số tiêu thụ</Th>
                      {/* <Th className='text-end'>Số tiền</Th> */}
                    </Tr>
                    <Tr>
                      <Td>
                        <b>ĐIỆN</b>
                      </Td>
                      <Td style={{ position: "relative" }}>
                        <Input
                          id="dien_startNumber"
                          type="number"
                          size={"sx"}
                          value={values.dien_startNumber}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.dien_startNumber &&
                          touched.dien_startNumber && (
                            <small
                              className="error"
                              style={{
                                position: "absolute",
                                bottom: "-2px",
                                left: "24px",
                              }}
                            >
                              {errors.dien_startNumber}
                            </small>
                          )}
                      </Td>
                      <Td style={{ position: "relative" }}>
                        <Input
                          id="dien_endNumber"
                          type="number"
                          size={"sx"}
                          value={values.dien_endNumber}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.dien_endNumber &&
                          touched.dien_endNumber && (
                            <small
                              className="error"
                              style={{
                                position: "absolute",
                                bottom: "-2px",
                                left: "24px",
                              }}
                            >
                              {errors.dien_endNumber}
                            </small>
                          )}
                      </Td>
                      <Td>
                        {(values.dien_endNumber - values.dien_startNumber) | 0}
                      </Td>
                      {/* <Td className='text-end'><b style={{ color: "red" }}>{(values.dien_endNumber - values.dien_startNumber) * dienRoom?.price} đ</b></Td> */}
                    </Tr>
                    {/* <Tr>
                      <Td colSpan="5" className='text-end'>
                        {values.dien_endNumber - values.dien_startNumber} * {dienRoom?.price}
                        = <b>{(values.dien_endNumber - values.dien_startNumber) * dienRoom?.price} đ</b>
                      </Td>
                    </Tr> */}
                    <Tr>
                      <Td >
                        <b>NƯỚC</b>
                      </Td>
                      <Td style={{ position: "relative" }}>
                        <Input
                          id="nuoc_startNumber"
                          type="number"
                          size={"sx"}
                          value={values.nuoc_startNumber}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.nuoc_startNumber &&
                          touched.nuoc_startNumber && (
                            <small
                              className="error"
                              style={{
                                position: "absolute",
                                bottom: "-2px",
                                left: "24px",
                              }}
                            >
                              {errors.nuoc_startNumber}
                            </small>
                          )}
                      </Td>
                      <Td style={{ position: "relative" }}>
                        <Input
                          id="nuoc_endNumber"
                          type="number"
                          size={"sx"}
                          value={values.nuoc_endNumber}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        {errors.nuoc_endNumber &&
                          touched.nuoc_endNumber && (
                            <small
                              className="error"
                              style={{
                                position: "absolute",
                                bottom: "-2px",
                                left: "24px",
                              }}
                            >
                              {errors.nuoc_endNumber}
                            </small>
                          )}
                      </Td>
                      <Td>
                        {(values.nuoc_endNumber - values.nuoc_startNumber) | 0}
                      </Td>
                      {/* <Td className='text-end'><b style={{ color: "red" }}>{(values.nuoc_endNumber - values.nuoc_startNumber) * dienRoom?.price} đ</b></Td> */}
                    </Tr>
                    {/* <Tr>
                      <Td colSpan="5" className='text-end'>
                        {values.nuoc_endNumber - values.nuoc_startNumber} * {nuocRoom?.price}
                        = <b>{(values.nuoc_endNumber - values.nuoc_startNumber) * nuocRoom?.price} đ</b>
                      </Td>
                    </Tr> */}
                    {/* <Tr>
                      <Td colSpan="3"><b>Tổng cộng</b></Td>
                      <Td className='text-end'><b style={{ color: "red" }}>489.029 đ</b></Td>
                    </Tr> */}
                  </Tbody>
                </Table>
              </TableContainer>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            {(dienRoom && nuocRoom) ? (
              <Button disabled>
                Đã chốt
              </Button>
            ) : (
              <Button onClick={handleSubmit} colorScheme="orange">
                Lưu
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChotDienNuocModal;
