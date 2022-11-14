import {
  Box,
  Card,
  Link,
  Tooltip,
  Typography,
  Container,
  Alert,
  styled,
  Button,
  Checkbox,
  FormHelperText,
  TextField,
  FormControlLabel,
  CircularProgress
} from '@mui/material';

import * as Yup from 'yup';

import { Formik } from 'formik';

const CardImg = styled(Card)(
  ({ theme }) => `
      width: 90px;
      height: 80px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      position: relative;
      background: ${theme.colors.alpha.white[100]};
      margin: 0 ${theme.spacing(1)};
      border: 1px solid ${theme.colors.alpha.black[10]};
      transition: ${theme.transitions.create(['all'])};
  
      &:hover {
        border-color: ${theme.colors.primary.main};
      }
  `
);

const BottomWrapper = styled(Box)(
  ({ theme }) => `
      padding: ${theme.spacing(3)};
      display: flex;
      align-items: center;
      justify-content: center;
  `
);

const MainContent = styled(Box)(
  () => `
      height: 100%;
      display: flex;
      flex: 1;
      flex-direction: column;
  `
);

const TopWrapper = styled(Box)(
  () => `
    display: flex;
    width: 100%;
    flex: 1;
    padding: 20px;
  `
);

function login() {
  return (
    <MainContent>
      <TopWrapper>
        <Container maxWidth="sm">
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
                variant="h2"
                sx={{
                  mb: 1
                }}
              >
                {'Sign in'}
              </Typography>
              <Typography
                variant="h4"
                color="text.secondary"
                fontWeight="normal"
                sx={{
                  mb: 3
                }}
              >
                {'Fill in the fields below to sign into your account.'}
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
              onSubmit={function () {
                console.log();
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
                  />
                  <Box
                    alignItems="center"
                    display="flex"
                    justifyContent="space-between"
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.terms}
                          name="terms"
                          color="primary"
                          onChange={handleChange}
                        />
                      }
                      label={
                        <>
                          <Typography variant="body2">
                            {'I accept the'}{' '}
                            <Link component="a" href="#">
                              {'terms and conditions'}
                            </Link>
                            .
                          </Typography>
                        </>
                      }
                    />
                  </Box>

                  {Boolean(touched.terms && errors.terms) && (
                    <FormHelperText error>{errors.terms}</FormHelperText>
                  )}

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
                    fullWidth
                    size="large"
                    variant="contained"
                  >
                    {'Sign in'}
                  </Button>
                </form>
              )}
            </Formik>
            <Box my={4}>
              <Typography
                component="span"
                variant="subtitle2"
                color="text.primary"
                fontWeight="bold"
              >
                {'Don’t have an account, yet?'}
              </Typography>{' '}
            </Box>

            <Tooltip title={'Used only for the live preview demonstration !'}>
              <Alert severity="warning">
                Use <b>demo@example.com</b> and password <b>TokyoPass1@</b>
              </Alert>
            </Tooltip>
          </Card>
          <BottomWrapper>
            <Tooltip arrow placement="top" title="Auth0">
              <CardImg></CardImg>
            </Tooltip>
          </BottomWrapper>

          <Alert severity="error">
            {
              'Learn how to switch between auth methods by reading the section we’ve prepared in the documentation.'
            }
          </Alert>
        </Container>
      </TopWrapper>
    </MainContent>
  );
}

export default login;
