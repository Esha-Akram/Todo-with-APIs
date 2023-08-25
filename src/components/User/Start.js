import { Link } from 'react-router-dom';
import './Start.css';

export const Start = () => {
    return (
        <>
            <div id="started">
                <li><Link to="/login" className='list'>Login</Link></li>
                <div className='container'>
                    <div className='content'>
                        <h2>How to get started</h2>
                        <p>Here's quick overview of the process, from start to finish.</p>
                    </div>
                    <div className='steps'>
                        <div className='step'>
                            <button>1</button>
                            <h1>Registor youself</h1>
                            <p>Provide this facility to save your personal data and by login into you account you can access anytime your task List to make updation.</p>
                        </div>
                        <div className='step'>
                            <button>2</button>
                            <h1>Create your todo list</h1>
                            <p>Make a greate list of you daily task list in your own space. As long as you want to keep it in you private room. Have a good day!</p>
                        </div>
                        <div className='step'>
                            <button>2</button>
                            <h1>Delete, Complete, Search</h1>
                            <p>Make sure to done your daily tasks but can delete anytime if you could not complete today,
                                An extra feature is to search if you want to check quickly</p>
                        </div>
                    </div>
                    <Link to="/registor"><button className='start'>Get Started</button></Link>
                </div>
            </div>

        </>
    )
}