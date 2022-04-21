import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { Button } from '../components/common/button';
import { Form, FormGroup } from '../components/common/form';
import { Message } from '../components/common/message';
import { getSession, useRegister } from '../hooks/auth';
import { useForm } from '../hooks/form';
import AuthenticationLayout from '../layouts/AuthenticationLayout';

const RegisterPage: NextPage = () => {
  const register = useRegister();
  const {
    fields,
    isLoading,
    error,
    setError,
    setIsLoading,
    setServerErrors,
    toParams,
    updateField,
    validateForm,
  } = useForm({
    first_name: {},
    last_name: {},
    email: { rules: ['email'] },
    phone: {},
    password: {},
  });
  async function handleSubmit(): Promise<void> {
    setError(null);
    setIsLoading(true);
    await register(
      toParams<{
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
        password: string;
      }>()
    ).catch((data) => {
      setError(data?.message);
      setServerErrors(data?.errors || {});
    });
    setIsLoading(false);
  }

  return (
    <AuthenticationLayout>
      <Head>
        <title>Register | Blog</title>
      </Head>
      <article>
        <h1 className="font-bold mb-4 text-3xl">Hello there!</h1>
        <p className="mb-8 text-xl">
          Create your own account to begin using blog.
        </p>
        <Form
          className="grid gap-6"
          onSubmit={() => validateForm(handleSubmit)}
        >
          {error && <Message status="error">{error}</Message>}

          <div className="grid grid-cols-2 gap-6">
            <FormGroup
              field={fields.first_name}
              id="first_name"
              label="First Name"
              placeholder="e.g. Antonio"
              value={fields.first_name.value}
              onChange={(value: string) => updateField('first_name', value)}
            />
            <FormGroup
              field={fields.last_name}
              id="last_name"
              label="Last Name"
              placeholder="e.g. Okoro"
              value={fields.last_name.value}
              onChange={(value: string) => updateField('last_name', value)}
            />
          </div>
          <FormGroup
            field={fields.email}
            id="email"
            label="Email Address"
            placeholder="e.g. antonio@okoro.com"
            value={fields.email.value}
            onChange={(value: string) => updateField('email', value)}
          />
          <FormGroup
            field={fields.phone}
            id="phone"
            label="Phone Number"
            placeholder="e.g. 08012345678"
            value={fields.phone.value}
            onChange={(value: string) => updateField('phone', value)}
          />
          <FormGroup
            field={fields.password}
            id="password"
            label="Password"
            placeholder="e.g. myPassword5678!"
            type="password"
            value={fields.password.value}
            onChange={(value: string) => updateField('password', value)}
          />
          <Button
            type="submit"
            isLoading={isLoading}
            colorScheme="black"
            size="md"
          >
            Create my account
          </Button>
          <div>
            <Button href="/login">Already have an account? Login</Button>
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

export default RegisterPage;
