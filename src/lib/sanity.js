const sanityClient = require('@sanity/client');
export default sanityClient({
  projectId: 'xlqk6u8j',
  dataset: 'production',
  apiVersion: '2022-05-31', // use current UTC date - see "specifying API version"!
  useCdn: false, // `false` if you want to ensure fresh data
});
