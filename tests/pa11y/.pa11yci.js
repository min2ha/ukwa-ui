// Put together some options to use in each test.
// See pa11y-ci config options at https://github.com/pa11y/pa11y-ci#usage
module.exports = {
  standard: 'WCAG2AA',
  page: {
    headers: {
      Cookie: 'highcontrast=yes'
    }
  },
  defaults: {
    chromeLaunchConfig: {
      // this is needed to run in docker
      args: ["--no-sandbox"],
      ignoreHTTPSErrors: false
    },
    headers: {
      Cookie: 'highcontrast=yes'
    },
    // full coverage, can be turned off to only report outright errors
    includeWarnings: true,
    includeNotices: true,
    concurrency: 2,
    timeout: 100000,
    wait: 2000,
  },
  // bare minimum, your config file needs urls to test.
  urls: [
    "http://ui:8080/",
    "http://127.0.0.1:8080/en/ukwa/about",
    "http://localhost:8080/en/ukwa/about"
  ],
};
