<template>
  <div class="flex flex-col min-h-screen bg-transparent">
    <div class="overflow-x-auto mt-2">
      <div class="overflow-y-auto h-[calc(100vh-100px)] rounded-t-lg">
        <table class="bg-transparent min-w-full divide-y divide-gray-100">
          <thead class="relative sticky top-0 z-10 pt-20 bg-gray-800">
            <div class="flex justify-end absolute right-0">
              <select
                :value="pageLimit"
                @change="onLimitChange"
                class="mt-1 mr-1 outline-none border green border-green-300 rounded-md shadow-sm bg-transparent"
              >
                <option>10</option>
                <option>30</option>
                <option>50</option>
              </select>
            </div>

            <tr>
              <th
                v-for="(column, index) in columns"
                :key="index"
                class="px-4 py-2 border-b border-gray-300 text-left text-gray-600"
              >
                {{ column.label }}
              </th>
            </tr>
          </thead>
          <tbody class="tbody">
            <tr v-for="(item, index) in tableData" :key="index" class="hover:bg-gray-800">
              <td
                v-for="(column, colIndex) in columns"
                :key="colIndex"
                class="px-4 py-2 border-b border-gray-300"
              >
                {{ item[column.key] }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="flex justify-center items-center shadow-md">
      <Pagination
        :pageLimit="pageLimit"
        :currentPage="currentPage"
        :totalEntries="totalEntries"
        @changePage="updateQuery"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import Pagination from './TablePagination.vue'
export interface TableCols {
  key: string
  label: string
}
export default defineComponent({
  components: { Pagination },
  props: {
    columns: {
      type: Array as PropType<Array<TableCols>>,
    },
    tableData: {
      type: Array as PropType<Array<Record<string, any>>>,
      required: true,
    },
    totalEntries: {
      type: Number,
      required: true,
    },
    pageLimit: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },

  emits: ['updateTable'],

  setup(props, { emit }) {
    const onLimitChange = (e: Event) =>
      emit('updateTable', 1, Number((e.target as HTMLInputElement).value))

    const updateQuery = (page: number) => emit('updateTable', page, props.pageLimit)
    return {
      onLimitChange,
      updateQuery,
    }
  },
})
</script>
