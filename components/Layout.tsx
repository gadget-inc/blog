import { useStyletron } from "baseui";
import { Heading, HeadingLevel } from "baseui/heading";
import { Cell, Grid } from "baseui/layout-grid";
import { StyledLink } from "baseui/link";
import { ParagraphSmall } from "baseui/typography";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import SiteConfig from "../site.config";

export function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useRouter();
  const [css, $theme] = useStyletron();
  const isRoot = pathname === "/";

  return (
    <HeadingLevel>
      <Grid>
        <Cell span={[1, 4, 8, 12]}>
          <header className={css({ marginBottom: $theme.sizing.scale400 })}>
            <Link href="/" passHref>
              <Heading as="a">{SiteConfig.siteMetadata.title}</Heading>
            </Link>
          </header>
        </Cell>

        <HeadingLevel>{children}</HeadingLevel>

        <Cell span={[1, 4, 8, 12]}>
          <ParagraphSmall as="footer">
            © {new Date().getFullYear()}, Built with <StyledLink href="https://gadget.dev/">Gadget</StyledLink>⚙️
          </ParagraphSmall>
        </Cell>
      </Grid>
    </HeadingLevel>
  );
}
