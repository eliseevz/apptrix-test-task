import React, {useState} from 'react';

const LoginForm = () => {

    const [data, setData] = useState({
        username: "",
        password: ""
    })

    const handleChange = (e) => {
        setData(prevState => ({...prevState, [e.target.name]: [e.target.value]}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">username</label>
                <input onChange={handleChange} name="username" value={data.username} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">password</label>
                <input onChange={handleChange} name="password" value={data.password} type="password" className="form-control" id="exampleInputPassword1"/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
};

export default LoginForm;
