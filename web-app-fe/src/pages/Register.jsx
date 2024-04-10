import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API_BASE_URL } from '../config'
import Swal from 'sweetalert2'

const Register = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    
  const navigate = useNavigate();

    const signup = (event) => {
        event.preventDefault();

        const requestData = { firstName, lastName, email, password };

        axios.post(`${API_BASE_URL}/signup`, requestData)
            .then((response) => {
                try {
                    if (response.status === 201 || response.status === 200) {
                        Swal.fire({
                            icon: 'success',
                            title: 'User successfully registered',
                        });
                        setEmail('');
                        setPassword(''); // Clear fields only on success
                        navigate('/login');
                    } else {
                        // Handle other non-201 success codes or errors in response
                        console.error("Signup failed:", response.statusText);
                        Swal.fire({
                            icon: 'error',
                            title: 'Signup failed. Please try again.', // Provide a more specific error message
                        });
                    }
                } catch (error) {
                    console.error("Error handling response:", error);
                    Swal.fire({
                        icon: 'error',
                        title: 'An error occurred during signup. Please try again later.',
                    });
                }
            })
            .catch((error) => {
                console.error("Signup error:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'An error occurred. Please try again.', // Generic error message for network issues
                });
            });
    }

  return (
    // created a form for registration
    <div className="container mt-5">
            <h3 className="text-center">REGISTRATION FORM</h3>
            <form onSubmit={(e) => signup(e)} className="shadow-sm p-3">
                <div className="mb-3">
                    <label className="form-label text-muted">First Name</label>
                    <input type="text" value={firstName} onChange={(ev) => setFirstName(ev.target.value)} className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label text-muted">Last Name</label>
                    <input type="text" value={lastName} onChange={(ev) => setLastName(ev.target.value)} className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label text-muted">Email</label>
                    <input type="email" value={email} onChange={(ev) => setEmail(ev.target.value)} className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label text-muted">Password</label>
                    <input type="password" value={password} onChange={(ev) => setPassword(ev.target.value)} className="form-control" />
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary ">Submit</button>
                </div>
            </form>
        </div>
  )
}

export default Register