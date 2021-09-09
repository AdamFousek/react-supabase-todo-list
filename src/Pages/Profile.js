import { useState, useEffect, useContext } from 'react'
import Card from '../components/UI/Card';
import { AuthContext } from '../store/auth-context';

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [website, setWebsite] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);
  const [error, setError] = useState(null);

  const authCtx = useContext(AuthContext);
  const user = authCtx.user;

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const { username, website, avatar_url } = await authCtx.getProfile();
        setUsername(username);
        setWebsite(website);
        setAvatarUrl(avatar_url);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false)
      }
    })();
  }, [authCtx])

  const updateProfileHandler = async () => {
    try {
      setLoading(true)
      await authCtx.updateProfile({
        username,
        website,
        avatar_url
      });
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return <Card>
    <div className="form-widget">
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={user.email} disabled />
      </div>
      <div>
        <label htmlFor="username">Name</label>
        <input
          id="username"
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="website"
          value={website || ''}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>
      <div>
        {error && <p>{error.message}</p>}
      </div>
      <div>
        <button
          className="button block primary"
          onClick={updateProfileHandler}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>
    </div>
  </Card>;
}

export default Profile;