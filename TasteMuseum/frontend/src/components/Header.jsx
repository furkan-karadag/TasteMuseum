import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import './Header.css';

const Header = () => {
    const { userInfo } = useSelector((state) => state.auth);
    
   
    const dispatch = useDispatch();
    const navigate =useNavigate();
    
    const [logoutApicall] =useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApicall().unwrap();
            dispatch(logout());
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <header>
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand> <img
                                src="/images/tastemuseumlogo.png"
                                alt="Taste Museum Logo"
                                className="logo"
                            />
                            TASTE MUSEUM</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto'>
                            {userInfo ? (
                                <>
                                     
                                    <NavDropdown title={userInfo.name} id='username'>
                                        <LinkContainer to='/profile'>
                                            <NavDropdown.Item>Profile</NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                    </NavDropdown>
                                </>
                            ) : (
                                <>
                                    <LinkContainer to='/login'>
                                        <Nav.Link>
                                            <FaSignInAlt />Sign In
                                        </Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to='/register'>
                                        <Nav.Link>
                                            <FaSignOutAlt />Sign Up 
                                        </Nav.Link>
                                   </LinkContainer>
                                </>
                            )}    
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};
export default Header;