import { Badge, Box, Divider, useRadio } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BiSolidUser, BiUser } from 'react-icons/bi'
import { GiElectric, GiWaterDrop } from 'react-icons/gi'
import { IoCalendarOutline } from 'react-icons/io5'
import { formatCurrencyVND } from '../../util/format'


const RoomServiceCard = ({children,onClick,setRoom}) => {

    const phong = children

    const handleOnclick = () => {
        setRoom(phong)
        onClick()
    }

    return (
        <>
            <Box className='card card-body z-1 text-center p-0'>
                <Box
                    cursor='pointer'
                    borderWidth='1px'
                    borderRadius='md'
                    boxShadow='md'
                    px={5}
                    py={3}
                    className='p-2'
                    onClick={handleOnclick}
                >
                    <div className='d-flex align-items-center'>
                        <span className='fs-4'>
                            {phong.roomName}
                        </span>
                        <div className='w-100 h-100 ms-2'>
                            {
                                phong.usedService.map((service, index) => {
                                    return (
                                        <div key={index}>
                                            {
                                                (service.name === 'dien') && <GiElectric size={16} />
                                            }
                                            {
                                                (service.name === 'nuoc') && <GiWaterDrop size={16} />
                                            }
                                            <div className='row text-start' style={{ fontSize: '12px' }}>
                                                <div className='col-6' >
                                                    <b>Số đầu: </b>
                                                    <span>{service.startNumber}</span>
                                                </div>
                                                <div className='col-6' >
                                                    <b>Số cuối: </b>
                                                    <span>{service.endNumber}</span>
                                                </div>
                                                <div className='col-6'>
                                                    <b>Thành tiền: </b>
                                                </div>
                                                <div className='col-6'>
                                                    <span>{formatCurrencyVND((service.endNumber - service.startNumber) * service.price)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            <div className='row text-start' style={{ fontSize: '12px' }}>

                                <>
                                    <div className='col-6'>
                                        <IoCalendarOutline size={16} />
                                    </div>
                                    <div className='col-6'>
                                        <span>{phong.usedService[0] ? phong.usedService[0].endDate : (<Badge colorScheme='red'>Chưa chốt</Badge>)}</span>
                                    </div>
                                </>

                            </div>
                        </div>
                    </div>
                </Box>

            </Box >
        </>
    )
}

export default RoomServiceCard