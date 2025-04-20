import React from 'react';
import {useErrorStore} from '../store/errorStore';
import ErrorPage from '../../pages/ErrorPage';

interface ErrorProviderProps {
  children: React.ReactNode;
}

export default function ErrorProvider({children}: ErrorProviderProps) {
  const {customError} = useErrorStore();

  return (
    <>
      {children}
      {customError && <ErrorPage />}
    </>
  );
}
