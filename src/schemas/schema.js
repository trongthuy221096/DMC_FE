import * as yup from "yup";

const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})\b$/;
const cMNDRegex = /^[0-9]{10,12}$/;
const birthDayRegex = /^\d{4}-\d{2}-\d{2}$/;
const specialChar = /^[a-zA-Z0-9\s]*$/;
const regexNumber = /^[0-9]*$/;
const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const regexString =
  /^[a-zA-Z0-9àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+$/;

export const basicSchema = yup.object().shape({
  serviceName: yup
    .string()
    .max(50, "Tối đa 50 ký tự")
    .required("Trường này phải nhập")
    .matches(regexString, "Không chứa ký tự đặc biệt")
    .test("is-not-empty", "Không thể chỉ chứa khoảng trắng", (value) => {
      return value && value.trim() !== "";
    }),
  price: yup
    .string()
    .matches(regexNumber, "Chỉ nhập số và lớn hơn 0")
    .required("Vui lòng nhập ngày."),
  unit: yup
    .string()
    .matches(regexString, "Không chứa ký tự đặc biệt")
    .max(50, "Tối đa 50 ký tự")
    .required("Trường này phải nhập"),
});
// validate QuanLiThietBi
export const equipmentSchema = yup.object().shape({
  equipmentName: yup
    .string()
    .required("Trường này phải nhập")
    .min(5, "Tên thiết bị phải có ít nhất 5 ký tự")
    .max(50, "Tối đa 50 ký tự")
    .matches(specialChar, "Không được nhập ký tự đặc biệt vào"),
  equipmentInfomation: yup
    .string()
    .required("Trường này phải nhập")
    .max(200, "Tối đa 50 ký tự")
    .matches(specialChar, "Không được nhập ký tự đặc biệt vào"),
});
// validate ThietBiPhong
export const equipmentRoomSchema = yup.object().shape({
  roomID: yup.string().required("Trường này phải nhập"),
  equipmentID: yup.string().required("Trường này phải nhập"),
  originalQuantity: yup
    .number()
    .typeError("Số lượng ban đầu phải là số")
    .integer("Số lượng ban đầu phải là số nguyên")
    .positive("Số lượng ban đầu phải là số dương")
    .min(1, "Số lượng ban đầu phải lớn hơn 1")
    .max(50, "Số lượng ban đầu phải bé hơn 50")
    .required("Trường này phải nhập"),
  curentQuatity: yup
    .number()
    .typeError("Số lượng hiện tại phải là số")
    .integer("Số lượng hiện tại phải là số nguyên")
    .min(0, "Số lượng hiện tại phải lớn hơn 0")
    .max(50, "Số lượng hiện tại phải bé hơn 50")
    .required("Trường này phải nhập"),
});
// validate dangKyThongTin
export const dangKyThongTinSchema = yup.object().shape({
  name: yup
    .string()
    .required("Trường này phải nhập")
    .min(5, "Họ và tên phải ít nhất 5 ký tự")
    .matches(regexString, "Không chứa ký tự đặc biệt")
    .max(50, "Tối đa 50 ký tự"),
  gender: yup.string().required("Trường này phải nhập"),
  birthDay: yup
    .string()
    .matches(birthDayRegex, "Ngày không hợp lệ. Định dạng phải là yyyy-MM-dd")
    .test("nuocIs-greater-than-start", "Chưa đủ 18 tuổi", function (value) {
      const { birthDay } = this.parent;
      const currentDate = new Date();
      const birthDate = new Date(birthDay);
      const ageDifference = currentDate - birthDate;
      const ageInYears = ageDifference / (1000 * 60 * 60 * 24 * 365.25);
      return ageInYears >= 18;
    })
    .required("Vui lòng nhập ngày."),
  email: yup
    .string()
    .min(5, "Email phải it nhất 5 ký tự")
    .max(50, "Email tối đa 50 ký tự")
    .matches(emailRegex, "Email chưa đúng định dạng")
    .required("Trường này phải nhập"),
  cmnd: yup
    .string()
    .matches(cMNDRegex, "CMND/CCCD phải bao gồm 8-12 số")
    .required("Trường này phải nhập"),
  phoneNumber: yup
    .string()
    .matches(phoneRegex, "Số điện thoại bắt đầu (03,05,07,08,09) bao gồm 10 số")
    .required("Trường này phải nhập"),
  city: yup.string().required("Trường này phải nhập"),
  district: yup.string().required("Trường này phải nhập"),
  ward: yup.string().required("Trường này phải nhập"),
  street: yup.string().required("Trường này phải nhập"),
  nation: yup.string().required("Trường này phải nhập"),
  religion: yup.string().required("Trường này phải nhập"),
});

// validate addRoomSchema
export const addRoomSchema = yup.object().shape({
  area: yup.string().required("Trường này phải nhập"),
  floor: yup.string().required("Trường này phải nhập"),
  roomName: yup
    .string()
    .matches(specialChar, "Không được nhập ký tự đặc biệt vào")
    .min(4, "roomName phải it nhất 4 ký tự")
    .max(50, "roomName tối đa 50 ký tự")
    .required("Trường này phải nhập")
    .test(
      "roomName-starts-with-area-and-floor",
      "Room name phải bắt đầu bằng area và floor",
      function (value) {
        const area = this.parent.area;
        const floor = this.parent.floor;

        const regex = new RegExp(`^${area}${floor}\\d{2}$`);
        return regex.test(value);
      }
    ),
  numberOfBed: yup
    .number()
    .typeError("NumberOfBed phải là số")
    .integer("NumberOfBed phải là số nguyên")
    .positive("NumberOfBed phải là số dương")
    .min(4, "NumberOfBed phải lớn hơn 4")
    .max(8, "NumberOfBed phải bé hơn 8")
    .required("Trường này phải nhập")
    .test("price-is-even-number", "Số giường phải là 4 6 8", function (value) {
      if (value % 2 === 0) return true;
      return false;
    }),
  price: yup
    .number()
    .typeError("Price phải là số")
    .integer("Price phải là số nguyên")
    .positive("Price phải là số dương")
    .required("Trường này phải nhập"),
});

// validate Email
export const emailSchema = yup.object().shape({
  email: yup
    .string()
    .min(5, "Email phải it nhất 5 ký tự")
    .max(50, "Email tối đa 50 ký tự")
    .matches(emailRegex, "Email chưa đúng định dạng")
    .required("Trường này phải nhập"),
});

// validate ChangePassWord
export const changePassWord = yup.object().shape({
  currentPassword: yup.string().required("Trường này phải nhập."),
  password: yup
    .string()
    .required("Trường này phải nhập.")
    .matches(
      regexPassword,
      "Mật khẩu phải có ít nhất 8 ký tự, bao gồm ít nhất 1 chữ cái viết hoa và 1 chữ cái viết thường, cùng với ít nhất 1 số."
    ),
  repassword: yup
    .string()
    .required("Trường này phải nhập.")
    .oneOf([yup.ref("password")], "Mật khẩu không khớp"),
});

// validate ChotDienNuoc
export const chotDienNuocSchema = yup.object().shape({
  dien_startNumber: yup
    .string()
    .required("Trường này phải nhập.")
    .matches(regexNumber, "Chỉ được nhâp số "),
  dien_endNumber: yup
    .string()
    .required("Trường này phải nhập.")
    .matches(regexNumber, "Chỉ được nhâp số ")
    .test(
      "dienIs-greater-than-start",
      "Phải nhỏ hơn chỉ số đầu",
      function (value) {
        const { dien_startNumber } = this.parent;
        return parseInt(value, 10) >= parseInt(dien_startNumber, 10);
      }
    ),
  nuoc_startNumber: yup
    .string()
    .required("Trường này phải nhập.")
    .matches(regexNumber, "Chỉ được nhâp số "),
  nuoc_endNumber: yup
    .string()
    .required("Trường này phải nhập.")
    .matches(regexNumber, "Chỉ được nhâp số ")
    .test(
      "nuocIs-greater-than-start",
      "Phải lớn hơn chỉ số đầu",
      function (value) {
        const { nuoc_startNumber } = this.parent;
        return parseInt(value, 10) >= parseInt(nuoc_startNumber, 10);
      }
    ),
});
