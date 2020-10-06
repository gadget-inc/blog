import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";
import { Server, Sheet } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { getSiteMetaData } from "utils/helpers";
import { styletron } from "../utils/styletron";

interface ExtraProps {
  stylesheets: Sheet[];
}

/** Overriden document class component */
export default class BlogDocument extends Document<ExtraProps> {
  static async getInitialProps(ctx: any) {
    const page = await ctx.renderPage((App: any) => (props: any) => {
      return (
        <StyletronProvider value={styletron}>
          <App {...props} />
        </StyletronProvider>
      );
    });

    const stylesheets = (styletron as Server).getStylesheets() || [];
    return { ...page, stylesheets };
  }

  render() {
    const siteMetadata = getSiteMetaData();

    return (
      <Html lang={siteMetadata.language}>
        <Head>
          {this.props.stylesheets.map((sheet, i) => (
            <style
              className="_styletron_hydrate_"
              dangerouslySetInnerHTML={{ __html: sheet.css }}
              media={sheet.attrs.media}
              data-hydrate={sheet.attrs["data-hydrate"]}
              key={i}
            />
          ))}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
