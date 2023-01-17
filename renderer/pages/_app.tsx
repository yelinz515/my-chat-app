import type { AppProps } from "next/app";
import { AuthContextProvider } from "../firebase/AuthContext";
import { ChatContextProvider } from "../firebase/ChatContext";
import { GroupChatContextProvider } from "../firebase/GroupChatContext";

function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <GroupChatContextProvider>
      <ChatContextProvider>
            <Component {...pageProps} />
      </ChatContextProvider>
      </GroupChatContextProvider>
    </AuthContextProvider>
  );
}

export default App;