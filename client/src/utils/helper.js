import moment from "moment";


export const formatDate = (timestamp) => {
    if (timestamp) return moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
}

export const shortFormatTime = (timestamp) => {
    if (timestamp) return moment(timestamp).format('hh:mm a');
}