import { monoFontFamily } from "@gadgetinc/themes";
import { styled, useStyletron } from "baseui";
import { BlockProps } from "baseui/block";
import { StyledLink } from "baseui/link";
import { StyledRoot, StyledTable, StyledTableBodyCell, StyledTableBodyRow, StyledTableHeadCell } from "baseui/table-semantic";
import type { Theme } from "baseui/theme";
import { parameterize } from "inflected";
import Link from "next/link";
import React, { ReactHTML } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { StyleObject } from "styletron-react";

export const CodeBlock = (props: { language: string; value: string }) => {
  return <SyntaxHighlighter language={props.language}>{props.value}</SyntaxHighlighter>;
};

export const getChildrenText = (children: React.ReactNode | React.ReactNode[]) => {
  let label = "";
  React.Children.forEach(children, (child: any) => {
    if (!child) return;
    if (typeof child === "string") {
      label += child;
    }
    if (child.props && child.props.children) {
      label += getChildrenText(child.props.children);
    }
  });
  return label;
};

export function useHover(): [{ onMouseEnter: React.MouseEventHandler; onMouseLeave: React.MouseEventHandler }, boolean] {
  const [value, setValue] = React.useState(false);

  const onMouseEnter = () => setValue(true);
  const onMouseLeave = () => setValue(false);

  return [{ onMouseEnter, onMouseLeave }, value];
}

export const Paragraph = styled("p", ({ $theme }) => ({
  marginBottom: $theme.sizing.scale600,
  ...$theme.typography.font300,
}));

export const StyledInlineCode = styled("code", {
  backgroundColor: "rgba(27, 31, 35, 0.05)",
  borderTopLeftRadius: "3px",
  borderTopRightRadius: "3px",
  borderBottomRightRadius: "3px",
  borderBottomLeftRadius: "3px",
  fontSize: "85%",
  marginLeft: 0,
  marginRight: 0,
  marginTop: 0,
  marginBottom: 0,
  padding: "0.2em 0.4em",
  fontFamily: monoFontFamily,
});

export const StyledBlockquote = styled("blockquote", {
  backgroundColor: "rgba(27, 31, 35, 0.03)",
  borderTopLeftRadius: "3px",
  borderTopRightRadius: "3px",
  borderBottomRightRadius: "3px",
  borderBottomLeftRadius: "3px",
  marginLeft: 0,
  marginRight: 0,
  marginTop: 0,
  marginBottom: 0,
  padding: "1em 3em",
});

// wrappers so we don't get react unrecognized props warning from the `styled` components
export const InlineCode = ({ children }: { children: React.ReactNode }) => <StyledInlineCode>{children}</StyledInlineCode>;
export const Blockquote = ({ children }: { children: React.ReactNode }) => <StyledBlockquote>{children}</StyledBlockquote>;

export const DocLink = ({ children, href }: { children: string; href: string }) => {
  const parts = href.split("#");
  const internal = (parts[0] === "" && parts[1] !== "") || !href.includes("http");
  if (internal) {
    return (
      <Link href={href} passHref>
        <StyledLink>{children}</StyledLink>
      </Link>
    );
  }
  return (
    <StyledLink href={href} target="_blank">
      {children}
    </StyledLink>
  );
};

export { StyledTableBodyCell as TD, StyledTableBodyRow as TR, StyledTableHeadCell as TH } from "baseui/table-semantic";

export const Table = ({ children }: { children: React.ReactNode }) => {
  const [_css, $theme] = useStyletron();
  return (
    <StyledRoot $style={{ marginBottom: $theme.sizing.scale600 }}>
      <StyledTable>{children}</StyledTable>
    </StyledRoot>
  );
};

export const ListItem = styled("li", ({ $theme }) => ({
  listStyleType: "circle",
  marginLeft: $theme.sizing.scale800,
  ...$theme.typography.font300,
}));

export const UnorderedList = styled("ul", ({ $theme }) => ({
  marginBottom: $theme.sizing.scale600,
}));

export const Heading = ({
  element,
  fontType,
  children,
  $style,
}: {
  element: keyof ReactHTML;
  fontType: keyof Theme["typography"];
  children: React.ReactNode;
  $style?: StyleObject;
}) => {
  const [hoverProps, isHovered] = useHover();
  const text = getChildrenText(children);
  const slug = parameterize(text);
  const [css, $theme] = useStyletron();

  return React.createElement(
    element,
    {
      ...hoverProps,
      id: slug,
      className: css({
        ...$theme.typography[fontType],
        color: $theme.colors.contentPrimary,
        marginBottom: $theme.sizing.scale400,
        ...$style,
      }),
    },
    <React.Fragment>
      {children} <Anchor isVisible={isHovered} slug={slug} element={element} />
    </React.Fragment>
  );
};

export const H1 = ({ children }: { children: React.ReactNode }) => {
  return (
    <Heading element="h1" fontType="font1050">
      {children}
    </Heading>
  );
};

export const H2 = ({ children }: { children: React.ReactNode }) => {
  const [_css, $theme] = useStyletron();

  return (
    <Heading
      element="h2"
      fontType="font850"
      $style={{
        marginTop: $theme.sizing.scale1000,
        borderBottomColor: $theme.colors.primary100,
        borderBottomStyle: $theme.borders.border100.borderStyle as any,
        borderBottomWidth: $theme.borders.border100.borderWidth,
      }}
    >
      {children}
    </Heading>
  );
};

export const H3 = ({ children }: { children: React.ReactNode }) => {
  const [_css, $theme] = useStyletron();

  return (
    <Heading
      element="h3"
      fontType="font750"
      $style={{
        marginTop: $theme.sizing.scale400,
        borderBottomColor: $theme.colors.primary50,
        borderBottomStyle: $theme.borders.border100.borderStyle as any,
        borderBottomWidth: $theme.borders.border100.borderWidth,
      }}
    >
      {children}
    </Heading>
  );
};

export const H4 = ({ children }: { children: React.ReactNode }) => (
  <Heading element="h4" fontType="font400">
    {children}
  </Heading>
);

export const H5 = ({ children }: { children: React.ReactNode }) => (
  <Heading element="h5" fontType="font350">
    {children}
  </Heading>
);

export const H6 = ({ children }: { children: React.ReactNode }) => (
  <Heading element="h6" fontType="font250">
    {children}
  </Heading>
);

const Wrapper = styled<{ $isVisible: boolean }, "a">("a", ({ $isVisible, $theme }) => ({
  visibility: $isVisible ? "visible" : "hidden",
  color: $theme.colors.primary,
  ":focus": {
    outline: `3px solid ${$theme.colors.accent}`,
    outlineOffset: "1px",
  },
}));

const elementToSize = (element: BlockProps["as"]) => {
  switch (element) {
    case "h1":
      return 22;
    case "h2":
      return 18;
    case "h3":
      return 16;
    default:
      return 14;
  }
};

export const Anchor = (props: { isVisible: boolean; slug: string; element: BlockProps["as"] }) => (
  <Wrapper $isVisible={props.isVisible} href={`#${props.slug}`}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={elementToSize(props.element)}
      height={elementToSize(props.element)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-link"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  </Wrapper>
);

export const MarkdownComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  heading: H6,
  listItem: ListItem,
  paragraph: Paragraph,
  list: UnorderedList,
  inlineCode: InlineCode,
  blockquote: Blockquote,
  link: DocLink,
  code: CodeBlock,
  table: Table,
  tableRow: StyledTableBodyRow,
  tabelCell: StyledTableBodyCell,
  tableHead: StyledTableHeadCell,
};
