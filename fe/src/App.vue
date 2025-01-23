<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { repository } from './dal/repository'
import TableComponent from './components/table/TableComponent.vue'
import { useRoute, useRouter } from 'vue-router'
import type { User } from './dal/models/users'
const route = useRoute()
const router = useRouter()

const tableData = ref<Array<User>>([])
const totalEntries = ref(0)
const pageLimit = ref(10)
const currentPage = ref(0)
const cols = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Имя' },
  { key: 'email', label: 'Email' },
  { key: 'age', label: 'Возраст' },
]
const getData = async () => {
  try {
    const { data, limit, page, total } = await repository.getUsers(
      currentPage.value,
      pageLimit.value,
    )
    totalEntries.value = total
    tableData.value = data
    pageLimit.value = limit
    currentPage.value = page
  } catch (error) {
    console.log(error)
  }
}

const updateTable = async (newPage: number, newLimit: number) => {
  if (newPage) currentPage.value = newPage
  if (newLimit) pageLimit.value = newLimit

  getData()
  router.push({
    path: '/users',
    query: {
      ...route.query,
      ...(newPage && { page: currentPage.value }),
      ...(newLimit && { size: pageLimit.value }),
    },
  })
}

onMounted(() => {
  const params = new URLSearchParams(location.search)
  let page: number = 1
  let size: number = 10
  params.forEach((value, key) => {
    page = key === 'page' ? +value : page
    size = key === 'size' ? +value : size
  })
  router.push({ path: '/users', query: { page, size } })
  currentPage.value = page
  pageLimit.value = size
  getData()
})
</script>

<template>
  <main>
    <TableComponent
      @updateTable="updateTable"
      :columns="cols"
      :tableData="tableData"
      :totalEntries="totalEntries"
      :pageLimit="pageLimit"
      :currentPage="currentPage"
    />
  </main>
</template>
