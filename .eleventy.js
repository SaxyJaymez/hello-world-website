const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  eleventyConfig.addCollection("post", function(collectionApi) {
    return collectionApi.getFilteredByGlob("posts/**/*.md");
  });

  eleventyConfig.addFilter("date", (dateObj, format = "dd LLL yyyy") => {
    return DateTime.fromISO(dateObj, { zone: 'utc' }).set({hour:17}).toFormat(format);
  });

  eleventyConfig.addPassthroughCopy("style.css");

  // Return your Object options:
  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site"
    }
  }
};