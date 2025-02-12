// filepath: /c:/Users/conferenceroom/Desktop/ENT_Login_CRUD/react-admin/src/pages/index.js
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSignIn = async () => {
        setLoading(true);
        try {
            const response = await axios.post(
                'http://localhost:5000/api/auth/signin',
                { email: 'user@gaels.iona.edu' }
            );
            setSession(response.data);
        } catch (error) {
            console.error('Error signing in:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSignOut = async () => {
        setLoading(true);
        try {
            await axios.post('http://localhost:5000/api/auth/signout');
            setSession(null);
        } catch (error) {
            console.error('Error signing out:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {!session ? (
                <>
                    <p>You are not signed in</p>
                    <button onClick={handleSignIn} disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign in'}
                    </button>
                </>
            ) : (
                <>
                    <p>Signed in as {session.email}</p>
                    <button onClick={handleSignOut} disabled={loading}>
                        {loading ? 'Signing out...' : 'Sign out'}
                    </button>
                </>
            )}
        </div>
    );
}
