import { useAuthContext } from '@/app/auth-archive/AuthContext';
import { Center, Spinner } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';



export const PageLogout = () => {
  const { updateToken } = useAuthContext();
  const navigate = useNavigate();
  const queryCache = useQueryClient();

  useEffect(() => {
    updateToken(null);
    queryCache.clear();
    navigate('/');
  }, [updateToken, queryCache, navigate]);

  return (
    <Center flex="1">
      <Spinner />
    </Center>
  );
};
