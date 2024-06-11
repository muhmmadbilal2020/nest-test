import { useState } from 'react';
import { useRouter } from 'next/router';
import { signup } from '../services/api';

const SignUpForm = ({ onSignUp }: { onSignUp: (token: string) => void }) => {
  // const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    dob: '',
    address: ''
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      let email = formData.email
      let password = formData.password
      let name = formData.name
      let dob = formData.dob
      let address = formData.address

      const data = await signup(email, password, name, dob, address);
      if (data.status != 400) {
        console.log(data.data.access_token)
        onSignUp(data.data.access_token)
        alert(data.message)
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.error('Failed to sign up:', error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6 col-12 m-auto">
          <h1 className='mt-5'>Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email"
                className="form-control"
                value={formData.email} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password"
                className="form-control"
                value={formData.password} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name"
                className="form-control"
                value={formData.name} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="dob">Date of Birth:</label>
              <input type="date" id="dob" name="dob"
                className="form-control"
                value={formData.dob} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="address">Address:</label>
              <input type="text" id="address" name="address"
                className="form-control"
                value={formData.address} onChange={handleChange} required />
            </div>
            <button type="submit" className='btn btn-primary'>Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
