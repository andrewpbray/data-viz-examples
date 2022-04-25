        
        
        /* ::: BAYMAX Video Player :::::::: */
        /* ::: version: 1.0.3  :::::::::::: */
        /* ::: developer: Tanvir Haider ::: */


        class Video {
          constructor (data) {
        
            let Scope = this;
            Scope.data = data;
            let wrapper;
            let Q0 = true;
            let Q1 = true;
            let Q2 = true;
            let Q3 = true;
            let Q4 = true;
            let playerStyle = "video-style";
            let DEBUG2;
            let runHLS;
            let runMP4;
            let VideoPlayButton;
            let VideoPauseButton;
            let VideoMuteButton;
            let VideoUnMuteButton;
            let videoContainerWidth;
            let videoContainerHeight;
            let posterElement;
            let posterBG;
            let HLSCDN = "https://cdn.jsdelivr.net/npm/hls.js@latest";
            let genericPlayButton = "https://static01.nytimes.com/ads/adplatforms/user-interface-elements/video-icons/play.svg";
            let genericPauseButton = "https://static01.nytimes.com/ads/adplatforms/user-interface-elements/video-icons/pause.svg";
            let genericMuteButton = "https://static01.nytimes.com/ads/adplatforms/user-interface-elements/video-icons/audio-on.svg";
            let genericUnMuteButton = "https://static01.nytimes.com/ads/adplatforms/user-interface-elements/video-icons/audio-off.svg";
            let progressBarStats = false;
            let progBar;
            let TrackingFunction0;
            let TrackingFunction25;
            let TrackingFunction50;
            let TrackingFunction75;
            let TrackingFunction100;
            let replaystats = false;
            Scope.replaystats = replaystats;
            let videoEnded = false;
            let autoplaystats = false;
        
            if (data.VideoTracking) {
                TrackingFunction0 = data.VideoTracking["0%"];
                TrackingFunction25 = data.VideoTracking["25%"];
                TrackingFunction50 = data.VideoTracking["50%"];
                TrackingFunction75 = data.VideoTracking["75%"];
                TrackingFunction100 = data.VideoTracking["100%"];
            }
        
            let clickOutFunction = data.clickOutFunction;
            let duration;
            let vidUnits;
            let vidParentContainer = document.getElementById(data.container);
            vidParentContainer.classList.add(playerStyle);
            vidParentContainer.classList.add("beginning-state");
            vidParentContainer.classList.add("pause-state");
            let Rvideo =  document.createElement('video');
            Rvideo.setAttribute('playsinline', '');
            let vidID;
            if (data.id) {vidID = data.id;} else {vidID = "basic-player";}
            Rvideo.setAttribute('id', 'videoPlayer-' + vidID);
            vidParentContainer.appendChild(Rvideo); 
            Scope.video = Rvideo;
        
            if (data.wrapper) {
                wrapper = data.wrapper;
                if (data.maxwidth) { wrapper.classList.add("beginning-state"); }
            }
            
            if (data.progressBar) {
                progressBarStats = data.progressBar;
                if (data.progressBar == true) {
                    progBar =  document.createElement('div');
                    progBar.setAttribute('id', 'progress-bar-' + vidID);
                    vidParentContainer.appendChild(progBar); 
                    progBar.classList.add("progress-bar");
                    Scope.progBar = progBar;
                }
            }
        
            /* :::::::: PLAY BUTTON ::::::::::::::::: */
            /* :::::::::::::::::::::::::::::::::::::: */
        
            if (data.playbutton) {
                if (typeof data.playbutton === 'object') { VideoPlayButton = data.playbutton;}
        
                else if (typeof data.playbutton === 'string') {
                    VideoPlayButton = Scope.MakeElements("div","video-play-button");
                    vidParentContainer.appendChild(VideoPlayButton); 
                    Scope.AssignBackgroundImage (VideoPlayButton, data.playbutton);
                    VideoPlayButton.classList.add("default-play-buttom");
                }
        
                if (data.autoplay) {
                    VideoPlayButton.style.visibility = "hidden";
                }
                Scope.VideoPlayButton = VideoPlayButton;
                VideoPlayButton.addEventListener('click', function() {Scope.PlayVideo();});
            }
            else {
                VideoPlayButton = Scope.MakeElements("div","video-play-button");
                vidParentContainer.appendChild(VideoPlayButton); 
                Scope.AssignBackgroundImage (VideoPlayButton, genericPlayButton);
                VideoPlayButton.classList.add("default-play-buttom");
        
                if (data.autoplay) {VideoPlayButton.style.visibility = "hidden";}
                Scope.VideoPlayButton = VideoPlayButton;
                VideoPlayButton.addEventListener('click', function() {Scope.PlayVideo();});
            }
        
            /* :::::::: PAUSE BUTTON :::::::::::::::: */
            /* :::::::::::::::::::::::::::::::::::::: */
        
            if (data.pausebutton) {
                if (typeof data.pausebutton === 'object') { VideoPauseButton = data.pausebutton;}
        
                else if (typeof data.pausebutton === 'string') {
                    VideoPauseButton = Scope.MakeElements("div","video-pause-button");
                    vidParentContainer.appendChild(VideoPauseButton); 
                    Scope.AssignBackgroundImage (VideoPauseButton, data.pausebutton);
                    VideoPauseButton.classList.add("default-pause-buttom");
                }
        
                if (data.autoplay) { Scope.Show( Scope.VideoPauseButton);}
                else { Scope.Hide( Scope.VideoPauseButton);}

                Scope.VideoPauseButton = VideoPauseButton;
                VideoPauseButton.addEventListener('click', function() {Scope.PauseVideo();});
            }
            else {
                VideoPauseButton = Scope.MakeElements("div","video-pause-button");
                vidParentContainer.appendChild(VideoPauseButton); 
                Scope.AssignBackgroundImage (VideoPauseButton, genericPauseButton);
                VideoPauseButton.classList.add("default-pause-buttom");
        
                if (data.autoplay) { Scope.Show( Scope.VideoPauseButton);}
                else { Scope.Hide( Scope.VideoPauseButton);}


                Scope.VideoPauseButton = VideoPauseButton;
                VideoPauseButton.addEventListener('click', function() {Scope.PauseVideo();});
            }
        
            /* :::::::: MUTE BUTTON ::::::::::::::::: */
            /* :::::::::::::::::::::::::::::::::::::: */
        
            if (data.mutebutton) {
                if (typeof data.mutebutton === 'object') { VideoMuteButton = data.mutebutton;}
        
                else if (typeof data.mutebutton === 'string') {
                    VideoMuteButton = Scope.MakeElements("div","video-mute-button");
                    vidParentContainer.appendChild(VideoMuteButton); 
                    Scope.AssignBackgroundImage (VideoMuteButton, data.mutebutton);
                    VideoMuteButton.classList.add("default-mute-buttom");
                }
        
                Scope.VideoMuteButton = VideoMuteButton;
                VideoMuteButton.addEventListener('click', function() {
                    Scope.MuteVideo();
                    vidParentContainer.classList.add("mute-state");
                    vidParentContainer.classList.remove("un-mute-state");

                    if (data.wrapper) {
                        if (data.maxwidth) {
                            wrapper.classList.add("mute-state");
                            wrapper.classList.remove("un-mute-state");
                        }
                    }
        
                });
                if (data.autoplay) {Scope.Hide( Scope.VideoMuteButton);}
                if (data.muted) {Scope.Hide( Scope.VideoMuteButton);}
            }
            else {
        
                VideoMuteButton = Scope.MakeElements("div","video-mute-button");
                vidParentContainer.appendChild(VideoMuteButton); 
                Scope.AssignBackgroundImage (VideoMuteButton, genericMuteButton);
                VideoMuteButton.classList.add("default-mute-buttom");
        
                Scope.VideoMuteButton = VideoMuteButton;
                VideoMuteButton.addEventListener('click', function() {
                    Scope.MuteVideo();
                    vidParentContainer.classList.add("mute-state");
                    vidParentContainer.classList.remove("un-mute-state");

                    if (data.wrapper) {
                        if (data.maxwidth) {
                            wrapper.classList.add("mute-state");
                            wrapper.classList.remove("un-mute-state");
                        }
                    }
        
                });
                if (data.autoplay) {Scope.Hide( Scope.VideoMuteButton);}
                if (data.muted) {Scope.Hide( Scope.VideoMuteButton);}
        
            }
        
            /* :::::::: UNMUTE BUTTON ::::::::::::::: */
            /* :::::::::::::::::::::::::::::::::::::: */
        
            if (data.unmutebutton) {
                if (typeof data.unmutebutton === 'object') { VideoUnMuteButton = data.unmutebutton;}
        
                else if (typeof data.unmutebutton === 'string') {
                    VideoUnMuteButton = Scope.MakeElements("div","video-unmute-button");
                    vidParentContainer.appendChild(VideoUnMuteButton); 
                    Scope.AssignBackgroundImage (VideoUnMuteButton, data.unmutebutton);
                    VideoUnMuteButton.classList.add("default-un-mute-buttom");
                }
        
                Scope.VideoUnMuteButton = VideoUnMuteButton;
                VideoUnMuteButton.addEventListener('click', function() {
                    Scope.UnMuteVideo();
                    vidParentContainer.classList.remove("mute-state");
                    vidParentContainer.classList.add("un-mute-state");
        
                    if (data.wrapper) {
                        if (data.maxwidth) {
                            wrapper.classList.remove("mute-state");
                            wrapper.classList.add("un-mute-state");
                        }
                    }


                });

                if (data.autoplay) { Scope.Show( Scope.VideoUnMuteButton);}
                else { Scope.Hide( Scope.VideoUnMuteButton); }
                if (data.muted) { Scope.Show( Scope.VideoUnMuteButton); }
            }
            else {
                VideoUnMuteButton = Scope.MakeElements("div","video-unmute-button");
                vidParentContainer.appendChild(VideoUnMuteButton); 
                Scope.AssignBackgroundImage (VideoUnMuteButton, genericUnMuteButton);
                VideoUnMuteButton.classList.add("default-un-mute-buttom");
        
                Scope.VideoUnMuteButton = VideoUnMuteButton;
                VideoUnMuteButton.addEventListener('click', function() {
                    Scope.UnMuteVideo();
                    vidParentContainer.classList.remove("mute-state");
                    vidParentContainer.classList.add("un-mute-state");

                    if (data.wrapper) {
                        if (data.maxwidth) {
                            wrapper.classList.remove("mute-state");
                            wrapper.classList.add("un-mute-state");
                        }
                    }
        
                });
                if (data.autoplay) { Scope.Show( Scope.VideoUnMuteButton);}
                else { Scope.Hide( Scope.VideoUnMuteButton); }
                if (data.muted) { Scope.Show( Scope.VideoUnMuteButton); }
            }
        
            setTimeout(function(){  settingRationWithDelay (); }, 50);
        
            function settingRationWithDelay () {
                var tempWidth = vidParentContainer.clientWidth;
                var tempHeight = vidParentContainer.clientHeight;
        
                if ((data.ratio == "square") || (data.ratio == "1:1")) {
                    vidParentContainer.classList.add("video-1x1");
                }
                else if ((data.ratio == "widescreen") || (data.ratio == "16:9")) {
                    vidParentContainer.classList.add("video-16x9");
                }
        
                else if ((data.ratio == "anamorphic") || (data.ratio == "2.4:1")) {
                    vidParentContainer.classList.add("video-anamorphic");
                }
        
                else if (data.ratio == "custom") {vidParentContainer.classList.add("custom");}
                else {vidParentContainer.classList.add("custom");}
            }
        
            /* :::::::: ONLY FOR HLS :::::::::::::::: */
            /* :::::::::::::::::::::::::::::::::::::: */
        
            if (data.hls) {
                let HLSscript = document.createElement('script');
                HLSscript.id = "HLS-script";
                HLSscript.src = HLSCDN;
                document.head.appendChild(HLSscript); 
                HLSscript.onload = function () { runHLS ();};
                HLSscript.onerror = function () { runMP4 (); }
            }
        
            Rvideo.addEventListener("click", function() {
                Rvideo.volume = 0;
                Rvideo.pause();
                if (data.clickOutFunction) {clickOutFunction();}
                
            });
        
            function settingUpEndFrame () {
                if (data.poster) {
                    posterElement = Scope.MakePoster("video-end-frame", data.poster);
                    posterBG = Scope.MakePosterBG(vidID, data.poster);
                    if (data.posterPlayButton) {
                        var posterPlayBtn = Scope.MakePlayButtonOverPoster ("poster-play-button", data.posterPlayButton);
                        posterElement.appendChild(posterPlayBtn);
                        Scope.posterPlayBtn = posterPlayBtn;
                        posterPlayBtn.addEventListener('click', function() {Scope.PlayVideo();});
                    }
                    else {
                        var posterPlayBtn = Scope.MakePlayButtonOverPoster ("poster-play-button", genericPlayButton);
                        posterElement.appendChild(posterPlayBtn);
                        Scope.posterPlayBtn = posterPlayBtn;
                        posterPlayBtn.addEventListener('click', function() {Scope.PlayVideo();});
                    }
                    
                    posterElement.classList.add("poster-frame");
                    posterElement.appendChild(posterBG);
                    vidParentContainer.appendChild(posterElement);  
        
                    if (data.ratio != "custom") {
                        posterElement.style.width = videoContainerWidth;
                        posterElement.style.height = videoContainerHeight;
                    }
                    
                    posterBG.addEventListener("click", function() {if (data.clickOutFunction) {clickOutFunction();}});
        
                    if (data.autoplay) { posterElement.style.display = "none";}
                    else { 
                        if (data.poster) { Rvideo.setAttribute('poster', data.poster ); }
                        Rvideo.style.display = "none";
                    }
                }
            }
        
            setTimeout(function(){  settingUpEndFrame (); }, 50);
        
        
            if (data.debug) {}
        
            
            if (data.muted) { 
                Rvideo.muted = true;
                Rvideo.volume = 0;
                vidParentContainer.classList.add("mute-state");
            }
            if (data.controls) { Rvideo.controls = true;}
            if (data.autoplay) { 
                Scope.videostats = "autoplay";
                Rvideo.autoplay = true;
                Rvideo.muted = true;
                autoplaystats = true;
                vidParentContainer.classList.add("auto-play-state");
    
                if (data.callbackfunction) if (data.callbackfunction.onAutoPlay) { 
                    if (autoplaystats) {data.callbackfunction.onAutoPlay();}
                }
            }
            if (data.preload) { Rvideo.setAttribute('preload', data.preload );}
            if (data.hls) {
                
                if (inApp) {
                    Rvideo.src = data.mp4;
                    Rvideo.addEventListener('loadedmetadata', function() {if (data.autoplay) {Rvideo.play();}});
                    if (data.debug) {}
                }
                else {
        
                    runHLS = function () {
                        Rvideo.src = data.hls;
                        const hls = new Hls();
                        hls.loadSource(data.hls);
                        hls.attachMedia(Rvideo);
                        hls.on(Hls.Events.MANIFEST_PARSED, function() { if (data.autoplay) { Rvideo.play();}});
                        if (data.debug) {}
                    }
        
                    runMP4 = function () {
                        Rvideo.src = data.mp4;
                        Rvideo.addEventListener('loadedmetadata', function() {if (data.autoplay) {Rvideo.play();}});
                        if (data.debug) {}
                    }
                }
            }
        
            else {
                Rvideo.src = data.mp4;
                Rvideo.addEventListener('loadedmetadata', function() {if (data.autoplay) {Rvideo.play();}});
                if (data.debug) {}
            }
            
        
            Rvideo.addEventListener('play', (event) => {
               if (data.debug) {}
               
            });
        
            Rvideo.addEventListener('pause', (event) => {
                autoplaystats = false;
    
    
                if (data.debug) {}
                if (data.poster) {posterElement.style.display = "block";}
                Scope.Show( Scope.VideoPlayButton);
                Scope.Hide( Scope.VideoPauseButton);

                if (data.callbackfunction) if (data.callbackfunction.onPause) { 
                    if (!videoEnded) {data.callbackfunction.onPause();}
                }
             

                Scope.SetState (vidParentContainer,"pause-state");
                if (data.wrapper) {if (data.maxwidth) Scope.SetState (wrapper,"pause-state");}
        
            });
        
            Rvideo.addEventListener('loadedmetadata', (event) => {
              
                duration = event.target.duration;
                vidUnits = duration / 100;
                if (data.debug) {}
            });
        
            Rvideo.addEventListener('loadeddata', (event) => {
              if (data.debug) {}
            });
        
            Rvideo.addEventListener('error', (event) => {if (data.debug) {}});
        
            Rvideo.addEventListener('ended', (event) => {
              if (data.debug) {}
        
                replaystats = true;
                autoplaystats = false;
                Scope.replaystats = replaystats;
                Scope.videostats = "ended";
        
                Q0 = true;
                Q1 = true;
                Q2 = true;
                Q3 = true;
                Q4 = true;
        
                if (data.poster) {posterElement.style.display = "block";}
                Scope.Show( Scope.VideoPlayButton);
                Scope.Hide( Scope.VideoPauseButton);

                if (data.callbackfunction) if (data.callbackfunction.onEnd) { data.callbackfunction.onEnd (); }
        
                Scope.SetState (vidParentContainer,"end-state");
                if (data.wrapper) {if (data.maxwidth) Scope.SetState (wrapper,"end-state");}
        
            });
        
            Rvideo.addEventListener('emptied', (event) => {if (data.debug) {}});
            Rvideo.addEventListener('durationchange', (event) => {if (data.debug) {}});
            Rvideo.addEventListener('canplaythrough', (event) => {if (data.debug) {}});
            Rvideo.addEventListener('canplay', (event) => {if (data.debug) {}});
            Rvideo.addEventListener('abort', (event) => {if (data.debug) {}});
            Rvideo.addEventListener('progress', (event) => {if (data.debug) {}});
            Rvideo.addEventListener('ratechange', (event) => {if (data.debug) {}});
            Rvideo.addEventListener('seeking', (event) => {if (data.debug) {}});
            Rvideo.addEventListener('stalled', (event) => {if (data.callbackfunction.onStalled) { data.callbackfunction.onStalled (); }});
            Rvideo.addEventListener('suspend', (event) => {if (data.callbackfunction.onSuspend) { data.callbackfunction.onSuspend (); }});
            Rvideo.addEventListener('volumechange', (event) => {if (data.debug) {}});
            Rvideo.addEventListener('waiting', (event) => {if (data.debug) {} });
            Rvideo.addEventListener('loadstart', (event) => {if (data.debug) {}});
            Rvideo.addEventListener('timeupdate', (event) => {
        
                let CurTime = event.target.currentTime;
                let CurPercent = CurTime / vidUnits;
                let curPerRounded = Math.round(CurPercent);
        
                if (progressBarStats) {
                    progBar.style.width = curPerRounded + "%";
                }
        
                if ((curPerRounded >= 1) && (curPerRounded < 25) && (Q0)) {
                    if (data.debug) {}
                    if (data.VideoTracking) {TrackingFunction0();}   
                    Q0 = false;
                }
    
                if ((curPerRounded >= 25) && (curPerRounded < 50) && (Q1)) {
                    if (data.debug) {}
                    if (data.VideoTracking) {TrackingFunction25();}   
                    Q1 = false;
                }
    
                if ((curPerRounded >= 50) && (curPerRounded < 75) && (Q2)) {
                    if (data.debug) {}
                    if (data.VideoTracking) {TrackingFunction50();}   
                    Q2 = false;
                }
    
                if ((curPerRounded >= 75) && (curPerRounded < 95) && (Q3)) {
                    if (data.debug) {}
                    if (data.VideoTracking) {TrackingFunction75();}   
                    Q3 = false;
                }
    
                if ((curPerRounded >= 95)&& (Q4)) {
                    if (data.debug) {}
                    if (data.VideoTracking) {TrackingFunction100();}
                    Q4 = false;
                    videoEnded = true;
                }
                
                if (data.debug) {}
        
            });
        
            Rvideo.addEventListener('playing', (event) => {
                if (videoEnded) {videoEnded = false;}
                if (data.debug) {}
                if (data.poster) {posterElement.style.display = "none";}
                Rvideo.style.display = "block";
                Scope.Hide( Scope.VideoPlayButton);
                Scope.Show( Scope.VideoPauseButton);
                if (data.callbackfunction) if (data.callbackfunction.onPlay) 
                  { if (!autoplaystats) { data.callbackfunction.onPlay(); }}

                Scope.SetState (vidParentContainer,"play-state");
                if (data.wrapper) {if (data.maxwidth) Scope.SetState (wrapper,"play-state");}
        
            });
        
          }
        
          /* ::::::::::: public functions here ::::::::::::: */
          /* ::::::::::::::::::::::::::::::::::::::::::::::: */
        
            TimeUpdate (event) {
                let CurTime = event.target.currentTime;
                let CurPercent = CurTime / this.vidUnits;
                let curPerRounded = Math.round(CurPercent);
        
                if (curPerRounded === 25) {
                    if (Q1) {
                        if (data.VideoTracking) this.FirePixel(pixel25);
                        Q1 = false;
                    }
                    
                }
        
                if (curPerRounded == 50) {
                    if (Q2) {
                        if (data.VideoTracking) this.FirePixel(pixel50);
                        Q2 = false;
                    }
                    
                }
        
                if (curPerRounded == 75) {
                    if (Q3) {
                        if (data.VideoTracking) this.FirePixel(pixel75);
                        Q3 = false;
                    }
                    
                }
        
                if (curPerRounded == 99) {
                    if (Q4) {
                        if (data.VideoTracking) this.FirePixel(pixel100);
                        Q4 = false;
                    }
                }
            }

            status () {
                var Scope = this;
                //console.log(Scope);
                var status = {};
                status.volume = Scope.video.volume;
                status.playing =  String(Scope.videostats);
                status.replaystats = Scope.replaystats;
                status.mute = Scope.video.muted;
                status.currentTime = Scope.video.currentTime;
                return status;
            }
        
            isSafari () {
                var areyouSafari = false;
                var ua = navigator.userAgent.toLowerCase(); 
                if (ua.indexOf('safari') != -1) { 
                    if (ua.indexOf('chrome') > -1) { areyouSafari = false;} 
                    else { areyouSafari = true; }
                }
                return areyouSafari;
            }
        
            isApp () {
                var returnVal = false;
                var safeFrame = window["$sf"];
                if (safeFrame != undefined) { returnVal = true;}
                return returnVal;
            }
        
            ToggleSoundBtnImages () {
        
                let MuteBtn = document.getElementById("mute-btn");
                let UnMuteBtn = document.getElementById("unmute-btn");
        
                if (MuteBtn.style.display == "block") {
                    MuteBtn.style.display = "none";
                    UnMuteBtn.style.display = "block";
                }
                else {
                    MuteBtn.style.display = "block";
                    UnMuteBtn.style.display = "none";
                }
              }
        
              ToggleSound () {
                var Scope = this;
                let currentVolume = Scope.video.volume;
                let currentVideoVolumeStats = Scope.video.muted;
                if (currentVideoVolumeStats == true) {
                    Scope.video.volume = 1;
                    Scope.video.muted = false;	
                    if (data.callbackfunction) if (Scope.data.callbackfunction.onUnMute) {Scope.data.callbackfunction.onUnMute();}		
                }
                else {
                    Scope.video.volume = 0;
                    Scope.video.muted = true;	
                    if (data.callbackfunction) if (Scope.data.callbackfunction.onMute) {Scope.data.callbackfunction.onMute();}
                }
        
                Scope.ToggleSoundBtnImages();
            }
        
            MuteVideo () {
                var Scope = this;
                Scope.video.volume = 0;
                Scope.video.muted = true;	
                Scope.Hide( Scope.VideoMuteButton);
                Scope.Show( Scope.VideoUnMuteButton);

                if (Scope.data.callbackfunction) if (Scope.data.callbackfunction.onMute) {Scope.data.callbackfunction.onMute();}
            }
        
            UnMuteVideo () {
                var Scope = this;
                Scope.video.volume = 1;
                Scope.video.muted = false;	
                Scope.Show( Scope.VideoMuteButton);
                Scope.Hide( Scope.VideoUnMuteButton);

                if (Scope.data.callbackfunction) if (Scope.data.callbackfunction.onUnMute) {Scope.data.callbackfunction.onUnMute();}	
            }
        
            PlayVideo () {
                var Scope = this;
                Scope.video.play();
                Scope.videostats = "playing";
                Scope.Hide( Scope.VideoPlayButton);
        
                if (Scope.replaystats) {
                    if (Scope.data.callbackfunction) if (Scope.data.callbackfunction.onRePlay) {Scope.data.callbackfunction.onRePlay();}
                }
            }
        
            PauseVideo () {
                var Scope = this;
                Scope.video.pause();
                Scope.videostats = "userpaused";
            }

            AutoPauseVideo () {
                var Scope = this;
                Scope.video.pause();
                Scope.videostats = "autopaused";
            }
        
            LoadVideo (data) {
                var Scope = this;
                Scope.video.src = data;
                Scope.video.load();
                Scope.videostats = "playing";
            }
        
            MakeElements (what,ID) {
                var Element = document.createElement(what); 
                Element.setAttribute('id',ID);
                return Element;
            }
            
            AssignBackgroundImage (object, imgLoc) {
                object.style.backgroundImage = 'url(' + imgLoc + ')';
                object.style.backgroundSize = "contain";
                object.style.backgroundPosition = "center";
                object.style.backgroundRepeat = "no-repeat";
            }
        
            AssignSize (object, width, height) {
                object.style.width = width;
                object.style.height = height;
            }
        
            MakePoster (ID, imageurl) {
                var poster = this.MakeElements("div",ID);
                poster.classList.add("poster");
                return poster;
            }
        
            MakePosterBG (ID, imageurl) {  
                var posterBG = this.MakeElements("div","background-" + ID);
                posterBG.style.backgroundImage = 'url(' + imageurl + ')';
                posterBG.classList.add("poster-background");
                return posterBG;
            }
        
            MakePlayButtonOverPoster (ID, imageurl) {
                var playBtn = this.MakeElements("div",ID);
                playBtn.style.backgroundImage = 'url(' + imageurl + ')';
                playBtn.classList.add("poster-frame-playBtn");
                return playBtn;
            }
        
            FirePixel(x) {
                var pixel = x;
                var img = document.createElement("img");
                img.setAttribute("src", pixel);
                img.setAttribute("style", "display:none");
                document.body.appendChild(img);
                console.log("impressions pixel is firing");
            }

            Show (item) {
                try {item.classList.add("show");} catch (Error) {}
                try {item.classList.remove("hide");} catch (Error) {}
            }
        
            Hide (item) {
                try { item.classList.add("hide");} catch (Error) {}
                try { item.classList.remove("show");} catch (Error) {}
            }
        
            SetState (item,whichState) {
                var allStates = ["play-state","beginning-state","pause-state","end-state","auto-play-state","non-auto-play-state","low-power-mode"];
                for (var i = 0; i < allStates.length; i++) {
                    if (allStates[i] == whichState) {item.classList.add(whichState);}
                    else { item.classList.remove(allStates[i]); }
                }
            }
        }
        
        
        /* :::::::::::::::::::::::::::::::::::::::::::: */
        /* :::::::: END OF VIDEO PLAYER CODE :::::::::: */