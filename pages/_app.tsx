import { EditLightTheme } from "@gadgetinc/themes";
import { BaseProvider } from "baseui";
import "lazysizes";
import { AppProps } from "next/app";
import React from "react";
import "styles/global.css";
import { Provider as StyletronProvider } from "styletron-react";
import { styletron } from "utils/styletron";

export default function BlogApp({ Component, pageProps }: AppProps) {
  return (
    <StyletronProvider value={styletron}>
      <BaseProvider theme={EditLightTheme}>
        <Component {...pageProps} />
      </BaseProvider>
    </StyletronProvider>
  );
}
