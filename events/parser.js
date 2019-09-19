const FeedMe = require('feedme');
const http = require('http');
var https = require('https');

var Parser = function(url){

	var self = this;

	self.items = [];

	var fetchFailedCallback = function() {};
	var itemsReceivedCallback = function() {};

	this.startFetch = function() {
		fetchRss();
	};
		
		
	var fetchRss = function() {
		items = [];
				
		https.get(url, (res) => {

			if (res.statusCode != 200) {
			console.error(new Error(`status code ${res.statusCode}`));
			return;
			}

			var feedMeParser = new FeedMe();

			feedMeParser.on('title', (title) => {
			console.log('title of feed is', title);

			});

			feedMeParser.on('item', (item) => {
			console.log();

			console.log('events:', item.title);
			console.log(item.description);
			
			var title = item.title;
			var description = item.description || item.summary || item.content || "";
			var pubdate = item.pubdate || item.published || item.updated || item["dc:date"];
			var url = item.url || item.link || "";

			if (title && pubdate) {

				var regex = /(<([^>]+)>)/ig;
				description = description.toString().replace(regex, "");

				self.items.push({
					title: title,
					description: description,
					pubdate: pubdate,
					url: url,
				});
			}
			});

			feedMeParser.on("end",	function() {
				console.log("end parsing - " + url);
				self.broadcastItems();
			});

			res.pipe(feedMeParser);
		});
	};

	this.onReceive = function(callback) {
		itemsReceivedCallback = callback;
	};
	
	self.broadcastItems = function() {
	if (self.items.length <= 0) {
		console.log('No items to broadcast yet.');
		return;
			}
			
		console.log('Broadcasting ' + self.items.length + ' items.');
		itemsReceivedCallback(self);
	};

	self.GetItems = function()
	{
		return self.items;
	}
};

module.exports = Parser;