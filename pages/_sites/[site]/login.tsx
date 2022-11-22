import React from 'react';
import Stack from '@mui/material/Stack';
import Image from 'next/image';

import { signIn } from 'next-auth/react';
import InputAdornment from '@mui/material/InputAdornment';
import {
  Box,
  Card,
  Typography,
  Container,
  Button,
  FormHelperText,
  TextField,
  CircularProgress
} from '@mui/material';

import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import LoadingDots from '@/components/Loading/loading-dots';

import * as Yup from 'yup';
import { Formik } from 'formik';

interface LoginProps {
  project: {
    data: string;
    logo: string;
  };
}

export async function getStaticPaths() {
  const paths = [{ params: { site: 'test' } }, { params: { site: 'test2' } }];

  return {
    paths: paths,
    fallback: 'blocking'
  };
}

export const getStaticProps = async (context: { params: { site: string } }) => {
  const data = [
    { domain: 'test', data: 'RSJ PROV JABAR', logo: '/hospital_1.jpg' },
    { domain: 'test2', data: 'RSJ PROV JATIM', logo: '/hospital_2.jpg' }
  ];

  const project = data.find((p) => p.domain === context.params.site);
  if (!project) {
    return {
      notFound: true
    };
  }

  return {
    props: { project }
  };
};

export default function Login({ project }: LoginProps) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Container maxWidth="sm">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ p: 2 }}
        >
          <Image
            src={project.logo}
            alt="Picture of the author"
            width={100}
            height={100}
          />
        </Box>

        <Box>
          <Typography
            variant="h2"
            align="center"
            sx={{
              mb: 1
            }}
          >
            {project.data}
          </Typography>
        </Box>
        <Card
          sx={{
            mt: 3,
            px: 4,
            pt: 5,
            pb: 3
          }}
        >
          <Box>
            <Typography
              variant="h3"
              align="center"
              sx={{
                mb: 1
              }}
            >
              {'Selamat Datang Kembali!'}
            </Typography>
          </Box>
          <Formik
            initialValues={{
              email: 'demo@example.com',
              password: 'TokyoPass1@',
              terms: true,
              submit: null
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('The email provided should be a valid email address')
                .max(255)
                .required('The email field is required'),
              password: Yup.string()
                .max(255)
                .required('The password field is required'),
              terms: Yup.boolean().oneOf(
                [true],
                'You must agree to our terms and conditions'
              )
            })}
            onSubmit={async (
              values,
              { setErrors, setStatus, setSubmitting }
            ) => {
              try {
                const res = await signIn('credentials', {
                  email: values.email,
                  password: values.password,
                  redirect: false
                });
                console.log(res);
                setStatus({ success: true });
                setSubmitting(false);
              } catch (err) {
                setStatus({ success: false });
                setErrors({ submit: err.message });
                setSubmitting(false);
              }
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form noValidate onSubmit={handleSubmit}>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  margin="normal"
                  autoFocus
                  helperText={touched.email && errors.email}
                  label={'Email address'}
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    )
                  }}
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  margin="normal"
                  helperText={touched.password && errors.password}
                  label={'Password'}
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    )
                  }}
                />
                <Box
                  alignItems="center"
                  display="flex"
                  justifyContent="space-between"
                >
                  <Stack direction="row" alignItems="center" gap={1}>
                    <VpnKeyIcon />
                    <Typography variant="body1">{'Forgot Password'}</Typography>
                  </Stack>
                </Box>

                {Boolean(touched.terms && errors.terms) && (
                  <FormHelperText error>{errors.terms}</FormHelperText>
                )}
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Button
                    sx={{
                      mt: 3
                    }}
                    color="primary"
                    startIcon={
                      isSubmitting ? <CircularProgress size="1rem" /> : null
                    }
                    disabled={isSubmitting}
                    type="submit"
                    size="large"
                    variant="contained"
                  >
                    {'Masuk'}
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Card>
      </Container>
    </Box>
  );
}
