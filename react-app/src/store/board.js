
const GET_BOARDS="boards/get_Boards"
const GET_SINGLE_BOARD = "boards/get_single_board"
const CREATE_BOARD = 'boards/create_board'
const REMOVE_USER_BOARDS = 'boards/remove_user_boards'
const UPDATE_BOARD = 'boards/update_board'
const DELETE_BOARD = 'boards/delete/board'
const REMOVE_SINGLEBOARD = 'boards/remove_singled'

const getBoards = (list) => {
    return {
        type: GET_BOARDS,
        payload: list
    }
}

const getSingleBoard = (obj) => {
    return {
        type: GET_SINGLE_BOARD,
        payload: obj
    }
}

const createSingleBoard = (obj) => {
    return {
        type: CREATE_BOARD,
        payload: obj
    }
}

const updateSingleBoard = obj => {
    return {
        type: UPDATE_BOARD,
        payload: obj
    }
}

const deleteSingleBoard = (id) => {
    return {
        type: DELETE_BOARD,
        id
    }
}

export const removeSingleBoard = () => {
    return {
        type: REMOVE_SINGLEBOARD
    }
}

export const removeUserBoards = () => {
    return {
        type: REMOVE_USER_BOARDS
    }
}


export const get_all_boards = () => async dispatch => {
    const response = await fetch("/api/boards/")

    if(response.ok) {
        const data = await response.json();

        dispatch(getBoards(data))
    }


}

export const get_single_board = (id) => async dispatch => {
    const response = await fetch(`/api/boards/${id}`)

    if(response.ok) {
        const data = await response.json()

        dispatch(getSingleBoard(data))
    }
}

export const create_board = (obj) => async dispatch => {
    const response = await fetch(`/api/boards/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })

    if(response.ok) {
        const data = await response.json()


        dispatch(createSingleBoard(data))
    } else {
        return 'Recieved unknown Error'
    }

}

export const update_board = (obj, id) => async dispatch => {
    console.log(id)
    const response = await fetch(`/api/boards/${id}/edit`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })

    if(response.ok) {
        const data = await response.json()

        dispatch(updateSingleBoard(data))
    } else {
        return 'Update error'
    }
}

export const delete_board = (id) => async dispatch => {
    console.log(id)
    const response = await fetch(`/api/boards/${id}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        const data = await response.json()
        console.log(data)
        dispatch(deleteSingleBoard(id))
    }
}

let initialState = {
    userBoards: {},
    singleBoard: {}
}


export default function reducer(state=initialState, action) {
    switch (action.type) {
        case GET_BOARDS: {
            const newState = {...state}
            action.payload.forEach(ele => newState.userBoards[ele.id] = ele)
            return newState
        }
        case GET_SINGLE_BOARD: {
            const newState = {...state, singleBoard: {}}
            newState.singleBoard = action.payload
            return newState
        }
        case CREATE_BOARD: {
            const newState = {...state, userBoards: {...state.userBoards}}
            newState.userBoards[action.payload.id] = action.payload
            return newState;
        }
        case UPDATE_BOARD: {
            const newState = {...state, userBoards: {...state.userBoards}}
            newState.singleBoard[action.payload.id] = action.payload
            return newState
        }
        case REMOVE_SINGLEBOARD: {
            const newState = {...state, singleBoard: {}}
            return newState
        }

        case REMOVE_USER_BOARDS: {
            const newState = {...state, userBoards: {}}
            return newState
        }

        case DELETE_BOARD: {
            const newState = {...state}
            delete newState.userBoards[action.id]
            delete newState.singleBoard[action.id]
            return newState
        }
        default:
            return state;
    }
}
