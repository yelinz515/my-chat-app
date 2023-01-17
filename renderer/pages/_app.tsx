import type { AppProps } from "next/app";
import { AuthContextProvider } from "../firebase/AuthContext";
import { ChatContextProvider } from "../firebase/ChatContext";

function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
        <ChatContextProvider>
            <Component {...pageProps} />
      </ChatContextProvider>
    </AuthContextProvider>
  );
}

export default App;