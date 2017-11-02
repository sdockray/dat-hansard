var request = require('request');
var cheerio = require('cheerio');
var Promise = require('promise');
var mkdirp = require('mkdirp');
var fs = require('fs');

var representativesDebatesUrl = 'http://data.openaustralia.org/scrapedxml/representatives_debates/';
var representativesDebatesDir = 'data/representatives_debates/';
var senateDebatesUrl = 'http://data.openaustralia.org/scrapedxml/senate_debates/';
var senateDebatesDir = 'data/senate_debates/';
var membersUrl = 'http://data.openaustralia.org/members/';
var membersDir = 'data/members/';


function dl(url, loc) {
  return request(url).pipe(fs.createWriteStream(loc));
}


function scrape(url, dir, overwriteExisting) {
  mkdirp(dir);
      
  // Load the HTTP directory listing
  request(url, function (error, response, body) {
    // Ensure there is a valid response
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(body);
      var links = $('body').find('a');
      var promises = [];
      // Go through every link
      links.each(function(i, elem) {
        var href = $(this).attr('href');
        // If the link is to an XML file
        if (href.endsWith('.xml')) {
          // Add to promises queue
          if (overwriteExisting) {
            promises.push(href);
          // Don't overwrite existing files
          } else {
            try {
              stats = fs.statSync(dir + href);
            }
            catch (e) {
              promises.push(href);
            }
          }
        }
      });
      // Go through promises
      Promise.all(promises.map(function(href) {
        return dl(url + href, dir + href);
      }));
    }
  });

}

scrape(representativesDebatesUrl, representativesDebatesDir);
scrape(senateDebatesUrl, senateDebatesDir);
scrape(membersUrl, membersDir, true);
