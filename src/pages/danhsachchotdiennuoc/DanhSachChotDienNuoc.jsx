/* eslint-disable no-mixed-operators */
import {
    Select,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionIcon,
    Badge,
    AccordionPanel,
    HStack,
    Input,
    FormLabel,
    useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import serverApis from "../../api/serverApis";
import RoomServiceCard from "../../components/radioCard/RoomServiceCard";
import ChotDienNuocModal from "../../components/chotdiennuocmodal/ChotDienNuocModal";

const DanhSachChotDienNuoc = () => {
    const [inputValues, setInputValues] = useState({
        dateSubmit: new Date().toJSON().slice(0, 7),
        area: "",
    });
    const [listRoom, setListRoom] = useState([]);
    const [listRoomFiltered, setListRoomFiltered] = useState([]);
    const [listArea, setListArea] = useState([]);
    const [listFloor, setListFloor] = useState([]);
    const [room, setRoom] = useState();
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({ dateSubmit: true });
    const { isOpen, onOpen, onClose } = useDisclosure();

    const validateChotThangDienNuoc = (inputValues) => {
        let errors = {};
        const submittedDate = new Date(inputValues.dateSubmit);
        const currentDate = new Date();

        // Kiểm tra nếu tháng và năm hiện tại lớn hơn tháng và năm đã nhập
        if (
            currentDate.getFullYear() > submittedDate.getFullYear() ||
            (currentDate.getFullYear() === submittedDate.getFullYear() &&
                currentDate.getMonth() > submittedDate.getMonth())
        ) {
            return errors; // Không có lỗi nếu tháng và năm hiện tại lớn hơn
        }

        // Lấy ngày cuối cùng của tháng và năm truyền vào
        const lastDayOfMonth = new Date(
            submittedDate.getFullYear(),
            submittedDate.getMonth() + 1,
            0
        );

        // So sánh ngày hiện tại với ngày cuối cùng của tháng và năm truyền vào
        if (currentDate.toDateString() !== lastDayOfMonth.toDateString()) {
            errors.dateSubmit = "Chưa đến ngày chốt";
        }

        return errors;
    };

    const handleOnchange = (e) => {
        const { name, value } = e.target;
        setInputValues({ ...inputValues, [name]: value });
    };
    useEffect(() => {
        getListRooms();
    }, [inputValues.dateSubmit]);

    useEffect(() => {
        getListArea();
        getListFloor();
    }, [listRoom, listRoomFiltered]);

    useEffect(() => {
        filterListRooms();
    }, [inputValues]);

    useEffect(() => {
        setErrors(() => validateChotThangDienNuoc(inputValues));
    }, [inputValues]);

    const getListRooms = async () => {
        try {
            const response = await serverApis.getAllRoomUsedService(
                inputValues.dateSubmit + "-01"
            );
            await setListRoom([...response]);
            await setListRoomFiltered([...response]);
        } catch (error) {
            console.log(error);
        }
    };

    const filterListRooms = () => {
        let newListRoom = [...listRoom];
        if (inputValues.area) {
            newListRoom = [
                ...newListRoom.filter((room) => room.area === inputValues.area),
            ];
        }
        setListRoomFiltered([...newListRoom]);
    };

    const getListArea = () => {
        let listNumOfArea = [
            ...new Set(listRoom.map((room) => room.area).sort()),
        ];
        let newListArea = [];
        listNumOfArea.forEach((value) => {
            newListArea.push({
                value: value,
                name: "Khu " + value,
            });
        });
        setListArea([...newListArea]);
    };
    const getListFloor = () => {
        let listNameFloor = [
            ...new Set(
                listRoomFiltered.map((room) => room.roomName.charAt(1)).sort()
            ),
        ];
        let newListFloor = [];
        listNameFloor.forEach((floor, index) => {
            let newListRoomOfFloor = listRoomFiltered.filter(
                (room) => room.roomName.charAt(1) === floor
            );

            newListFloor.push({
                value: floor,
                name: "Tầng " + floor,
                listRoom: newListRoomOfFloor,
                amount: newListRoomOfFloor.length,
            });
        });
        setListFloor([...newListFloor]);
    };

    const handleReset = () => {
        getListRooms();
    };
    return (
        <>
            <div className="container-xxl">
                <div className="row row-cols-2">
                    <div className="col-xxl-8 col-sm-12 col-lg-8 p-2">
                        <form className=" border-1 p-3 rounded-2">
                            <div className="pb-3">
                                <b className="fs-3 ">
                                    DANH SÁCH CHỐT ĐIỆN NƯỚC
                                </b>
                            </div>
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-12 col-xl-3" style={{ minWidth: '200px' }}>
                                    <FormLabel m={0}>
                                        Tháng chốt điện nước
                                    </FormLabel>
                                    <Input
                                        type="month"
                                        name="dateSubmit"
                                        value={inputValues.dateSubmit}
                                        onChange={(e) => {
                                            handleOnchange(e);
                                        }}
                                    // onBlur={() => {
                                    //     setTouched({ dateSubmit: true });
                                    // }}
                                    />
                                    {errors.dateSubmit &&
                                        touched.dateSubmit && (
                                            <small className="error">
                                                {errors.dateSubmit}
                                            </small>
                                        )}
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12 col-xl-3" style={{ minWidth: '200px' }}>
                                    <FormLabel m={0}>Chọn khu</FormLabel>
                                    <Select
                                        placeholder="--Khu--"
                                        name="area"
                                        value={inputValues.area}
                                        onChange={handleOnchange}
                                    >
                                        {listArea.map((area, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={area.value}
                                                >
                                                    {area.name}
                                                </option>
                                            );
                                        })}
                                    </Select>
                                </div>
                                <div className="col-12 mt-3">
                                    <div className="mt-3">
                                        {Object.keys(errors).length <= 0 && (
                                            <Accordion
                                                defaultIndex={[0]}
                                                allowMultiple
                                            >
                                                {listFloor.map(
                                                    (value, index) => {
                                                        return (
                                                            <AccordionItem
                                                                key={index}
                                                                className="border-1"
                                                            >
                                                                <AccordionButton
                                                                    className="d-flex justify-content-between"
                                                                    _expanded={{
                                                                        bg: "#ea580c",
                                                                        color: "white",
                                                                    }}
                                                                >
                                                                    <div className="d-flex align-items-center">
                                                                        <b className="fs-5 me-2">
                                                                            {
                                                                                value.name
                                                                            }
                                                                        </b>
                                                                        <Badge colorScheme="purple">
                                                                            {
                                                                                value.amount
                                                                            }
                                                                        </Badge>
                                                                    </div>
                                                                    <AccordionIcon />
                                                                </AccordionButton>
                                                                <AccordionPanel>
                                                                    <HStack>
                                                                        {value.listRoom.map(
                                                                            (
                                                                                phong,
                                                                                index
                                                                            ) => {
                                                                                return (
                                                                                    <div
                                                                                        key={
                                                                                            index
                                                                                        }
                                                                                        className="col-lg-6 col-md-6 col-sm-6 col-xl-6"
                                                                                    >
                                                                                        {
                                                                                            <RoomServiceCard
                                                                                                onClick={
                                                                                                    onOpen
                                                                                                }
                                                                                                setRoom={
                                                                                                    setRoom
                                                                                                }
                                                                                            >
                                                                                                {
                                                                                                    phong
                                                                                                }
                                                                                            </RoomServiceCard>
                                                                                        }
                                                                                    </div>
                                                                                );
                                                                            }
                                                                        )}
                                                                    </HStack>
                                                                </AccordionPanel>
                                                            </AccordionItem>
                                                        );
                                                    }
                                                )}
                                            </Accordion>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div>
                        {room && (
                            <ChotDienNuocModal
                                isOpen={isOpen}
                                onClose={onClose}
                                date={inputValues.dateSubmit}
                                handleReset={handleReset}
                            >
                                {room}
                            </ChotDienNuocModal>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default DanhSachChotDienNuoc;
