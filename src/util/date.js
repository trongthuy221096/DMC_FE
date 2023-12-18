export const isTokenExpired = (expiredTime) => expiredTime * 1000 < new Date().getTime();
