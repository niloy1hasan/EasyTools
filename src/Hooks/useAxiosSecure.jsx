import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import useAuth from './useAuth';

// axios instance
const instance = axios.create({
  baseURL: 'http://localhost:3000',
});

const useAxiosSecure = () => {
  const { user, logoutUser, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    if (loading) return;

    const reqInterceptor = instance.interceptors.request.use(
      async (config) => {
        try {
          const token = await user.accessToken;

          if (token) {
            config.headers.authorization = `Bearer ${token}`;
          }
        } catch (err) {
          console.error('Token error:', err);
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    const resInterceptor = instance.interceptors.response.use(
      (response) => response,
      (error) => {
        const statusCode = error.response?.status;

        if (statusCode === 401 || statusCode === 403) {
          logoutUser().then(() => {
            navigate('/login');
          });
        }

        return Promise.reject(error);
      }
    );
    return () => {
      instance.interceptors.request.eject(reqInterceptor);
      instance.interceptors.response.eject(resInterceptor);
    };
  }, [user, logoutUser, navigate, loading]);

  return instance;
};

export default useAxiosSecure;