import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API_BASE_URL } from '../config'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = (event) => {
    event.preventDefault();
    const requestData = { email, password };

    axios.post(`${API_BASE_URL}/login`, requestData)
      .then((response) => {
        try {
          if (response.status === 200) { // Assuming successful login returns 200
            localStorage.setItem("token", response.data.result.token); // Consider secure storage
            localStorage.setItem("user", JSON.stringify(response.data.result.user));
            dispatch({ type: 'LOGIN_SUCCESS', payload: response.data.result.user });
            // Call a function to add authentication token to Axios headers
            setAuthorizationToken(response.data.result.token);
            navigate('/addsales');
          } else {
            console.error("Login failed:", response.statusText);
            Swal.fire({
              icon: 'error',
              title: 'Login failed. Please try again.', // Provide a more specific error message if available in response
            });
          }
        } catch (error) {
          console.error("Error handling response:", error);
          Swal.fire({
            icon: 'error',
            title: 'An error occurred during login. Please try again later.',
          });
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        Swal.fire({
          icon: 'error',
          title: 'An error occurred. Please try again.', // Consider checking error for specific messages
        });
      });
  };

  // Function to set Authorization token in Axios headers
  const setAuthorizationToken = (token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    // axios.defaults.headers.common['_id'] = _id;
  };


  return (
    // created login form
    <div className="container mt-5">
      <h3 className="text-center">LOGIN FORM</h3>
      <form onSubmit={(e) => login(e)} className="shadow-sm p-3">
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

export default Login