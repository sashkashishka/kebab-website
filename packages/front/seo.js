export const phone = '+38 068 835 29 96';
export const siteUrl = 'https://el-sheikh.herokuapp.com';

export const jsonld = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  image: `${siteUrl}/restaurant-photo.jpg`,
  '@id': siteUrl,
  name: 'Ель шейх',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Житомир',
    streetAddress: 'вул. Чапаєва 10А',
    addressCountry: 'UA'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 50.263101302463525,
    longitude: 28.664127507343895
  },
  url: siteUrl,
  telephone: phone,
  servesCuisine: 'Ближневосточная',
  priceRange: '$$$',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '10:00',
      closes: '20:00'
    },
  ],
  menu: siteUrl,
};

