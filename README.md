# kkbox-podcast-project
A KKBOX side project built with audio player to play podcast served with RSS feed.

## Project First Look
![Project First Look](https://drive.google.com/uc?export=view&id=1gmNR0xjg4Vq_XIZ19CpxnrjQLB0QYnCC)


## User Stories
- 當使用者開啟 Home Page 時，可以看到該 RSS 內的所有 Episode 
- 首頁欲顯示五筆 Episode，當使用者快看完時，顯示下五筆（效能優化）
- 當使用者點擊任一 Episode 時，會跳轉至 Episode Page，可以看到該 Episode 的完整資訊 
- 使用者在 Episode 頁面可以播放該集的內容 
- 使用者在播放音樂時，可以跳轉至其他頁面而不中斷
- 若 Episode 有新的集數時，會自動接續播放，若無則會停止播放 
- 使用者可以透過 Seek Bar 來控制播放進度 
- 使用者前往不存在的路由，會顯示 Not found 頁面
- 頁面跳轉透過 Animation 提升使用者體驗


<p>&nbsp;</p>

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
