const friendListRedicer = (state, action) => {
    let draftState = { ...state }
    switch (action.type) {
        case "FRIENDS":
            draftState = action.payload
            return draftState

        case "NEW_FRIEND":
            draftState = { ...draftState, [action.payload.sesionId]: action.payload }
            return draftState

        case "RECENT_MSG":
            if (draftState[action.payload.senderId]) {
                draftState[action.payload.senderId]["recentMsg"] = {
                    time: action.payload.time,
                    msg: action.payload.msg,

                }
            }
            if (draftState[action.payload.recieverId]) {
                draftState[action.payload.recieverId]["recentMsg"] = {
                    time: action.payload.time,
                    msg: action.payload.msg,

                }
            }
            return draftState

        default:
            return state;
    }
}

export default friendListRedicer
