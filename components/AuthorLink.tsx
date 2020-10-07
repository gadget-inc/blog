import { StyledLink } from "baseui/link";
import React from "react";

export const AuthorLink = (props: { author: { name: string; twitterHandle?: string } }) => {
  if (props.author.twitterHandle) {
    return <StyledLink href={`https://twitter.com/${props.author.twitterHandle}`}>{props.author.name}</StyledLink>;
  } else {
    return <>{props.author.name}</>;
  }
};
