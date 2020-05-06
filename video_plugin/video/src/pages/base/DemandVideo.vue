<template>
	<div class="video_container">
	  <video class="video" id="video" controls muted></video>
	</div>
</template>

<script>
	// 引入hls.js
	import Hls from 'hls.js'
	
	export default {
		data() {
			return {
			}
		},
		mounted(){
			var video = document.getElementById('video');
			if (Hls.isSupported()) {
				var hls = new Hls();
				hls.loadSource('http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8');
				// hls.loadSource('http://10.10.67.162/live/1080_360p_m3u8file/test_1080p_360_hls.m3u8');
				
				hls.attachMedia(video);
				hls.on(Hls.Events.MANIFEST_PARSED, function () {
					video.play();
				});
			}else if (video.canPlayType('application/vnd.apple.mpegurl')) {
				video.src = 'http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8';
				video.addEventListener('loadedmetadata', function () {
					video.play();
				});
			}
		}
	}
</script>

<style>
	.video_container{
		width: 100%;
		height: 500px;
	}
	
	.video_container .video{
		display: block;
		width: 100%;
		height: 100%;
	}
</style>