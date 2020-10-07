import { styled } from "baseui";

export const MetaLabel = styled("div", ({ $theme }) => ({
  ...$theme.typography.font400,
  color: $theme.colors.contentSecondary,
}));
