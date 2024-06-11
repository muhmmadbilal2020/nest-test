"use client";

import { useEffect, useState } from 'react';
import { getUserProfile, updateProfile } from '../services/api';

const ProfileForm = ({ token }: { token: string }) => {
  const [profile, setProfile] = useState({ name: '', dob: '', address: '' });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProfile({ ...profile, [name]: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = await getUserProfile(token);
        setProfile(profile.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchData();
  }, [token]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const name = formData.get('name') as string;
    const address = formData.get('address') as string;
    const dob = formData.get('dob') as string;
  
    if (!name.trim() || !address.trim() || !dob.trim()) {
      alert('Please fill in all mandatory fields: Name, Address, and Date of Birth');
      return;
    }

    try {
      await updateProfile(token, profile);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Failed to update profile', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={profile.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="dob" className="form-label">Date of Birth</label>
        <input
          type="date"
          className="form-control"
          id="dob"
          name="dob"
          value={profile.dob}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="address" className="form-label">Address</label>
        <input
          type="text"
          className="form-control"
          id="address"
          name="address"
          value={profile.address}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">Update Profile</button>
    </form>
  );
};

export default ProfileForm;
