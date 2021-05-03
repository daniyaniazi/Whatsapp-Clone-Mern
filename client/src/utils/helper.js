import moment from "moment";


export const formatDate = (timestamp) => {
    if (timestamp) return moment(timestamp).calender();
}

export const shortFormatTime = (timestamp) => {
    if (timestamp) return moment(timestamp).format('hh:mm a');
}