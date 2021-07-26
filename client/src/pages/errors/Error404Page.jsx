function Error404Page(props) {
    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            background: '#20232a',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>

            <h1 style={{
                color: 'white'
            }}><b style={{fontSize: '3.5rem'}}>404</b> <br/> Page not found</h1>
        </div>
    )
}

export default Error404Page;

