# MyTube-interview-test
> [live demo](https://interview-test-mytube.herokuapp.com/)
## 系統需求
* node = v10.16.0
* npm = 6.9.0

### 安裝專案所需套件
```
npm install
```

### 設定編譯所需要變數
> 在主目錄下新增 `buildConfig.js`檔案，設定 API_KEY
```
	const API_KEY = [APIKEY];
	module.exports = API_KEY;
```

### 編譯程式碼
```
npm run build
```

### 開啟 server
```
npm run start
```
