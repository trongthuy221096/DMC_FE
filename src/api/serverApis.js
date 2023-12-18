import axiosClient from "./axiosClient";

const serverApis = {
  register: (registerRequest) => {
    const url = "auth/register";
    return axiosClient.post(url, registerRequest);
  },
  getRooms: (data) => {
    const url = "room/";
    return axiosClient.get(url, data);
  },
  addRoom: (room) => {
    const url = "room/addRoom";
    return axiosClient.post(url, room);
  },
  deleteRoom: (id) => {
    const url = "room/" + id;
    return axiosClient.delete(url);
  },
  getListRoom: () => {
    const url = "room/listRoom";
    return axiosClient.get(url);
  },
  getListValidRoom: () => {
    const url = "room/validRooms";
    return axiosClient.get(url);
  },
  getRoomDetail: (roomID) => {
    const url = "room/" + roomID;
    return axiosClient.get(url);
  },
  getEquipmentOfRoom: (id) => {
    return axiosClient.get(`/equipmentroom/${id}`);
  },
  getUsers: (data) => {
    const url = "user/";
    return axiosClient.get(url, data);
  },
  getUserDetail: (id) => {
    const url = "user/" + id;
    return axiosClient.get(url);
  },
  getListBillByUserID: (phoneNumber) => {
    const url = `bill/list/${phoneNumber}`;
    return axiosClient.get(url);
  },
  getListBill: (params) => {
    const url = "bill/statistic";
    return axiosClient.get(url, params);
  },
  updateBill:(data)=>{
    const url='bill/update'
    return axiosClient.put(url,data)
  },
  create: (data) => {
    return axiosClient.post("/equipments", data);
  },
  update: (id, data) => {
    return axiosClient.put(`/equipments/${id}`, data);
  },
  remove: (id) => {
    return axiosClient.delete(`/equipments/${id}`);
  },
  findByEquipmentName: (equipmentName) => {
    return axiosClient.get(`/equipments/search?equipmentName=${equipmentName}`);
  },
  getListEquipment: (data) => {
    const url = "/equipments";
    return axiosClient.get(url, data);
  },
  getListEquipmentID: () => {
    const url = "/listequipment";
    return axiosClient.get(url);
  },
  requestList: (params) => {
    const url = "request/list";
    return axiosClient.get(
      url,
      // Gửi yêu cầu GET đến URL
      params
    );
  },
  updateRequest: (data) => {
    const url = "request/update";
    return axiosClient.put(
      url,
      // Gửi yêu cầu Put đến URL
      data
    );
  },
  deleteRequest: (params) => {
    const url = `request/delete/${params}`;
    return axiosClient.delete(url);
  },
  getListService: (data) => {
    const url = "service/list";
    return axiosClient.get(
      url,
      // Gửi yêu cầu Get đến URL
      data
    );
  },
  updateService: (data) => {
    const url = "service/update";
    return axiosClient.put(
      url,
      // Gửi yêu cầu Put đến URL
      data
    );
  },
  getListEquipmentRoom: (data) => {
    const url = "/equipmentroom";
    return axiosClient.get(url, data);
  },
  createEquipmentRoom: (data) => {
    const url = "/equipmentroom";
    return axiosClient.post(url, data);
  },
  updateEquipmentRoom: (data) => {
    const url = "/equipmentroom";
    return axiosClient.put(url, data);
  },
  deleteEquipmentRoom: (params) => {
    const url = "/equipmentroom";
    return axiosClient.delete(url, params);
  },
  login: (data) => {
    const url = "/auth/login";
    return axiosClient.post(url, data);
  },
  getUserByEmail: (params) => {
    const url = "/auth/forgotpassword";
    return axiosClient.get(
      url,
      // Gửi yêu cầu GET đến URL
      params
    );
  },
  updatePassword: (data) => {
    const url = "/user/updatePassword";
    return axiosClient.put(
      url,
      // Gửi yêu cầu Put đến URL
      data
    );
  },
  addUsedService: (data) => {
    const url = "/usedService/create";
    return axiosClient.post(url, data)
  },
  getAllRoomUsedService: (date) => {
    const url = `/usedService/room?thangChot=${date}`;
    return axiosClient.get(url)
  },
  getAllUsedService:(date)=>{
    const url = `/usedService?thangChot=${date}`;
    return axiosClient.get(url)
  }
};

export default serverApis;
