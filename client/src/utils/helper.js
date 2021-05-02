import moment from "moment";


export const formatDate = (timestamp) => {
    return moment(timestamp).calender();
}

export const shortFormatTime = (timestamp) => {
    return moment(timestamp).format('hh:mm a');
}