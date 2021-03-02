import styled from 'astroturf';

export const H1 = styled('h1')`
  font-family: var(--proximaFont);
  font-weight: 800;
  font-size: 32px;
  line-height: 38px;
  letter-spacing: 1px;

  @media all and (min-width: 768px) {
    & {
      font-size: 64px;
      line-height: 72px;
    }
  }
`;

export const H2 = styled('h2')`
  font-family: var(--proximaFont);
  font-weight: 800;
  font-size: 32px;
  line-height: 38px;
  letter-spacing: 1.12px;

  @media all and (min-width: 768px) {
    & {
      font-size: 48px;
      line-height: 58px;
    }
  }
`;

export const H3 = styled('h3')`
  font-family: var(--proximaFont);
  font-weight: 800;
  font-size: 24px;
  line-height: 38px;
  letter-spacing: 1px;
`;
