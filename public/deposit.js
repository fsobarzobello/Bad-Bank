function Deposit() {
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState('');

    return (
        <Card 
            bgcolor="warning"
            header="Deposit"
            status={status}
            body={show ? 
                <DepositForm setShow={setShow} setStatus={setStatus} /> : 
                <DepositMsg setShow={setShow} />
            }
        />
    );
}

function DepositMsg(props) {
    return (
        <>
            <h5>Deposit Successful</h5>
            <button 
                type="button" 
                className="btn btn-light" 
                onClick={() => props.setShow(true)}>
                Make another deposit
            </button>
        </>
    );
}

function DepositForm(props) {
    const [email, setEmail] = React.useState('');
    const [amount, setAmount] = React.useState('');

    function handleDeposit() {
        const url = `/account/deposit/${email}/${amount}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    props.setStatus(`Error: ${data.error}`);
                } else {
                    props.setStatus(`Deposit of ${amount} successful. Your new balance: ${data.balance}`);
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
                onClick={handleDeposit}>
                Deposit
            </button>
        </>
    );
}

