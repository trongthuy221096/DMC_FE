/* eslint-disable no-mixed-operators */
import {
  Select,
  Stack,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  Badge,
  AccordionPanel,
  RadioGroup,
  useRadioGroup,
  HStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BiSolidUser, BiUser } from "react-icons/bi";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { useNavigate } from "react-router";
import RadioCard from "../../components/radioCard/RoomInfoCard";
import serverApis from "../../api/serverApis";
import PATH from "../../constants/path";

const gioiTinhList = [
  {
    value: 1,
    name: "Nam",
  },
  {
    value: 0,
    name: "Nữ",
  },
];

const ThemSuDungDichVu = () => {
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState({
    area: "",
    gender: "",
    roomType: "",
  });
  const [listRoom, setListRoom] = useState([]);
  const [listRoomFiltered, setListRoomFiltered] = useState([])
  const [listArea, setListArea] = useState([]);
  const [listRoomType, setListRoomType] = useState([]);
  const [listFloor, setListFloor] = useState([]);
  const { value, setValue, getRootProps, getRadioProps } = useRadioGroup({
    name: "room",
  });

  const group = getRootProps();

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  useEffect(() => {
    getListRooms();
  }, []);

  useEffect(() => {
    getListArea();
    getListRoomType();
    getListFloor();
  }, [listRoom, listRoomFiltered]);

  useEffect(() => {
    filterListRooms()
  }, [inputValues])

  const getListRooms = () => {
    serverApis
      .getListRoom()
      .then((response) => {
        setListRoom([...response]);
        setListRoomFiltered([...response])
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filterListRooms = () => {
    let newListRoom = [...listRoom]
    if (inputValues.area) {
      newListRoom = [...newListRoom.filter((room) => room.area === inputValues.area)]
    }
    if (inputValues.roomType) {
      newListRoom = [...newListRoom.filter((room) => room.numberOfBed === parseInt(inputValues.roomType))]
    }
    if (parseInt(inputValues.gender) === 1) {
      newListRoom = [...newListRoom.filter((room) => room.area === 'A' || (['4', '5'].includes(room.roomName.charAt(1)) && room.area === 'B'))]
    }
    if (parseInt(inputValues.gender) === 0) {
      newListRoom = [...newListRoom.filter((room) => room.area === 'C' || (['1', '2', '3'].includes(room.roomName.charAt(1)) && room.area === 'B'))]
    }
    // console.log(inputValues, newListRoom)
    setListRoomFiltered([...newListRoom])
  }

  const getListArea = () => {
    let listNumOfArea = [...new Set(listRoom.map((room) => room.area).sort())];
    let newListArea = [];
    listNumOfArea.forEach((value) => {
      newListArea.push({
        value: value,
        name: "Khu " + value,
      });
    });
    setListArea([...newListArea]);
  };

  const getListRoomType = () => {
    let listBedOfRoom = [...new Set(listRoom.map((room) => room.numberOfBed).sort())];
    let newListRoomType = [];
    listBedOfRoom.forEach((value) => {
      newListRoomType.push({
        value: value,
        name: "Phòng " + value + " giường",
      });
    });
    setListRoomType([...newListRoomType]);
  };

  const getListFloor = () => {
    let listNameFloor = [...new Set(listRoomFiltered.map((room) => room.roomName.charAt(1)).sort())];
    let newListFloor = [];
    listNameFloor.forEach((floor, index) => {
      let newListRoomOfFloor = listRoomFiltered.filter((room) => room.roomName.charAt(1) === floor);

      newListFloor.push({
        value: floor,
        name: "Tầng " + floor,
        listRoom: newListRoomOfFloor,
        amount: newListRoomOfFloor.length,
      });
    });
    setListFloor([...newListFloor]);
  };

  return (
    <>
      <div className="container-xxl">
        <div className="row row-cols-2 pt-5 ">
          <Stack direction="row" spacing={4} className="w-100 justify-content-between">
            <Button
              leftIcon={<GrLinkPrevious />}
              onClick={() => navigate(PATH.HOME.path)}
              variant="outline"
            >
              Quay lại
            </Button>
            <Button
              rightIcon={<GrLinkNext />}
              onClick={() => navigate(PATH.REGISTER.DANGKYTHONGTIN, { state: { room: value } })}
              backgroundColor={"#ea580c"}
              variant="solid"
              isDisabled={!value}
            >
              Kế tiếp
            </Button>
          </Stack>
          <div className="col-xxl-8 col-sm-12 col-lg-8 p-2">
            <form className=" border-1 p-3 rounded-2">
              <div className="pb-3">
                <b className="fs-3 ">CHỌN PHÒNG ĐĂNG KÝ</b>
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 col-xl-3">
                  <Select
                    placeholder="--Khu--"
                    name="area"
                    value={inputValues.area}
                    onChange={handleOnchange}
                  >
                    {listArea.map((area, index) => {
                      return (
                        <option key={index} value={area.value}>
                          {area.name}
                        </option>
                      );
                    })}
                  </Select>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-xl-3">
                  <Select
                    placeholder="--Giới tính--"
                    name="gender"
                    value={inputValues.gender}
                    onChange={handleOnchange}
                  >
                    {gioiTinhList.map((gender, index) => {
                      return (
                        <option key={index} value={gender.value}>
                          {gender.name}
                        </option>
                      );
                    })}
                  </Select>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-xl-6">
                  <Select
                    placeholder="--Loại phòng--"
                    name="roomType"
                    value={inputValues.roomType}
                    onChange={handleOnchange}
                  >
                    {listRoomType.map((type, index) => {
                      return (
                        <option key={index} value={type.value}>
                          {type.name}
                        </option>
                      );
                    })}
                  </Select>
                </div>
                <div className="col-12 mt-3">
                  <div className="row">
                    <div className="col" style={{ color: "#dd5a43" }}>
                      <BiSolidUser />
                      <b>Chỗ đã có người đăng ký</b>
                    </div>
                    <div className="col" style={{ color: "#ff892a" }}>
                      <BiSolidUser />
                      <b>Chỗ đang có người đăng ký</b>
                    </div>
                    <div className="col ">
                      <BiUser />
                      <b>Chỗ còn trống</b>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Accordion defaultIndex={[0]} allowMultiple>
                      {listFloor.map((value, index) => {
                        return (
                          <AccordionItem key={index} className="border-1">
                            <AccordionButton
                              className="d-flex justify-content-between"
                              _expanded={{ bg: "#ea580c", color: "white" }}
                            >
                              <div className="d-flex align-items-center">
                                <b className="fs-5 me-2">{value.name}</b>
                                <Badge colorScheme="purple">{value.amount}</Badge>
                              </div>
                              <AccordionIcon />
                            </AccordionButton>
                            <AccordionPanel>
                              <HStack {...group}>
                                {value.listRoom.map((phong, index) => {
                                  const radio = getRadioProps({ value: phong });
                                  return (
                                    <div
                                      key={index}
                                      className="col-lg-3 col-md-3 col-sm-4 col-xl-3"
                                    >
                                      <RadioCard {...radio} onChange={() => setValue(phong)}>
                                        {phong}
                                      </RadioCard>
                                    </div>
                                  );
                                })}
                              </HStack>
                            </AccordionPanel>
                          </AccordionItem>
                        );
                      })}
                    </Accordion>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="col-xxl-4 col-sm-12 col-lg-4 p-2">
            <div className="border-1 p-3 rounded-2">
              <div className="pb-3">
                <b className="fs-3 ">THÔNG TIN PHÒNG</b>
              </div>
              <div className="">
                <div className="row">
                  <div className="col-4">
                    <p>Khu</p>
                  </div>
                  <div className="col-8">
                    <b>{value && "Khu " + value.area}</b>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                    <p>Loại phòng</p>
                  </div>
                  <div className="col-8">
                    <b>{value && "Phòng " + value.numberOfBed + " giường"}</b>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                    <p>Phòng</p>
                  </div>
                  <div className="col-8">
                    <b>{value && value.roomName}</b>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4">
                    <p>Giá</p>
                  </div>
                  <div className="col-8">
                    <b>{value && value.price + " đ"}</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThemSuDungDichVu;
