import ACTIONS from './actions'
const reducer = (state, action)=>{
    switch(action.type){
        case ACTIONS.GOOGLE_INFO:
            return {...state, googleInfo: action.payload}
            default:
                throw new Error();
    }
}

export default reducer;