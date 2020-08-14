import moment from 'moment'

function formatDate (timestamp) {
    return moment(timestamp).format("DD/MM/YYYY HH:MM:SS")
}

export default {
    formatDate
}