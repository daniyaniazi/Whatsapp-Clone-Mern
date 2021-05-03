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
            const SenderId = action.payload.senderId
            const receiverId = action.payload.receiverId

            if (draftState[SenderId] !== undefined) {
                console.log("we are in sender now")
                draftState[`${action.payload.senderId}`]["recentMsg"] = {
                    time: action.payload.time,
                    msg: action.payload.msg,

                }
            }
            if (draftState[receiverId] !== undefined) {
                draftState[receiverId]["recentMsg"] = {
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
