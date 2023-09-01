import { useState, useEffect } from 'react';
import './View.css';
import { Link, useNavigate } from 'react-router-dom';
import useCustomeHook from '../../traits/apiFunctions';

function View(props) {
    const [date, setDate] = useState(new Date());
    const [searchInput, setSearch] = useState("");
    const data = localStorage.getItem('userData');
    const userData = JSON.parse(data);
    const Navigate = useNavigate();

    const { getTask, Complete, Delete, isLoading, userTask } = useCustomeHook();

    const searched = userTask.filter((task) => task.title.toLowerCase().includes(searchInput.toLowerCase()));

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDate(new Date());
        }, 1000)
        return () => clearInterval(intervalId);
    }, [])

    function logout() {
        localStorage.removeItem('userToken');
        Navigate('/');
    }

    useEffect(() => {
        getTask()
    }, []);

    return (
        <div id="view">
            <div className="container">
                <div className="header">
                    <h1>TODO APP</h1>
                    <input type='text' name='search' id='search' value={searchInput} placeholder='&#xF002; Search..'
                        onChange={event => setSearch(event.target.value)} />
                    <div className='profile'>
                        <i className='fa fa-user user'></i>
                        <p>{userData ? userData.name : ""}</p>
                        <i className='fa fa-caret-down dropdown'>
                            <ul className='dropdown-menu'>
                                <li onClick={logout}>Logout</li>
                            </ul>
                        </i>
                    </div>
                </div>
                <div className='banner'>
                    <h1>{date.toLocaleString('en-US', { weekday: 'long' })}</h1>
                    <p>{date.toLocaleString('en-US')}</p>
                </div>
                <div className='tasks'>
                    {searched.map((task, taskId) => (
                        <li key={taskId}>
                            <i className={`fa fa-square-o ${task.completed ? 'fa fa-check-square' : ''}`}
                                onClick={() => Complete(task._id)}></i>
                            <span className={`${task.completed ? 'completed' : ''}`}> {task.title} </span>
                            <i className='fa fa-trash' onClick={() => Delete(task._id)}></i>
                            <li>{task.createdAt}</li>
                        </li>
                    ))}
                    <Link to='/add'><button>Add Task</button></Link>
                </div>
                <div className='footer'>
                    <p>Create by @Esha Akram</p>
                </div>
            </div>
            <div id="loading-overlay" className={isLoading ? 'active' : ''}>
                <i className="fa fa-spinner fa-spin"></i>
            </div>
        </div>
    )
}


export default View;