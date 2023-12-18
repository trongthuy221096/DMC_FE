import provinceClient from "./provinceClient";

const provinceApis = {
    getListProvinces: () => {
        const url = 'p'
        return provinceClient.get(url)
    },
    getListDistrictsByProvinceCode: (code) => {
        const url = `p/${code}`
        const params = {
            depth: 2
        }
        return provinceClient.get(url, { params })
    },
    getListWardsByDistrictCode: (code) => {
        const url = `d/${code}`
        const params = {
            depth: 2
        }
        return provinceClient.get(url, { params })
    }
}

export default provinceApis;
