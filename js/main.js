var app = {
	settings : {
		name : 'instavid',
		client_id : '483080298c014ee19ee282f860f9b3b5',
		tag: 'video',
		url : 'https://api.instagram.com/v1/tags/',
		auth: '/media/recent?callback=?&client_id=',
		videos : [],
		total_videos: 0,
		current_video: 0,
		// Our video template
		video_template: _.template($('#video-template').html()),
		// Our video player
		video_player : null,
		video_holder: $('.main-holder'),
		pagination_next: null,
	},
	init: function (){
		console.log('hello hal ' + this.settings.name);

		// Construct URL string to hit the Instagram API
		var url = this.settings.url + this.settings.tag + this.settings.auth + this.settings.client_id;
		
		console.log(url);

		this.hitApi(url);
		
	},

	hitApi : function (url){
		console.log(url);
		// Retreive API call with a call back function
		this.getData(url, function(data){
			console.log(data);
			app.settings.pagination_next = data.pagination.next_url;
			console.log(app.settings.pagination_next);
			// Pass data to process
			app.process(data);
		});
	},

	process : function (data){
		// console.log(data.data.length);

		// Pick only items where type is Video only
		var videos = _.where(data.data, {type: "video"});

		_.each(videos, function(video,i){
			console.log(video,i);
			app.settings.videos.push(video);
		});
		
		// Push these into the container for global access
		

		// Get total number of videos so we know when to step forward
		this.settings.total_videos = this.settings.videos.length;
		
		// Inject a video into the holder
		this.injectVideo(app.settings.current_video);

		console.log('total videos ', app.settings.total_videos);

		console.log('videos in ', app.settings.videos);
		console.log('videos in number', app.settings.videos.length);

		// this.bindEvents();

	},
	injectVideo : function(current_video){
		console.log(app.settings.videos[current_video]);
		this.settings.video_holder.html(app.settings.video_template(app.settings.videos[current_video]));
		// fahfae qofjaf =sf

		this.bindEvents();
	},

	bindEvents : function(){
		app.settings.video_player = $('#video-player')[0];
		// video_holder.play()

		console.log(app.settings.video_player);



		app.settings.video_player.addEventListener('timeupdate', function(e){
			// console.log(e,e.target.currentTime,e.target.duration);
			// app.changeVideo();
			// app.settings.video_player.currentTime = e.target.duration;
		});

		app.settings.video_player.addEventListener('ended', function(e){
			console.log(e);
			app.changeVideo();
		});

		app.settings.video_player.addEventListener('canplaythrough', function(e){
			console.log(e, 'can play through');
			// app.changeVideo();
			app.settings.video_player.play();
			app.settings.video_player.volume = 0.1;
		});

		// app.settings.video_player.addEventListener('currenttome', function(e){
		// console.log(e);
		// // app.changeVideo();
		// });

		// console.log(window.video_holder.progress);
	},

	changeVideo : function(){
		app.settings.current_video++;
		console.log(app.settings.current_video, app.settings.total_videos);
		if(app.settings.total_videos > app.settings.current_video){
			app.injectVideo(app.settings.current_video);
			// 
			// console.log(app.settings.current_video);
			// app.settings.video_player.currentSrc = app.settings.current_video;
		}

		if((app.settings.total_videos) === app.settings.current_video){
			console.log('close to ending');

			// app.settings.video_player.pause();

			app.hitApi(app.settings.pagination_next);
		}
	},

	getData : function(url, callback){
		if(!url){
			url = this.settings.url + this.settings.tag + this.settings.auth + this.settings.client_id;
		}
		$.ajax({
			url: url,
			type: 'GET',
			dataType: 'jsonp',
		})
		.done(function(response) {
			if(response.meta.code === 200){
					console.log('success');
					callback(response);
				}
			})
		.fail(function(response) {
			console.log("error",response);
		});
	},

};

app.init();
