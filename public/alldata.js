function AllData(){
    const [data, setData] = React.useState('');

    React.useEffect(() => {
        //fetch all accounts fromAPI
        fetch('/account/all')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setData(JSON.stringify(data));
            });
    }
    , []);
    return(
        <>
        <h1>All Data in Store:</h1>
        {data}
        </>
    )
}