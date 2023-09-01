import { useState } from 'react';
import { API_URL } from '../config';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


function useCustomeHook() {
    const [userTask, setUserTask] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [task, setTask] = useState("");
    const [discription, setDiscription] = useState("");
    const userToken = localStorage.getItem('userToken');
    const [isLoading, setIsLoading] = useState(false);
    const Navigate = useNavigate();

    const registor = () => {
        setIsLoading(true);
        const requestOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "name": name,
                "email": email,
                "password": password
            }),
            redirect: 'follow'
        };
        return fetch(`${API_URL}/register`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setIsLoading(false);
                if (result.success === true) {
                    Swal.fire(
                        'Great',
                        'You are successfully registered!',
                        'success'
                    )
                    Navigate("/login");
                } else {
                    swal("Error!", result.error.message, "error");
                }
            })
            .catch(error => {
                console.log('error', error.message)
                swal(error.message, "Internet Server Down...");
            });
    };

    function login() {
        setIsLoading(true);
        var requestOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "email": email,
                "password": password
            }),
            redirect: 'follow'
        };

        return fetch(`${API_URL}/login`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setIsLoading(false);
                if (result.success === true) {
                    Swal.fire(
                        'Great',
                        'You are successfully login!',
                        'success'
                    )
                    localStorage.setItem('userToken', result.token);
                    localStorage.setItem('userData', JSON.stringify(result.user));
                    Navigate("/view");
                }
                else {
                    swal("Error!", result.error.message, "error");
                }
            })
            .catch(error => {
                swal(error.message, "Internet Server Down...");
            });
    }


    const getTask = () => {
        setIsLoading(true);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `JWT ${userToken}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        return fetch(`${API_URL}/me`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setIsLoading(false);
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

    const Complete = (taskId) => {
        setIsLoading(true);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `JWT ${userToken}`);

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            redirect: 'follow'
        };

        return fetch(`${API_URL}/updatetask/${taskId}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setIsLoading(false);
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

    const Delete = (taskId) => {
        setIsLoading(true);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `JWT ${userToken}`);

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };

        return fetch(`${API_URL}/removeTask/${taskId}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setIsLoading(false);
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

    function Add() {
        setIsLoading(true);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `JWT ${userToken}`);
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                "title": task,
                "description": discription
            }),
            redirect: 'follow'
        };

        return fetch(`${API_URL}/addtask`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setIsLoading(false);
                if (result.success === true) {
                    Swal.fire(
                        'Added',
                        'Task Added Succesfully!',
                        'success'
                    )
                    Navigate("/view");
                }
                else {
                    swal("Error!", result.error.message, "error");
                }

            })
            .catch(error => {
                console.log('error', error.message)
                swal(error.message, "Internet Server Down...");
            });
    }

    return { registor, login, getTask, Complete, Delete, Add, userTask, isLoading, name, email, password, task, discription, setName, setPassword, setEmail, setTask, setDiscription };
}
export default useCustomeHook;
