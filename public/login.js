function Login() {
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState('');

    return (
        <Card 
            bgcolor="secondary"
            header="Login"
            status={status}
            body={show ? 
                <LoginForm setShow={setShow} setStatus={setStatus} /> : 
                <LoginMsg setShow={setShow} />
            }
        />
    );
}

function LoginMsg(props) {
    return (
        <>
            <h5>Login Successful</h5>
            <button 
                type="button" 
                className="btn btn-light" 
                onClick={() => props.setShow(true)}>
                Go back to Login
            </button>
        </>
    );
}

function LoginForm(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleLogin() {
        const url = `/account/login/${email}/${password}`; 
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    props.setShow(true);
                    props.setStatus('Error: Invalid email or password');
                } else {
                    props.setShow(false);
                    props.setStatus('Login Successful');
                }
            })
            .catch(() => {
                props.setStatus('Error: Unable to connect to server');
            });
    }

    return (
        <>
            Email address<br/>
            <input 
                type="email" 
                className="form-control" 
                placeholder="Enter email" 
                value={email} 
                onChange={e => setEmail(e.currentTarget.value)} 
            /><br/>
            Password<br/>
            <input 
                type="password" 
                className="form-control" 
                placeholder="Enter password" 
                value={password} 
                onChange={e => setPassword(e.currentTarget.value)} 
            /><br/>
            <button 
                type="button" 
                className="btn btn-light" 
                onClick={handleLogin}>
                Login
            </button>
        </>
    );
}