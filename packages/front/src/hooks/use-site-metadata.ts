import { useStaticQuery, graphql } from 'gatsby';

interface SiteMetaData {
  site: {
    siteMetadata: {
      tiktok: string;
      telegram: string;
      instagram: string;
      title: string;
      siteUrl: string;
      phone: string;
      address: string;
      addressExtended: string;
      addressLink: string;
    }
  }
}

export const useSiteMetadata = () => {
  const { site } = useStaticQuery<SiteMetaData>(graphql`
    query SiteMetaData {
      site {
        siteMetadata {
          title
          siteUrl
          tiktok
          instagram
          telegram
          address
          phone
          addressExtended
          addressLink
        }
      }
    }
  `);

  return site.siteMetadata;
};
