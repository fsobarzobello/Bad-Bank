function Withdraw() {
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState('');

    return (
        <Card 
            bgcolor="success"
            header="Withdraw"
            status={status}
            body={show ? 
                <WithdrawForm setShow={setShow} setStatus={setStatus} /> : 
                <WithdrawMsg setShow={setShow} />
            }
        />
    );
}

function WithdrawMsg(props) {
    return (
        <>
            <h5>Withdraw Successful</h5>
            <button 
                type="button" 
                className="btn btn-light" 
                onClick={() => props.setShow(true)}>
                Go back to Login
            </button>
        </>
    );
}

function WithdrawForm(props) {
    const [email, setEmail] = React.useState('');
    const [amount, setAmount] = React.useState('');

    function handleWithdraw() {
        const url = `/account/withdraw/${email}/${amount}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    props.setStatus(`Error: ${data.error}`);
                } else {
                    props.setStatus(`Withdraw of ${amount} successful. New balance: ${data.balance}`);
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
            Amount<br/>
            <input 
                type="number" 
                className="form-control" 
                placeholder="Enter amount" 
                value={amount} 
                onChange={e => setAmount(e.currentTarget.value)} 
            /><br/>
            <button 
                type="button" 
                className="btn btn-light" 
                onClick={handleWithdraw}>
                Withdraw
            </button>
        </>
    );
}

