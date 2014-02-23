(function(d){

	// the topic/subscription hash
	var cache = d.c_ || {}; //check for "c_" cache for unit testing

	d.publish = function(/* String */ topic, /* Array? */ args){
		var subs = cache[topic],
			len = subs ? subs.length : 0;

		//can change loop or reverse array if the order matters
		while(len--){
			subs[len].apply(d, args || []);
		}
	};

	d.subscribe = function(/* String */ topic, /* Function */ callback){
		if(!cache[topic]){
			cache[topic] = [];
		}
		cache[topic].push(callback);
		return [topic, callback]; // Array
	};

	d.unsubscribe = function(/* Array */ handle, /* Function? */ callback){
		var subs = cache[callback ? handle : handle[0]],
			callback = callback || handle[1],
			len = subs ? subs.length : 0;

		while(len--){
			if(subs[len] === callback){
				subs.splice(len, 1);
			}
		}
	};

})(this);

