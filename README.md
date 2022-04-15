# 스프링부트 동영상 스트리밍 - pseudo streaming

```txt
pseudo streaming 란?
다운로드 방식으로 파일을 전송하면서 재생하는 방식
PSEUDO(가짜라는 뜻)
다운로드시 파일을 청크를 내서 부분을 계속 재전송 해준다.
스트리밍 서버(RTMP 혹은 WebRTC)없이 웹 서버만으로 구성할 수 있다.
단점은 다운로드 경로가 유출되면 보안에 취약해진다. 하지만 그 경로가 스프링부트 내부라면 static 폴더가 아니면 경로가 탈취되어도 접근이 불가하다.
/resources/static/ 외부 접근 가능 경로
/resources/video/ 외부 접근 불가능한 경로 - 오직 내부에서만 접근가능하다. resources 경로는 / 로 자바에서 접근가능하다.
```

Rest 요청
- http://localhost:8080/video/stream/mp4/toystory

html 파일에서 fetch 요청
- http://localhost:8080/main.html
      

        
      