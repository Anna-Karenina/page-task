<template>
  <div class="mt-5 flex flex-col lg:flex-row justify-between pagination">
    <nav
      aria-label="Pagination"
      class="flex justify-center items-center text-gray-600 mt-8 lg:mt-0"
    >
      <a
        href="#"
        @click.prevent="goToPage(currentPage - 1)"
        class="p-2 mr-4 rounded hover:bg-gray-100"
        :disabled="currentPage === 1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </a>
      <a
        v-for="page in renderPages"
        :key="page"
        href="#"
        @click.prevent="goToPage(Number(page))"
        class="px-4 py-2 rounded"
        :class="{
          'bg-gray-200 text-gray-900 font-medium': currentPage === page,
          'hover:bg-gray-100': currentPage !== page,
        }"
      >
        {{ page }}
      </a>
      <a
        href="#"
        @click.prevent="goToPage(currentPage + 1)"
        class="p-2 ml-4 rounded hover:bg-gray-100"
        :disabled="currentPage === totalPages"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </nav>
  </div>
</template>

<script lang="ts">
import { getPaginationGenerator } from '@/utils/paginationGenerator'

import { computed, defineComponent } from 'vue'

export default defineComponent({
  props: {
    pageLimit: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    totalEntries: {
      type: Number,
      required: true,
    },
  },

  emits: ['changePage'],

  setup(props, { emit }) {
    const totalPages = computed(() => Math.ceil(props.totalEntries / props.pageLimit))
    const startItem = computed(() => (props.currentPage - 1) * props.pageLimit + 1)
    const endItem = computed(() =>
      Math.min(props.currentPage * props.pageLimit, props.totalEntries),
    )
    const renderPages = computed(() => getPaginationGenerator(props.currentPage, totalPages.value))

    const goToPage = (page: number) => {
      if (page < 1 || page > totalPages.value) return
      emit('changePage', page)
    }

    return {
      renderPages,
      goToPage,
      totalPages,
      startItem,
      endItem,
    }
  },
})
</script>
