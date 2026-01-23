import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

const ProfileEditor: React.FC = () => {
  const { data, updateProfile } = usePortfolio();
  const [profile, setProfile] = useState(data.profile);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSocialChange = (index: number, field: 'url' | 'platform', value: string) => {
    const newLinks = [...profile.socialLinks];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setProfile({ ...profile, socialLinks: newLinks });
  };

  const handleSave = () => {
    updateProfile(profile);
    alert('Profile saved!');
  };

  return (
    <div>
      <h1 style={{ marginBottom: '20px' }}>Edit Profile</h1>

      <div className="dashboard-card">
        <div className="form-group">
          <label>Full Name</label>
          <input name="name" value={profile.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Professional Title</label>
          <input name="title" value={profile.title} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Tagline</label>
          <textarea name="tagline" value={profile.tagline} onChange={handleChange} style={{ height: '60px' }} />
        </div>
        <div className="form-group">
          <label>Avatar URL</label>
          <input name="avatar" value={profile.avatar} onChange={handleChange} />
        </div>
      </div>

      <div className="dashboard-card">
        <h3>Social Links</h3>
        {profile.socialLinks.map((link, i) => (
          <div key={i} className="flex-row" style={{ marginBottom: '10px' }}>
            <span style={{ width: '80px', fontWeight: 600 }}>{link.platform}</span>
            <input
              value={link.url}
              onChange={(e) => handleSocialChange(i, 'url', e.target.value)}
              placeholder="https://..."
            />
          </div>
        ))}
      </div>

      <button className="btn btn-primary" onClick={handleSave}>Save Changes</button>
    </div>
  );
};

export default ProfileEditor;
