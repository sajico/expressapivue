## バックエンドサーバーを起動する

- 以下のコマンドを実行して、  
  バックエンド用のプロジェクトを作成する。

###### `terminal`

```bash
mkdir backend
cd backend
npm init -y
npm i express
```

- `app.js` をプロジェクト直下に配置する。

- `package.json` を以下のとおり変更する。

###### `package.json`

```json
  "scripts": {
    "start": "node ./app.js"
  },
```

- `npm start` でサーバーを起動する。

- Google Chrome の拡張機能  
  `talend API Tester` をインストールして  
  API の動作確認を行う。

## フロントエンドを初期設定する

- 以下のコマンドを実行して、  
  フロントエンド用のプロジェクトを作成する。

###### `terminal`

```bash
npm create vue@latest
y [enter]

Project name: … frontend
Add TypeScript? … No
Add JSX Support? … No
Add Vue Router for Single Page Application development? … No
Add Pinia for state management? … No
Add Vitest for Unit Testing? … No
Add an End-to-End Testing Solution? › No
Add ESLint for code quality? … No
```

- 以下のコマンドを実行して、  
  フロントエンド用のプロジェクトを実行する。

###### `terminal`

```bash
cd frontend
npm install
npm run dev
```

## vue ファイルを整理する

- `components` や `assets` を削除して、  
  `src` には `App.vue` と `main.js` だけにする。

- `main.js` の css インポートを削除する。

- `App.vue` の中身を以下に変更する。

###### `App.vue`

```jsx
<script setup>
import { ref } from 'vue';
const count = ref(0);
const increment = () => {
  count.value++;
};
</script>

<template>
  <button class="btn" @click="increment">countに1を足す</button>
  <div>count の値は {{ count }} です。</div>
</template>

<style scoped>
.btn {
  margin: 10px;
  padding: 10px;
  cursor: pointer;
}
</style>
```

## scrap

- 【Vue】reactive()って要らなくね？ref()だけでよくね？  
  https://qiita.com/Yametaro/items/2a37f18fb52f7565b2cb

- Vue.js と Firebase で簡単な Web アプリを作る  
  https://qiita.com/zono345/items/27744ef00b97b0cd8886
