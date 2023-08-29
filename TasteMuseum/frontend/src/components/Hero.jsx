import { Container, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Hero = () => {
    const { userInfo } = useSelector((state) => state.auth);


    return (
        <div className='py-5'>
            <Container className='d-flex justify-content-center'>
                <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
                    <h1 className='text-center mb-4'>TASTE MUSEUM</h1>
                    <p className="tect-center mb-4">
                        This is me furkan emir
                    </p> 
                    <div className="d-flex">
                        <Button variant='primary' href='/login' className='me-3'>
                            Sign In
                        </Button>
                        <Button variant='secondary' href='/register'>
                             Register
                        </Button>
                     </div>
                </Card>
            </Container>
        </div>
  );
};

export default Hero;
