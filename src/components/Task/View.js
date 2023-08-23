import { useState, useEffect } from 'react';
import './View.css';
import { Link, useNavigate } from 'react-router-dom';
import { Delete_URL, Get_URL, Update_URL } from '../apiUrl/API_URL';
import swal from 'sweetalert';
import Swal from 'sweetalert2';

function View() {
    const [searchInput, setSearch] = useState("");
    const [date, setDate] = useState(new Date());
    const [userTask, setUserTask] = useState([]);
    const data = localStorage.getItem('userData');
    const userData = JSON.parse(data);
    const userToken = localStorage.getItem('userToken');
    const Navigate = useNavigate();

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDate(new Date());
        }, 1000)
        return () => clearInterval(intervalId);
    }, [])

    useEffect(() => {
        getTask();
    }, []);

    function logout() {
        localStorage.removeItem('userToken');
        Navigate('/');
        Swal.fire('You need to login first!')
    }
    function getTask() {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `JWT ${userToken}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${Get_URL}/me`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.success === true) {
                    setUserTask(result.tasks);
                }
                else {
                    swal("Error!", result.error.message, "error");
                }
            })
            .catch(error => {
                swal(error.message, "Internet Server Down...");
            });
    }

    function Complete(taskId) {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `JWT ${userToken}`);

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${Update_URL}/updatetask/${taskId}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.success === true) {
                    getTask();
                }
                else {
                    swal("Error!", result.error.message, "error");
                }
            })
            .catch(error => {
                console.log('error', error);
                swal('Error', 'An error occurred while deleting the task.', 'error');
            });
    }

    function Delete(taskId) {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `JWT ${userToken}`);

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`${Delete_URL}/removeTask/${taskId}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.success === true) {
                    getTask();
                    Swal.fire('Deleted', result.message, 'success');
                }
                else {
                    swal("Error!", result.error.message, "error");
                }

            })
            .catch(error => {
                swal('Error', 'An error occurred while deleting the task.', 'error');
            });
    }
    return (
        <div id="view">
            <div className="container">
                <div className="header">
                    <h1>TODO APP</h1>
                    <input type='text' name='search' id='search' value={searchInput} placeholder='&#xF002; Search..' onChange={event => setSearch(event.target.value)} />
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
                    {userTask.map((taskObj, index) => (
                        <li key={index}>
                            <i className={`fa fa-square-o complete ${taskObj.completed ? 'fa fa-check-square completed' : ''}`}
                                onClick={() => Complete(taskObj._id)} > {taskObj.title} </i>
                            <div className='icons'>
                                <i className='fa fa-pencil' ></i>
                                <i className='fa fa-trash' onClick={() => Delete(taskObj._id)}></i>
                            </div>
                        </li>
                    ))}
                    <Link to='/add'><button>Add Task</button></Link>
                </div>
            </div>
        </div>
    )
}


export default View;