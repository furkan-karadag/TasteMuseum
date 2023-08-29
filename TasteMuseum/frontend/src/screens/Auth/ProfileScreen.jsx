import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { LinkContainer } from "react-router-bootstrap";
import { Button, Row, Col } from "react-bootstrap";
import FormContainer from '../../components/FormContainer';
import Loader from "../../components/Loader";

const ProfileScreen = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        }
    }, [navigate, userInfo]);

    return (
        <FormContainer>
            <h1>User Profile</h1>
            {userInfo ? (
                <div>
                    <p><strong>Name:</strong> {userInfo.name}</p>
                    <p><strong>LastName:</strong> {userInfo.lastName}</p>
                    <p><strong>Email:</strong> {userInfo.email}</p>
                    <p><strong>User Type:</strong> {userInfo.userType}</p>
                </div>
            ) : (
                <Loader />
            )}
            <Row className="py-3">
            <LinkContainer to='/'>
                <Button variant="primary" className="me-3">
                    Back to Home
                </Button>
             </LinkContainer>
            </Row>
        </FormContainer>
    );
};

export default ProfileScreen;
