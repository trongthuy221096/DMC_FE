import { Box, useRadio } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BiSolidUser, BiUser } from 'react-icons/bi'


const RoomInfoCard = (props) => {

    const {state, getInputProps, getRadioProps } = useRadio(props)
    const [listBed, setListBed] = useState([])

    const input = getInputProps()
    const checkbox = getRadioProps()
    const phong = props.children
    console.log(phong)

    useEffect(() => {
        getListBed()
    }, [])

    const getListBed = () => {

        let availableBed = []
        for (let i = 1; i <= phong.numberOfBed; i++) {
            if (i > phong.numberOfPeople) {
                availableBed.push({
                    isUsed: false
                })
            }
            else {
                availableBed.push({
                    isUsed: true
                })
            }
        }
        setListBed([...availableBed])
    }



    return (
        <>
            <Box as={'label'} className='card card-body z-1 text-center p-0'>
                <input {...input} />
                <Box
                    {...checkbox}
                    cursor='pointer'
                    borderWidth='1px'
                    borderRadius='md'
                    boxShadow='md'
                    _checked={{
                        bg: 'teal.600',
                        color: 'white',
                        borderColor: 'teal.600',
                    }}
                    _focus={{
                        boxShadow: 'outline',
                    }}
                    px={5}
                    py={3}
                    >
                    <div className='d-flex flex-column align-items-center' style={{height:'108px'}}>
                        <span className='fs-4'>
                            {phong.roomName}
                        </span>
                        <span className='fs-6 '>
                            Phòng {phong.numberOfBed} giường
                        </span>
                        <div className='col-10 row p-1'>
                            {
                                listBed.map((value, index) => {
                                    return (
                                        <div key={index} className='col-3 p-0 fs-5 ' >
                                            {
                                                value.isUsed ? (
                                                    <BiSolidUser color='#dd5a43' />
                                                ) : (
                                                    <BiUser />
                                                )
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </Box>

            </Box>
        </>
    )
}

export default RoomInfoCard