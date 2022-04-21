import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { Button } from '../components/common/button';
import { Form, FormGroup } from '../components/common/form';
import { Message } from '../components/common/message';
import { getSession, useLogin } from '../hooks/auth';
import { useForm } from '../hooks/form';
import AuthenticationLayout from '../layouts/AuthenticationLayout';

const LoginPage: NextPage = () => {
  const {
    error,
    fields,
    isLoading,
    setError,
    setIsLoading,
    toParams,
    updateField,
    validateForm,
  } = useForm({
    email: { rules: ['email'] },
    password: {},
  });
  const login = useLogin();

  async function handleSubmit(): Promise<void> {
    setError(null);
    setIsLoading(true);
    await login(toParams<{ email: string; password: string }>()).catch((error) =>
      setError(error?.message)
    );
    setIsLoading(false);
  }

  return (
    <AuthenticationLayout>
      <Head>
        <title>Login | Blog</title>
      </Head>
      <article>
        <h1 className="font-bold mb-4 text-3xl">Welcome Back!</h1>
        <p className="mb-16 text-xl">
          Login to your account to resume your progress.
        </p>
        <Form
          className="flex flex-col gap-8"
          onSubmit={() => validateForm(handleSubmit)}
        >
          {error && <Message status="error">{error}</Message>}

          <FormGroup
            field={fields.email}
            id="email"
            label="Email Address"
            placeholder="e.g. antonio@okoro.com"
            value={fields.email.value}
            onChange={(value: string) => updateField('email', value)}
          />
          <FormGroup
            field={fields.password}
            type="password"
            id="password"
            label="Password"
            placeholder="e.g. myPassword5678!"
            value={fields.password.value}
            onChange={(value: string) => updateField('password', value)}
          />
          <Button
            colorScheme="black"
            isLoading={isLoading}
            size="md"
            type="submit"
          >
            Login to my account
          </Button>
          <div>
            <Button href="/register">
              Don&apos;t have an account? Register
            </Button>
          </div>
        </Form>
      </article>
    </AuthenticationLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession(req);

  if (session?.user) {
    return {
      props: {},
      redirect: {
        destination: '/',
      },
    };
  }
  return { props: {} };
};

export default LoginPage;
