import type { MDXComponents } from "mdx/types";
import type { AnchorHTMLAttributes } from "react";

function Anchor({ href = "", children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const external = /^https?:\/\//.test(href);
  return (
    <a href={href} {...rest} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {children}
      {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </a>
  );
}

const components: MDXComponents = {
  a: Anchor,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
