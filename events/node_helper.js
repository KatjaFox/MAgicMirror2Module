var NodeHelper = require("node_helper");
var validUrl = require("valid-url");
var Parser = require("./parser.js");
var keyword_extractor = require("keyword-extractor");

module.exports = NodeHelper.create({

    start: function() {
        console.log("Starting module: " + this.name);

		this.fetchers = [];
    },
    
	socketNotificationReceived: function(notification, payload) {

		if (notification === "ADD_FEED") {
			this.createFetcher();
			return;
        }
        else if(notification === "ToKeywords")
        {
            var extractionResult = keyword_extractor.extract(payload[1],
                {
                        language:"german",
                        remove_digits: true,
                        return_changed_case:true,
                        return_chained_words:true,
                        remove_duplicates: false
                });

            payload[1] = extractionResult;
            this.sendSocketNotification("Keywords", payload);
        }
    },
    
    createFetcher: function() {
        var self = this;

        var url = "https://www.wien.gv.at/vadb/internet/AdvPrSrv.asp?Layout=rss-vadb_neu&Type=R&GANZJAEHRIG=ja&brckat=&WORT2=&hmwd=d&HKAT=&KAT=&UNTKATVON=&SA=&HAUPTKATEGORIEN=6%2C+158%2C+70%2C+66%2C+68%2C+25%2C+74%2C+34&WORT1=&DATS=E&KATEGORIE_ID=6%2C+158%2C+70%2C+66%2C+68%2C+25%2C+74%2C+34&suchbegriff=&brckatu=&vie_range-from=27%2E07%2E2019&vie_range-to=31%2E07%2E2019&submit=Los&RSS-Title=Veranstaltungen%20zum%20Thema%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20Clubbing,%20Party%20und%20DJ%20Line,Eintritt%20frei,Feste%20und%20Vergn%FCgen,Kalenderfeste,Kunst%20und%20Kultur,Messen,%20Kongresse%20und%20Symposien,Musik%20allgemein,Sport%20allgemein%20vom%2027.07.2019%20bis%2031.07.2019%20inkl.%20ganzj%E4hriger%20Veranstaltungen";//feed.url || "";
        //var url = "https://www.reddit.com/r/wien/.rss";
        var encoding = "UTF-8";
        var reloadInterval = 5 * 60 * 1000;

        if (!validUrl.isUri(url)) {
            self.sendSocketNotification("INCORRECT_URL", url);
            return;
        }

        var parser;
            parser = new Parser(url);

            parser.onReceive(function(parser) {
                self.broadcastFeeds();
            });

            self.fetchers[url] = parser;

            parser.startFetch();
    },

    /* broadcastFeeds()
	 * Creates an object with all feed items of the different registered feeds,
	 * and broadcasts these using sendSocketNotification.
	 */

	broadcastFeeds: function() {
		var feeds = {};
		for (var f in this.fetchers) {
			feeds[f] = this.fetchers[f];
        }
        
		this.sendSocketNotification("EVENT_ITEMS", feeds);
    },
});