import { styled } from "baseui";

export const Row = styled<{ $gap?: string }, "div">("div", (props) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: props.$gap,
}));
