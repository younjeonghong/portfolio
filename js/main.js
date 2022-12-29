$(function(){
	// 1) 페이지 이동 관련
	var scrollT=0;
	var darkN=0;
	var pageN=0;
	var targetY=0;
	var winHalf;
	var categoryFlag=false;

	$(".global_menu .menu li").eq(darkN).addClass("active");

	$(window).scroll(function(){
		scrollT=$(window).scrollTop();

		if(scrollT <= $("#page1").offset().top){
			darkN=0;
		}
		else if(scrollT <= $("#page2").offset().top){
			darkN=1;
		} 
		else if(scrollT <= $("#page3").offset().top){
			darkN=2;
		}
		else if(scrollT <= $("#page4").offset().top){
			darkN=3;

			if(Math.floor(scrollT) == $(document).height()-$(window).height()){
				darkN=4;
			}
		}
		else{
			darkN=4;
		}

		$(".global_menu .menu li").removeClass("active");
		$(".global_menu .menu li").eq(darkN).addClass("active");
		$(".mobile_menu .menu li").removeClass("active");
		$(".mobile_menu .menu li").eq(darkN).addClass("active");

		/*왼쪽 컨트롤러*/
		$(".controller li").removeClass("active");
		$(".controller li").eq(darkN).addClass("active");

		console.log(darkN);

		if(darkN != 0){
			$(".global_menu").addClass("dark");
			$(".global_tabs").addClass("dark");
			$(".download").addClass("dark");
		}
		else{
			$(".global_menu").removeClass("dark");
			$(".global_tabs").removeClass("dark");
			$(".download").removeClass("dark");
		}

		if(scrollT <= $("#page1").offset().top-winHalf){
			pageN=0;
		}
		else if(scrollT <= $("#page2").offset().top-winHalf){
			pageN=1;
		}
		else if(scrollT <= $("#page3").offset().top-winHalf){
			pageN=2;
		}
		else if(scrollT <= $("#page4").offset().top-winHalf){
			pageN=3;
		}
		else{
			pageN=4;
		}

		if(pageN == 1 || pageN ==2 || pageN ==3){
			$(".pc_menu").addClass("dark");
			$("#gnb").addClass("dark");
			$(".copy").addClass("dark");
			$(".controller li").addClass("dark");
			$(".global_tabs").addClass("dark");
		}
		else{
			$(".pc_menu").removeClass("dark");
			$("#gnb").removeClass("dark");
			$(".copy").removeClass("dark");
			$(".controller li").removeClass("dark");
			$(".global_tabs").removeClass("dark");
		}

		if(categoryFlag) return;

		if(pageN == 0){
			$("#header").addClass("active");
		}
		else{
			$("#page"+pageN).addClass("active");

			if(pageN == 4){
				categoryFlag=true;
			}
		}
	});

	// 2) 화면 크기 조정 관련
	$(window).resize(function(){
		winHalf=$(window).height()/2;
	});

	$(window).trigger("resize");
	$(window).trigger("scroll");

	// 3) 탭 이동 관련
	$(".global_tabs").click(function(e){
		e.preventDefault();
		$("body").toggleClass("fixed");
		$(this).toggleClass("active");
		$(".floating_menu").toggleClass("active");
	});
	$(".global_menu .menu li").click(function(e){
		e.preventDefault();
		darkN=$(this).index();

		if(darkN == 0){
			targetY=0;
		}
		else{
			targetY=$("#page"+darkN).offset().top+2;
		}

		$("html").animate({scrollTop:targetY}, 500);
	});
	$(".mobile_menu .menu li").click(function(e){
		e.preventDefault();
		darkN=$(this).index();

		$("body").removeClass("fixed");
		$(".global_tabs").removeClass("active");
		$(".floating_menu").removeClass("active");

		if(darkN == 0){
			targetY=0;
		}
		else{
			targetY=$("#page"+darkN).offset().top+2;
		}

		$("html").delay(500).animate({scrollTop:targetY}, 500);
	});
	$(".controller li").click(function(e){
		e.preventDefault();
		pageN=$(this).index();

		if(pageN == 0){
			targetY=0;
		}
		else{
			targetY=$("#page"+pageN).offset().top+2;
		}

		$("html").animate({"scrollTop":targetY}, 300);
	});

	// 4) 비디오 구현 관련
	var videoUrl=["video1", "video2", "video3"];
	var videoTotal=videoUrl.length;
	var videoN=0;
	var videoPath="";
	var video=document.getElementById("my_video");
	video.muted=true;

	function videoDimmed(){
		$(".video video").hide().css({opacity:0});

		setTimeout(function(){
			$(".video video").show().animate({opacity:1}, 300, function(){
				video.play();
			});
		}, 800);
	}

	video.addEventListener("loadeddata", function(){
		videoDimmed();
	});
	video.addEventListener("ended", function(){
		if(videoN < (videoTotal-1)){
			videoN+=1;
		}
		else{
			videoN=0;
		}

		video.pause();
		videoPath="video/"+videoUrl[videoN]+".mp4";
		$("#my_video").attr({src:videoPath});
	});

	//keyword
    const wr = document.querySelector(".keyword ul");
    const words = wr.children;

    let x = 0;
    rotate(x);

    setInterval(() => {
        x = ++x % words.length;
        rotate(x);
    }, 1500);

    function rotate(start) {
        for (let i = 0; i < words.length; ++i) {
            const j = (start + i) % words.length;
            let percent = j / words.length;
            let rad = percent * 2 * Math.PI;
            let y = Math.sin(rad) * 200;
            let z = 40 * Math.cos(rad) - 40;
            let op = (Math.cos(rad) + 1) / 2;
            words[i].style.transform = `perspective(100px) translateZ(${z}px) translateY(${y}%)`;
            words[i].style.opacity = `${op}`;
        }
    }

	//page3 project
	var projectN=0;

	$(".project:first").addClass("active");

	$(".project .title_area").click(function(e){
		e.preventDefault();
		var project=$(this).parents(".project");

		if(projectN != project.index()){
			ptojectN=project.index();
			$(".project").removeClass("active");
			project.addClass("active");

			var projectY=$(this).offset().top-60;
			$("html").animate({scrollTop:projectY}, 800);
		}
	});
});//end