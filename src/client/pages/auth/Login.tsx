import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { AppContext } from '../../context/AppContext';

import useLogin from '../../hooks/auth/useLogin';

import { ILogin } from '../../interfaces/auth.interface';

import { Layout } from '../../components/layout';

import Button, {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '../../components/utilities/Button';
import { Input, InputType } from '../../components/utilities/Input';
import {
  SnackbarContext,
  snackbarActionType,
} from '../../components/utilities/Snackbar';

const Container = styled.div`
  margin-top: 2rem;
  width: 350px;

  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;

const Login: React.FC<{}> = () => {
  const { authState } = useContext(AppContext);
  const { snackbarDispatch } = useContext(SnackbarContext);

  const [doLogin, isLoginProcess, isSuccess, loginErrorMessage] = useLogin();

  const navigate = useNavigate();

  const yupSchema = yup.object().shape({
    username: yup
      .string()
      .required('Email is required')
      .email('Please enter a valid email'),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Minimum password is 6 characters'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: yupResolver<yup.AnyObjectSchema>(yupSchema),
  });

  const handleLogin = (data: ILogin) => doLogin(data);

  const handleRegister = () => {
    const registerRoute = { pathname: '/register' };

    navigate(registerRoute);
  };

  const handleGoToSummary = () => {
    const summaryRoute = { pathname: '/summary' };

    navigate(summaryRoute);
  };

  useEffect(() => {
    if (authState.isLogined) handleGoToSummary();
  }, []);

  useEffect(() => {
    if (loginErrorMessage) {
      snackbarDispatch({
        type: snackbarActionType.OPEN_SNACKBAR,
        message: loginErrorMessage,
      });
    }
  }, [loginErrorMessage]);

  useEffect(() => {
    if (isSuccess) handleGoToSummary();
  }, [isSuccess]);

  return (
    <Layout>
      <h1 className="font-bold text-white text-4xl">
        Trackers
        <span className="text-primary">.</span>
      </h1>
      <Container>
        <div className="w-full">
          <Input
            register={register('username')}
            type={InputType.EMAIL}
            placeholder={'Email'}
          />
          {errors['username'] && (
            <p className="text-primary text-xs text-left mt-2">
              {errors['username'].message}
            </p>
          )}
        </div>

        <Input
          register={register('password')}
          customClasses="mt-4"
          type={InputType.PASSWORD}
          placeholder={'Password'}
        />
        {errors['password'] && (
          <p className="text-primary text-xs text-left mt-2">
            {errors['password'].message}
          </p>
        )}

        <Button
          color={ButtonColor.PRIMARY}
          variant={ButtonVariant.ROUNDED}
          size={ButtonSize.LARGE}
          customClasses="w-full mt-4"
          disabled={isLoginProcess}
          onClick={handleSubmit(handleLogin)}
        >
          LOGIN
        </Button>

        <p className="text-white text-center mt-4" onClick={handleRegister}>
          Doesn&apos;t have account?&nbsp;
          <a className="text-primary cursor-pointer">Register</a>
        </p>
      </Container>
    </Layout>
  );
};

export default Login;
