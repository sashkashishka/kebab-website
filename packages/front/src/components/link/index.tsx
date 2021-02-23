import * as React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { Link as RebassLink, LinkProps as RebassLinkProps } from 'rebass';

interface LinkProps extends RebassLinkProps {
  href: string;
  external?: boolean;
  variant?: string;
}

const Link: React.FC<LinkProps> = (props) => {
  const {
    href,
    children,
    external,
  } = props;

  const additionalProps = external
    ? { href }
    : {
      to: href,
      as: GatsbyLink,
    };

  return (
    <RebassLink
      variant="link"
      {...props}
      {...additionalProps}
    >
      {children}
    </RebassLink>
  );
};

// @ts-ignore
GatsbyLink.defaultProps = {
  activeClassName: 'activeLink',
};

export default Link;
