import { useState, useEffect } from 'react';
import './View.css';
import { Link } from 'react-router-dom';
function View() {
    const [searchInput, setSearch] = useState("");
    const [date, setDate] = useState(new Date());
    useEffect(() => {
        const intervalId = setInterval(() => {
          setDate(new Date());
        }, 1000)
    
        return () => clearInterval(intervalId);
      }, [])
    return (
        <div id="view">
            <div className="container">
                <div className="header">
                    <h1>TODO APP</h1>
                    <input type='text' name='search' id='search' value={searchInput} placeholder='&#xF002; Search..' onChange={event => setSearch(event.target.value)} />
                    <div className='profile'>
                        <i className='fa fa-user user'></i>
                        <p>Esha Akram</p>
                        <i className='fa fa-caret-down dropdown'>
                            <ul className='dropdown-menu'>
                                <Link to='/'><li>Logout</li></Link>
                            </ul>
                        </i>
                    </div>
                </div>
                <div className='banner'>
                    <h1>{date.toLocaleString('en-US', { weekday: 'long' })}</h1>
                    <p>{date.toLocaleString('en-US')}</p>
                </div>
                <div className='tasks'>
                    <li><i className='fa fa-square-o complete'> Task 1 </i>
                        <div className='icons'>
                            <i className='fa fa-pencil'></i>
                            <i className='fa fa-trash'></i>
                        </div>
                    </li>
                    <Link to='/add'><button>Add Task</button></Link>
                </div>

            </div>
        </div>
    )
}


export default View;