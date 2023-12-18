export function formatRoomName(inputString) {
    if (inputString) {
        const firstLetter = inputString.charAt(0);
        return `Khu ${firstLetter} - phòng ${inputString}`;
    }
}

export function splitAddress(inputString, index) {
    if (inputString) {
        const splitArray = inputString.split(";");
        return splitArray[index];
    }
}
export function formatNumberWithCommas(value) {
    return value && value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export const formatCurrencyVND = (value) => {
    const formatter = new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", });
    return formatter.format(value);
}
export function getRoleFromUserRole(userRole) {
    if (userRole === "[ROLE_USER]") {
        return "Member";
    } else if (userRole === "[ROLE_ADMIN]") {
        return "Admin";
    } else {
        return null; // Hoặc trả về giá trị mặc định khác nếu cần
    }
}
