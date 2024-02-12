import Wrapper from "@/layout/Wrapper/Wrapper";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Wrapper>
  <Component {...pageProps} />
  </Wrapper>
  );
}
