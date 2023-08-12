import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"; 
import FormContainer from '../components/FormContainer';
import { useRegisterMutation  } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const LoginScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userType, setUserType] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [register, {isLoading}] = useRegisterMutation ();

    const { userInfo } = useSelector((state) => state.auth);
    
    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    },[navigate, userInfo]);

    const sumbmitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await register({ name, email, password, userType }).unwrap();
            dispatch(setCredentials({...res})); 
            navigate('/');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
         <FormContainer>
            <h1>Sign Up</h1>
          
            <Form onSubmit={sumbmitHandler}>
                <Form.Group className="my-2" controlId="name">
                    <Form.Label>Name</Form.Label> 
                    <Form.Control
                        type='text'
                        placeholder='Enter Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>

            
                <Form.Group className="my-2" controlId="email">
                    <Form.Label>Email Address</Form.Label> 
                    <Form.Control
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={ (e) =>setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group className="my-2" controlId="password">
                    <Form.Label>Password</Form.Label> 
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={ (e) =>setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group className="my-2" controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label> 
                    <Form.Control
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={ (e) =>setConfirmPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group className="my-2" controlId="userType">
                    <Form.Label>User Type</Form.Label> 
                    <Form.Control
                        type='number'
                        placeholder='1-9'
                        value={userType}
                        onChange={ (e) =>setUserType(e.target.value)}>
                    </Form.Control>
                </Form.Group>


                <Button type="submit" variant="primary" className="mt-3">
                    Sign Up
                </Button>
                
                <Row className="py-3">
                    <Col>
                       Already have an account? <Link to ='/login'>Login</Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>  
    );
};
export default LoginScreen;