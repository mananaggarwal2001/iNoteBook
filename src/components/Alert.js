import React from 'react'
import Swal from 'sweetalert2'
const Alert = (icon, message) => {
    return (
        Swal.fire({
            icon: icon,
            text: message,
            showCancelButton: false,
            showConfirmButton: false,
            showDenyButton: false,
            showCloseButton: false,
            timer:1500
        })
    )
}

export default Alert