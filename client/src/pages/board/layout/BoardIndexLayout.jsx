import {Container, Typography} from "@material-ui/core";

function BoardIndexLayout({children}) {
    return (
        <>
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100vh',
                width: '100vw',
                zIndex: -1,
                background: '#20232a'
            }}/>

            <Container style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center'
            }} component="main" maxWidth="xs">
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    paddingTop: 30,
                    paddingBottom: 30,
                    paddingLeft: 45,
                    paddingRight: 45,
                    borderRadius: 4,
                    background: "white",
                    boxShadow: 'rgba(0, 0, 0, 1) 0px 5px 15px'
                }}>
                    <Typography component="h1" variant="h4">
                        Card Mover
                    </Typography>

                    {children}

                    <div style={{
                        fontSize: '0.8rem',
                        marginTop: 30
                    }} align={'center'}>
                        Made by <a href={'https://www.linkedin.com/in/giliardi-schmidt/'} target={"_blank"}>@Giliardi
                        Schmidt</a> as a sample project to demonstrate the use of: <br/> <b>React + Websockets + Drag &
                        Drop</b>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default BoardIndexLayout;