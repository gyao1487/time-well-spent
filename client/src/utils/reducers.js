import ACTIONS from './actions'
const reducer = (state, action)=>{
    switch(action.type){
        case ACTIONS.USER_INFO:
            return {...state, userInfo: action.payload}
            default:
                throw new Error();
    }
}

export default reducer;