let i = 3;

Module.register("events",{
    
    start: function() {
       // import * as keywordExtractor from "keyword-extractor";
        var self = this;

        setInterval(function() {
            self.updateDom(); // no speed defined, so it updates instantly.
        }, 10000); //perform every 1000 milliseconds.

        //self.newsItems = [];
        self.newsItems = [];

        //self.testitem = "test item here";

        this.registerFeeds();
    },

    getDom: function() {
        //var keyword_extractor = require("keyword-extractor");    
        var wrapper = document.createElement("div");
            //i += 1;
            var s = document.createElement("div");
            //s.innerHTML = `Some Random text and number ${i}`;
            s.id = "tests";
            //s.style.backgroundColor = "yellow";
            s.style.position = "fixed";
            s.style.top = "425px";
            s.style.left = "55px";
            s.style.width = "350px";
            s.style.height = "450px";

            var feed = document.createElement("div");
            feed.id = "feed";
            //console.log("dom items: " + self.newsItems);
            //console.log("dom item 0: " + Object.keys(self.newsItems[0]));
            //feed.innerHTML = Object.keys(self.newsItems[0]);
            //feed.innerHTML = 
           // let txt = "";

            // self.newsItems.forEach(itemObj => {
            //     Object.keys(itemObj).forEach(key => {
            //         txt += Object.values(key);
            //     })
            // });

            //console.log(self.newsItems);
            // var eventdiv = document.createElement("div");
            // eventdiv.id = "eventdiv";

            self.newsItems.forEach(itemObj => {
                let title = Object.values(itemObj)[0];
                let desc = Object.values(itemObj)[1];
                //let pubdate = Object.values(itemObj)[2];
                //let url = Object.values(itemObj)[3];

                // var eventdiv = document.createElement("div");
                // eventdiv.id = "eventdiv";
                //eventdiv.style.backgroundColor = "red";
                // var eventdivTitle = document.createElement("div");
                // var eventdivDesc = document.createElement("div");
                //eventdivTitle.innerHTML = `${title}`;

                //---------------
            //     var extractionResult = keyword_extractor.extract(desc,{
            //         language:"german",
            //         remove_digits: true,
            //         return_changed_case:true,
            //         remove_duplicates: true
            //    });
            //    console.log(extractionResult);
                //-----------------

                 this.sendSocketNotification("ToKeywords", [title, desc]);
                 //function(desc)
                // {
                //     console.log("from test  ------ " + desc);
                //     eventdivDesc.innerHTML = `<p>Description: ${desc}</p>`;
                // });

                //eventdivTitle.innerHTML = `${title}`;
                // eventdivDesc.innerHTML = `<p>Description: ${extractionResult}</p>`;
                //eventdivDesc.innerHTML = `<p>Description: ${desc}</p>`;

                // eventdivTitle.style.fontFamily = "Roboto";
                // eventdivDesc.style.fontFamily = "Roboto";
                // eventdivDesc.style.lineHeight = "0.9";
                // eventdivTitle.style.fontSize = "2vw";
                // eventdivDesc.style.fontSize = "2vw";

                //console.log(`title: ${title}\ndescription: ${desc}`);
                // eventdiv.appendChild(eventdivTitle);
                // eventdiv.appendChild(eventdivDesc);

                
                //feed.appendChild(eventdiv);
            });

            //         Object.values(itemObjs[i])[0],
            //         Object.values(itemObjs[i])[1],
            //         Object.values(itemObjs[i])[2],
            //         Object.values(itemObjs[i])[3]);

            //feed.innerHTML = txt;//Object.keys(self.newsItems);

            // testd = document.createElement("div");
            // testd.innerHTML = self.testitem;
            // testd.style.backgroundColor = "red";

            
            var ttl = document.createElement("div");
            ttl.style.fontFamily = "Roboto";
            ttl.innerHTML = "Events: ";
            s.appendChild(ttl);

            s.appendChild(feed);
            wrapper.appendChild(s);
            //wrapper.appendChild(testd);
            
        //    this.sendNotification("test---------wrapper", null);
        	return wrapper;
        },

    registerFeeds: function() {
        //this.sendNotification("test---------In registerFeeds", null);

                this.sendSocketNotification("ADD_FEED");
        },


        socketNotificationReceived: function(notification, payload) {
            if (notification === "EVENT_ITEMS") 
            {
                    this.generateFeed(payload);
            }
            else if(notification === "Keywords")
            {
                //console.log("test --> t: " + payload[0] + " k: " + payload[1]);

                var feed = document.getElementById("feed");

                var eventdiv = document.createElement("div");
                var eventdivTitle = document.createElement("div");
                var eventdivDesc = document.createElement("div");

                eventdivTitle.innerHTML = `Title: ${payload[0]}`;
                eventdivDesc.innerHTML = `<p>Keywords: ${payload[1]}</p>`;

                eventdivTitle.style.fontFamily = "Roboto";
                eventdivDesc.style.fontFamily = "Roboto";
                eventdivDesc.style.lineHeight = "0.9";
                eventdivTitle.style.fontSize = "2vw";
                eventdivDesc.style.fontSize = "2vw";

                eventdiv.appendChild(eventdivTitle);
                eventdiv.appendChild(eventdivDesc);

                feed.appendChild(eventdiv);
            }
        },


        generateFeed: function(feeds) {
            //var newsItems = [];
            for (var feed in feeds) {
                var feedItems = feeds[feed];
               // if (this.subscribedToFeed(feed)) {
                     for (var i in feedItems) {
                         var item = feedItems[i];
                    //     //item.sourceTitle = this.titleForFeed(feed);
                    //     if (!(this.config.ignoreOldItems && ((Date.now() - new Date(item.pubdate)) > this.config.ignoreOlderThan))) {
                    
                    //console.log("keys: " + Object.keys(item));       
                    //var itms = [];
                    //var i = 0;
                    let itemObjs = Object.values(item);
                    self.newsItems = itemObjs;
                    console.log("----------------"+self.newsItems);

                    // for(var i; i < itemObjs.length; i++)
                    // {
                    //     myEvent(
                    //         Object.values(itemObjs[i])[0],
                    //         Object.values(itemObjs[i])[1],
                    //         Object.values(itemObjs[i])[2],
                    //         Object.values(itemObjs[i])[3]);

                    //         console.log(Object.values(itemObjs[i])[0]);
                    //         console.log(Object.values(itemObjs[i])[1]);
                    //         console.log(Object.values(itemObjs[i])[2]);
                    //         console.log(Object.values(itemObjs[i])[3]);

                    //     // event.title = itemObjs[i];
                    //     // event.description = itemObjs[];
                    //     // event.pubdate = itemObjs[2];
                    //     // event.url = itemObjs[3];

                    //     //console.log("event: " +event);
                    //     itms.push(event);
                    // }

                    // Object.values(item).forEach(k =>
                    //     {
                    //         console.log("keys: " + Object.keys(k)); 
                    //         console.log("values: " + Object.values(k)); 
                    //         var event = new myEvent();
                    //         event.title = 
                    //         Object.values(k);
                    //         itms[i] = event;
                    //         i++;
                    //     });

                    // {
                    //     title: title,
                    //     description: description,
                    //     pubdate: pubdate,
                    //     url: url,
                    // }

                    //newsItems.push(itm);
                    //newsItems = itms;
                    //     }
                    }
               // }
            }

            // newsItems.sort(function(a,b) {
            //     var dateA = new Date(a.pubdate);
            //     var dateB = new Date(b.pubdate);
            //     return dateB - dateA;
            // });
            // if(this.config.maxNewsItems > 0) {
            //     newsItems = newsItems.slice(0, this.config.maxNewsItems);
            // }
    
            // if(this.config.prohibitedWords.length > 0) {
            //     newsItems = newsItems.filter(function(value){
            //         for (var i=0; i < this.config.prohibitedWords.length; i++) {
            //             if (value["title"].toLowerCase().indexOf(this.config.prohibitedWords[i].toLowerCase()) > -1) {
            //                 return false;
            //             }
            //         }
            //         return true;
            //     }, this);
            // }
    
            // get updated news items and broadcast them
            // var updatedItems = [];
            // newsItems.forEach(value => {
            //     if (this.newsItems.findIndex(value1 => value1 === value) === -1) {
            //         // Add item to updated items list
            //         updatedItems.push(value);
            //     }
            // });
    
            // check if updated items exist, if so and if we should broadcast these updates, then lets do so
            // if (this.config.broadcastNewsUpdates && updatedItems.length > 0) {
            //     this.sendNotification("NEWS_FEED_UPDATE", {items: updatedItems});
            // }
    
            //self.newsItems = newsItems;
        },

        myEvent: function(title, description, pubdate, url)
        {
            //constructor(title, description, pubdate, url)
             //{
            
                //self.newsItems.push({title, description, pubdate, url});

                self.newsItems.push({title : title, description : description, pubdate: pubdate, url: url});
                //  this.title = title;
                //  this.description = description;
                //  this.pubdate = pubdate;
                //  this.url = url;
            //}

            //return {title,description,pubdate,url};
        }
});

