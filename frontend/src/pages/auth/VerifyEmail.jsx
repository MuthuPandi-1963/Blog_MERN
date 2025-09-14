
import { useQuery } from '@tanstack/react-query';
import { Atom } from 'react-loading-indicators';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axiosInstance from '../../helpers/AxiosInstance';
import { toast } from 'react-toastify';
import { useContext, useEffect } from 'react';
import { userContext } from '../../store/Context';

function VerifyEmail() {
  const {setUsers} = useContext(userContext)
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['verifyEmail', token],
    queryFn: async () => {
      const res = await axiosInstance.get(`/auth/verify-email?token=${token}`);
      return res.data;
    },
    enabled: !!token,
    retry: false,
  });

  // 🔑 UseEffect to navigate after query finishes


    useEffect(() => {
    if (data) {
      setUsers(data?.data);
      if (data.success) {
        toast.success(data.message || 'Email verified successfully!');
        navigate('/', { replace: true }); // ✅ replace removes token URL
      } else {
        toast.error(data.message || 'Email verification failed. Please try again.');
        navigate('/register', { replace: true });
      }
    }
  }, [data, navigate]);

  useEffect(() => {
    if (isError) {
      toast.error('Something went wrong. Please try again.');
      navigate('/register', { replace: true });
    }
  }, [isError, navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Atom color="#fb8815" size="medium" text="Verifying..." textColor="#f40f0f" />
      </div>
    );
  }

  return null;
}

export default VerifyEmail;
