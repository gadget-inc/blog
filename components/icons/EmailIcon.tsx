import { StyledSvg } from "baseui/icon";
import React from "react";

export const EmailIcon = (props: React.ComponentProps<typeof StyledSvg>) => (
  <StyledSvg viewBox="0 0 32 32" {...props}>
    <g id="Style_2">
      <g>
        <path d="M16,0C7.163,0,0,7.163,0,16c0,8.836,7.163,16,16,16s16-7.164,16-16C32,7.163,24.837,0,16,0z" fill="#333333" />
      </g>
      <g>
        <polygon fill="#FFFFFF" points="6.518,21.815 11.707,15.291 6.518,12.119   " />
        <polygon fill="#FFFFFF" points="19.5,15.746 15.989,17.908 12.472,15.758 7.11,22.5 24.867,22.5   " />
        <polygon fill="#FFFFFF" points="15.988,16.864 25.482,11.017 25.482,9.5 6.518,9.5 6.518,11.076   " />
        <polygon fill="#FFFFFF" points="20.263,15.276 25.482,21.843 25.482,12.062   " />
      </g>
    </g>
  </StyledSvg>
);
