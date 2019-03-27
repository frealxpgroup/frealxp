const initialState = {
    user_id: 0,
    first_name: '',
    last_name: '',
    email: '',
    judge: false,
    profile_pic: '',
    xp: 0
    }

    const UPDATE_EVERYTHING = 'UPDATE_EVERYTHING';

export function updateEverything(everythingObj) {
    return {
        type: UPDATE_EVERYTHING,
        payload: everythingObj
    }
}

export default function reducer(state= initialState, action){
    switch(action.type) {
        case UPDATE_EVERYTHING:
        return Object.assign({}, state, action.payload);
        default: 
        return state
    }
}