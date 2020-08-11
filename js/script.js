$(document).ready(function(){
    //fullpage_make
    //mousewheel : 익스플로러, 크롬, 사파리, 오페라
    //DOMMouseScroll : 파이어폭스


    var elm = ".box";  //클래스명을 지목할 문자 데이터
    $(elm).each(function(index){  //index = 0, 1, 2, 3, 4, 5, 6
        //개별적으로 각 섹션마다 마우스 휠 이벤트 적용
        $(this).on("mousewheel DOMMouseScroll", function(e){
            e.preventDefault();  //초기화를 막는다. (현재 마우스가 위치한 곳으로부터 맨 상단의 섹션을 감지하지 못하도록 막음)
            //console.log(e);
            var delta = 0;   //마우스가 휠을 돌리지 않은 상태를 초기값으로 선정
            console.log(event.wheelDelta);  //마우스 휠을 내렸을 때, -120 <-> 마우스 휠을 올렸을 때 120
            console.log(event.detail);  
            //파이어폭스 브라우저에서 받게 되는 값 / 마우스 휠을 내렸을 때, 3  <->  마우스 휠을 올렸을 때 -3
            if(!event){event = window.event}  //어떤한 이벤트도 않았다면 초기 윈도우 이벤트로 등록
            if(event.wheelDelta){  //마우스 휠 이벤트를 통해서 어떠한 값을 받았다면
                delta = event.wheelDelta / 120;  //마우스 휠을 내렸을 때, -120  -> -1  <-> 마우스 휠을 올렸을 때 120 -> 1
                if(window.opera) {delta = -delta;}
            }else if(event.detail){ 
                delta = -event.detail / 3;  //마우스 휠을 내렸을 때, 3  ->  -1  <->  마우스 휠을 올렸을 때 -3  ->  1
            }

            var moveTop = $(window).scrollTop();  //각 섹션 스크롤바의 상단 위치 값이 브 라우저 상단으로부터 얼만큼 떨어져 있는 가에 대한 값을 저장
            var elmIndex = $(elm).eq(index);
            // 마우스 휠을 위에서 아래방향으로 내렸을 경우
            if(delta < 0){  //마우스 휠을 내려서 delta에 저장된 값(-1)이 음의 정수라면
                if($(elmIndex).next() != undefined){  //마우스휠을 내리는 시점에서 다음 섹션이 존재한다면
                    try{   //실행문 처리에 대한 시도
                        moveTop = $(elmIndex).next().offset().top;
                        $(".box").removeClass("active");
                        $(elmIndex).next().addClass("active");
                        var $cur_index = $(".box.active").index();
                        $("header li").removeClass("active");
                        $("header li").eq($cur_index).addClass("active");

                    }catch(e){   //시도한 부분 이외의 나머지 부분에 대한 에러를 예외처리
                        //console.log("예외처리");
                    }
                    //

                }
            //마우스 휠을 아래에서 윗 방향으로 올렸을 경우    
            }else{  
                if($(elmIndex).prev() != undefined){  //마우스 휠을 올리는 시점에서 이전 섹션이 존재한다면
                    try{
                        moveTop = $(elmIndex).prev().offset().top;
                        $(".box").removeClass("active");
                        $(elmIndex).prev().addClass("active");
                        var $cur_index = $(".box.active").index();
                        $("header li").removeClass("active");
                        $("header li").eq($cur_index).addClass("active");
                    }catch(e){
                        console.log("예외처리");
                    }
                }
            }

            $("html, body").stop().animate({scrollTop : moveTop + "px"}, 800);




        });

    });


    $("header li").click(function(){
        var $index = $(this).index();
        $("header li").removeClass("active");
        $(this).addClass("active");
        $("html, body").stop().animate({scrollTop : $("main section").eq($index).offset().top}, 1000, function(){
            $("main section").removeClass("active");
            $("main section").eq($index).addClass("active");
        });

        return false;
    });


});

/*

try{
    실행문
}catch(e){
    예외처리    
}



if(조건이 참이라면){
    내부실행문을 실행해라

}   //{  }  :  scope 또는 블록


*/