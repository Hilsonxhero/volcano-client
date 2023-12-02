<template>
  <div class="card-module rounded-2xl p-4 text-base transition ease-in-out">
    <div class="flex items-center justify-between">
      <div>{{ project?.title }}</div>
      <div>
        <template v-if="project?.status == 'active'">
          <BaseButton size="small" type="success"> فعال </BaseButton>
        </template>
      </div>
    </div>

    <div>
      <p class="text-gray-500 text-xs my-3 leading-6">
        {{ project?.description }}
      </p>
    </div>

    <ul class="avatar-group flex items-center mb-0 mt-3 mr-2">
      <li
        v-for="(member, index) in project.members"
        :key="index"
        class="avatar w-[2rem] h-[2rem] -mr-[0.8rem] relative avatar-sm"
      >
        <img
          class="avatar-img rounded-[50%] w-full h-full object-cover border border-gray-300"
          src="~/assets/media/faces/blank.png"
          alt="avatar"
        />
      </li>
    </ul>

    <div class="text-gray-500 mt-3 text-xs">
      ایجاد شده در {{ project?.create_at }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  project: {},
});
</script>

<style scoped></style>
