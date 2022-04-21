import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import '../assets/css/tailwind.css';
import '../assets/css/editor.scss';
import { AuthenticationContextWrapper } from '../contexts/AuthenticationContext';
import { KeybindContextWrapper } from '../contexts/KeybindContext';
import { store } from '../store';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <AuthenticationContextWrapper>
      <Provider store={store}>
        <KeybindContextWrapper>
          <Component {...pageProps} />
        </KeybindContextWrapper>
      </Provider>
    </AuthenticationContextWrapper>
  );
}
