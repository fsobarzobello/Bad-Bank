function Home() {
    return (
        <Card 
            bgcolor="primary"
            header="BadBank Landing Module"
            body={
                <>
                    <h5 className="card-title">Welcome to the Bad Bank</h5>
                    <p className="card-text">You can move around using the navigation bar.</p>
                    <img src="bank.png" className="img-fluid" alt="Responsive image" />
                </>
            }
        />
    );
}
