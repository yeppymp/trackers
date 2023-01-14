import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import useRegister from '../../hooks/auth/useRegister';

import { IRegister } from '../../interfaces/auth.interface';

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

const Register: React.FC<{}> = () => {
  const { snackbarDispatch } = useContext(SnackbarContext);

  const [
    doRegister,
    isRegisterProcess,
    registerSuccessMessage,
    registerErrorMessage,
  ] = useRegister();

  const navigate = useNavigate();

  const yupSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup
      .string()
      .required('Email is required')
      .email('Please enter a valid email'),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Not strong! at atleast 6'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegister>({
    resolver: yupResolver<yup.AnyObjectSchema>(yupSchema),
  });

  const handleRegister = (data: IRegister) => doRegister(data);

  const handleLogin = () => {
    const registerRoute = { pathname: '/login' };

    navigate(registerRoute);
  };

  useEffect(() => {
    if (registerErrorMessage) {
      snackbarDispatch({
        type: snackbarActionType.OPEN_SNACKBAR,
        message: registerErrorMessage,
      });
    }
  }, [registerErrorMessage]);

  useEffect(() => {
    if (registerSuccessMessage) {
      snackbarDispatch({
        type: snackbarActionType.OPEN_SNACKBAR,
        message: registerSuccessMessage,
      });

      handleLogin();
    }
  }, [registerSuccessMessage]);

  return (
    <Layout>
      <h1 className="font-bold text-white text-4xl">
        Trackers
        <span className="text-primary">.</span>
      </h1>
      <Container>
        <Input
          register={register('name')}
          type={InputType.TEXT}
          placeholder={'Name'}
        />
        {errors['name'] && (
          <p className="text-primary text-xs text-left mt-2">
            {errors['name'].message}
          </p>
        )}

        <Input
          register={register('email')}
          customClasses="mt-4"
          type={InputType.EMAIL}
          placeholder={'Email'}
        />
        {errors['email'] && (
          <p className="text-primary text-xs text-left mt-2">
            {errors['email'].message}
          </p>
        )}

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
          disabled={isRegisterProcess}
          onClick={handleSubmit(handleRegister)}
        >
          REGISTER
        </Button>

        <p className="text-white text-center mt-4" onClick={handleLogin}>
          Already have an account?&nbsp;
          <a className="text-primary cursor-pointer">Login</a>
        </p>
      </Container>
    </Layout>
  );
};

export default Register;
