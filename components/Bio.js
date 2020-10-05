import clsx from "clsx";
import Gravatar from "react-gravatar";
import "lazysizes";

export default function Bio({ author, className }) {
  return (
    <div className={clsx(`flex items-center`, className)}>
      <Gravatar
        email="a-email@example.com"
        alt="Profile Image"
        className="lazyload blur-up flex-shrink-0 mb-0 mr-3 rounded-full w-14 h-14"
      />

      <p className="text-base leading-7">
        Written by <b className="font-semibold">{author.name}</b> {author.bio}{" "}
        <a href={`https://twitter.com/${author.twitter}`}>
          Follow them on twitter
        </a>
      </p>
    </div>
  );
}
