<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { store } from './store';
import { useParam } from './useParam';

const router = useRouter();
const route = useRoute();
const paramStore = useParam();
const props = defineProps(['id']);

const navigateToApp2 = () => {
  store.setParam('appでセットしたparamだよ');
  paramStore.actions.setParam('appでセットしたstoreParamだよ');
  router.push({
    name: 'app2',
    query: {
      param_a: 'appからだよ',
    }
  });
};

const navigateToApp2_id = () => {
  router.push({
    name: 'app2_id',
    params: { id: 123 },
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
  <router-link to="/app2">App2へ</router-link>
  <div>App.vueです！</div>
  <div>store.param = {{ store.param }}</div>
  <div>paramStore.param = {{ paramStore.store.param }}</div>
  <div>props.id = {{ props.id }}</div>
  <button class="btn" @click="navigateToApp2">navigateToApp2</button>
  <button class="btn" @click="navigateToApp2_id">navigateToApp2_id</button>
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
