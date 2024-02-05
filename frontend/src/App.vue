<script setup>
import { onMounted, ref } from 'vue';
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
