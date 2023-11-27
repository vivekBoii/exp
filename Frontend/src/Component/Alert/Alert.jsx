import React from 'react';
import { Alert, AlertIcon } from '@chakra-ui/react';

const AlertBox = ({type, message}) => {
  return (
    <>
        <Alert status={type}>
            <AlertIcon />
            {message}
        </Alert>
    </>
  )
}

export default AlertBox