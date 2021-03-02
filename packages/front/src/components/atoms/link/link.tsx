import * as React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import styled from 'astroturf';

interface LinkProps {
  href: string;
  external?: boolean;
}

const LinkComponent = styled('a')`
  display: inline-block;
  color: var(--white);
  text-decoration: none;
  font-weight: 700;
  
  &.activeLink {
    text-decoration: underline;
  }

  &:hover {
    text-decoration: underline;
  }

  &:focus {
    text-decoration: underline;
  }
`;

export const Link: React.FC<LinkProps> = ({ href, external, ...rest }) => {
  const additionalProps = external
    ? { href }
    : {
      to: href,
      as: GatsbyLink,
    };

  return (
    <LinkComponent
      {...rest}
      {...additionalProps}
    />
  );
};

// @ts-ignore
GatsbyLink.defaultProps = {
  activeClassName: 'activeLink',
};
