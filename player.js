    jQuery(document).ready(function(){
	
		a = 100;
		i = 0;
		
		var totalSong = $(".playsong").length;

		nowPlaying = document.getElementsByClassName('playsong');
		nowPlaying[i].load();
		nowPlaying[i].volume = a / 100;
		$("#volume").slider({
		min: 0,
		max: 100,
		value: a,
		range: "min",
		animate: true,
		slide: function(event, ui) {
				var my = ui.value;
				nowPlaying[i].volume = my / 100;
			}
		});
		
		$('.play').click(function(){
		    nowPlaying[i].play();
			callMeta();
			nowStat=1;
		});
		
		$('.pause').click(function(){
		    nowPlaying[i].pause();
		});
		
		$('.stop').click(function(){
		    nowPlaying[i].pause();
			nowPlaying[i].load();
		});
		
		$('.next').click(function(){
		    $.each($('audio.playsong'), function(){
			    this.pause();
			});
			++i;
			if(i>2){
			i = 0;
			nowPlaying[i].load();
			nowPlaying[i].play();
			callMeta();
			}else{
			nowPlaying[i].load();
			nowPlaying[i].play();
			callMeta();
			}
		});
		
		$('.prev').click(function(){
		    $.each($('audio.playsong'), function(){
			    this.pause();
			});
			--i;
			if(i<0){
			i = $(".playsong").length;
			nowPlaying[i].load();
			nowPlaying[i].play();
			callMeta();
			}else{
			nowPlaying[i].load();
			nowPlaying[i].play();
			callMeta();
			}
		});

		
		function callMeta(){
		    var trackTitle = $(nowPlaying[i]).attr('data-songtitle');
			var trackArtist = $(nowPlaying[i]).attr('data-songartist');
			var trackAlbumart = $(nowPlaying[i]).attr('data-albumart');
			$(".songtitle").html(trackTitle);
			$(".songartist").html(trackArtist);
			$(".songalbumart").html("");
			$('.songalbumart').attr('src', trackAlbumart);
			durationData();
		};
		

		function durationData() {
			nowPlaying[i].addEventListener('timeupdate', function () {
				var _currentTime = parseFloat(nowPlaying[i].currentTime); 
				var _duration = parseFloat(nowPlaying[i].duration);
				var _ratio = _currentTime/_duration;
				$(".current-bar").click(function(event){            
					var relX = event.pageX - $(this).offset().left;
					nowPlaying[i].currentTime = nowPlaying[i].duration*(relX/390);
				});
				$(".current-duration").html(_currentTime);
				$(".duration").html(_duration);
				$(".dur").css("width",_ratio*390);
			});
		}



	});