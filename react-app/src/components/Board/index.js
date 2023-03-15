import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { get_single_board } from '../../store/board'
import { NavLink, useParams } from 'react-router-dom'
import './boards.css'



const Boards = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const singleBoard = useSelector(state => state.boards.singleBoard)

    const [dropDown, setDropDown] = useState(false)

    const buttonHandler = () => {
        setDropDown(!dropDown)
    }

    useEffect(() => {
        dispatch(get_single_board(id))
    }, [dispatch, id])


    return singleBoard ? (
        <div className='board-container'>

                <h1 style={{fontSize: '36px'}}>{singleBoard.name}</h1>
                <div className='board-dropdown-container'>
                    <button className="clickable" onClick={buttonHandler}><i className="fa-solid fa-bars" style={{fontSize: '20px', padding: '5px'}} ></i></button>
                    <div className='board-dropdown-menu'>
                        {dropDown && (
                             <ul style={{listStyle: 'none', padding: '1px 10px'}}>
                                <li>Edit</li>
                                <li>Delete</li>
                            </ul>
                        )}
                    </div>
                </div>
            <p style={{fontSize: '18px'}}>{singleBoard.description}</p>

            <div className='board-pin-container' style={{display: 'flex'}}>
                {singleBoard.pins?.map(pin => (
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <NavLink to={`/pins/${pin.id}`}>
                            <div className='single-pin'>
                                <img src={pin.imageUrl} alt='Image'/>
                            </div>
                        </NavLink>
                    </div>
                ))}
            </div>
        </div>
    ): <div>Loading...</div>
}

export default Boards
