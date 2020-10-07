import { Author } from "@gadget-client/blog/dist-types/models/Author";
import { useStyletron } from "baseui";
import { ParagraphSmall } from "baseui/typography";
import React from "react";
import Gravatar from "react-gravatar";
import { EmailIcon } from "./icons/EmailIcon";
import { TwitterIcon } from "./icons/TwitterIcon";
import { Row } from "./Row";

export const AuthorBio = (props: { author: Author }) => {
  const [css, $theme] = useStyletron();

  return (
    <Row>
      <Gravatar
        email={props.author.email || `${props.author.name.toLowerCase()}@gadget.dev`}
        className={css({
          marginRight: $theme.sizing.scale600,
        })}
      />
      <div>
        <ParagraphSmall>By {props.author.name}</ParagraphSmall>
        <ParagraphSmall>{props.author.bio}</ParagraphSmall>
      </div>
      <Row>
        {props.author.twitterHandle && (
          <a target="_blank" rel="noreferrer" href={`https://twitter.com/${props.author.twitterHandle}`}>
            <TwitterIcon />
          </a>
        )}
        {props.author.email && (
          <a target="_blank" rel="noreferrer" href={`mailto:${props.author.email}`}>
            <EmailIcon />
          </a>
        )}
      </Row>
    </Row>
  );
};
