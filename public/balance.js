function Balance() {
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState('');

    return (
        <Card 
            bgcolor="info"
            header="Balance"
            status={status}
            body={show ? 
                <BalanceForm setShow={setShow} setStatus={setStatus} /> : 
                <BalanceMsg setShow={setShow} />
            }
        />
    );
}

function BalanceMsg(props) {
    return (
        <>
            <h5>Your Balance</h5>
            <button 
                type="button" 
                className="btn btn-light" 
                onClick={() => props.setShow(true)}>
                Return
            </button>
        </>
    );
}

function BalanceForm(props) {
    const [email, setEmail] = React.useState('');

    function handleCheckBalance() {
        const url = `/account/balance/${email}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    props.setStatus(`Error: ${data.error}`);
                } else {
                    props.setStatus(`Balance: ${data.balance}`);
                    props.setShow(false);
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
            <button 
                type="button" 
                className="btn btn-light" 
                onClick={handleCheckBalance}>
                Balance
            </button> 
        </>
    );
}
