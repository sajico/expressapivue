<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { store } from './store';
import { useParam } from './useParam';

const router = useRouter();
const route = useRoute();
const paramStore = useParam();
const props = defineProps(['id']);

const navigateToApp = () => {
  store.setParam('app2でセットしたparamだよ');
  paramStore.actions.setParam('app2でセットしたstoreParamだよ');
  router.push({
    name: 'app',
    query: {
      param_a: 'app2からだよ',
    }
  });
};

const navigateToApp_id = () => {
  router.push({
    name: 'app_id',
    params: { id: 456 },
  });
};

const data = ref({
  taskList: [],
});
const gatTaskList = async () => {
  const response = await fetch('http://localhost:3000/task');
  const taskList = await response.json();
  data.value.taskList = taskList;
};
onMounted(() => {
  gatTaskList();
});
</script>

<template>
  <router-link to="/app">Appへ</router-link>
  <div>App2.vueです！</div>
  <div>store.param = {{ store.param }}</div>
  <div>paramStore.param = {{ paramStore.store.param }}</div>
  <div>props.id = {{ props.id }}</div>
  <button class="btn" @click="navigateToApp">navigateToApp</button>
  <button class="btn" @click="navigateToApp_id">navigateToApp_id</button>
  <button class="btn" @click="gatTaskList">タスクリスト取得</button>
  <div>task の数は {{ data.taskList.length }} です。</div>
  <table>
    <tr>
      <th>ID</th>
      <th>タイトル</th>
      <th>期限</th>
      <th>状態</th>
    </tr>
    <tr v-for="task in data.taskList" :key="task.id">
      <td>{{ task.id }}</td>
      <td>{{ task.title }}</td>
      <td>{{ task.limit }}</td>
      <td>{{ task.done ? '完' : '未' }}</td>
    </tr>
  </table>
</template>

<style scoped>
.btn {
  margin: 10px;
  padding: 10px;
  cursor: pointer;
}
</style>
