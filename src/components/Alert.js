import React from 'react'
import Swal from 'sweetalert2'
const Alert = () => {
    return (
        Swal.fire({
            title: 'Error!',
            text: 'Do you want to continue',
            icon: 'error',
            confirmButtonText: 'Cool'
        })
    )
}

export default Alert