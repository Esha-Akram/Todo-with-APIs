import { useState, useEffect } from 'react';
import './View.css';
import { Link, useNavigate } from 'react-router-dom';
import { Delete_URL, Get_URL, Update_URL } from '../../components/apiUrl/API_URL';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import useFetch from '../../components/usefetch';

function View() {
    const [searchInput, setSearch] = useState("");
    const [date, setDate] = useState(new Date());
    const [userTask, setUserTask] = useState([]);
    const data = localStorage.getItem('userData');
    const userData = JSON.parse(data);
    const userToken = localStorage.getItem('userToken');
    const Navigate = useNavigate();

    const searched = userTask.filter((task) => task.title.toLowerCase().includes(searchInput.toLowerCase()));

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
    }

    var requestOptions = {
        method: 'GET',
        headers: { "Authorization": `JWT ${userToken}` },
        redirect: 'follow'
    };
    const { fetchApi, isLoading } = useFetch(`${Get_URL}/me`, requestOptions);

    function getTask() {
        fetchApi()
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
        const updateUrl = `${Update_URL}/updatetask/${taskId}`
        var requestOptions = {
            method: 'PUT',
            headers: { "Authorization": `JWT ${userToken}` },
            redirect: 'follow'
        };

        fetchApi(updateUrl, requestOptions)
            .then(result => {
                if (result.success === true) {
                    getTask();
                }
                else {
                    swal("Error!", result.error.message, "error");
                }
            })
            .catch(error => {
                swal(error.message, "Internet Server Down...");
            });
    }

    function Delete(taskId) {
        const deleteUrl = `${Delete_URL}/removeTask/${taskId}`;

        var requestOptions = {
            method: 'DELETE',
            headers: { "Authorization": `JWT ${userToken}` },
            redirect: 'follow'
        };

        fetchApi(deleteUrl, requestOptions)
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
                swal(error.message, "Internet Server Down...");
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
                    {searched.map((taskObj, taskId) => (
                        <li key={taskId}>
                            <i className={`fa fa-square-o complete ${taskObj.completed ? 'fa fa-check-square' : ''}`}
                                onClick={() => Complete(taskObj._id)}></i>
                            <span className={`${taskObj.completed ? 'completed' : ''}`}>{taskObj.title}</span>
                            <i className='fa fa-trash' onClick={() => Delete(taskObj._id)}></i>
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