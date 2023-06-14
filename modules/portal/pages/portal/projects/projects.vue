<template>
  <div class="">
    <div class="mb-3 flex justify-between items-center">
      <h1 class="text-2xl text-gray-600">پروژه ها</h1>
      <div>
        <base-button
          @click="handleShowCreateProject()"
          type="primary"
          class=""
          to="/"
        >
          <div class="flex items-center">
            <span class="ml-2">ساخت پروژه</span>
            <nuxt-icon name="add"></nuxt-icon>
          </div>
        </base-button>
      </div>
    </div>

    <base-skeleton animated :loading="loading">
      <template #template>
        <div class="grid grid-cols-12 gap-4">
          <div
            class="col-span-12 lg:col-span-4"
            v-for="(item, index) in 3"
            :key="index"
          >
            <base-skeleton-item variant="card"></base-skeleton-item>
          </div>
        </div>
      </template>
      <template #default>
        <div class="grid grid-cols-12 gap-4">
          <div
            class="col-span-12 md:col-span-4 xl:col-span-4"
            v-for="(project, index) in projects"
          >
            <nuxt-link
              :to="{
                name: 'portal-projects-pages-index',
                params: { id: project?.id, slug: project?.slug },
              }"
            >
              <div
                class="bg-white shadow-lg rounded-2xl p-4 text-base hover:shadow-sm transition ease-in-out"
              >
                <div class="flex items-center justify-between">
                  <div>{{ project?.title }}</div>
                  <div>
                    <BaseButton size="small" type="success">
                      {{ project?.status }}</BaseButton
                    >
                  </div>
                </div>

                <div>
                  <p class="text-gray-500 text-xs my-3 leading-6">
                    {{ project?.description }}
                  </p>
                </div>

                <ul class="avatar-group flex items-center mb-0 mt-3">
                  <li
                    class="avatar w-[2rem] h-[2rem] -mr-[0.8rem] relative avatar-sm"
                  >
                    <img
                      class="avatar-img rounded-[50%] w-full h-full object-cover border border-gray-300"
                      src="~/assets/media/faces/1.jpg"
                      alt="avatar"
                    />
                  </li>
                  <li
                    class="avatar w-[2rem] h-[2rem] -mr-[0.8rem] relative avatar-sm"
                  >
                    <img
                      class="avatar-img rounded-[50%] w-full h-full object-cover border border-gray-300"
                      src="~/assets/media/faces/4.jpg"
                      alt="avatar"
                    />
                  </li>
                  <li
                    class="avatar w-[2rem] h-[2rem] -mr-[0.8rem] relative avatar-sm"
                  >
                    <img
                      class="avatar-img rounded-[50%] w-full h-full object-cover border border-gray-300"
                      src="~/assets/media/faces/1.jpg"
                      alt="avatar"
                    />
                  </li>
                  <li
                    class="avatar w-[2rem] h-[2rem] -mr-[0.8rem] relative avatar-sm"
                  >
                    <img
                      class="avatar-img rounded-[50%] w-full h-full object-cover border border-gray-300"
                      src="~/assets/media/faces/2.jpg"
                      alt="avatar"
                    />
                  </li>
                  <li
                    class="avatar w-[2rem] h-[2rem] -mr-[0.8rem] relative avatar-sm"
                  >
                    <img
                      class="avatar-img rounded-[50%] w-full h-full object-cover border border-gray-300"
                      src="~/assets/media/faces/2.jpg"
                      alt="avatar"
                    />
                  </li>
                </ul>

                <div class="text-gray-500 mt-3 text-xs">
                  ایجاد شده در {{ project?.create_at }}
                </div>
              </div>
            </nuxt-link>
          </div>
        </div>
      </template>
    </base-skeleton>

    <base-dialog
      @close="handleCloseCreateProject()"
      title="ایجاد پروژه"
      custom-class="lg:w-[50%]"
      v-model="visible_create_project"
    >
      <div class="grid grid-cols-12 gap-4 py-14">
        <div class="col-span-6 flex flex-col items-center justify-center px-6">
          <div class="w-full">
            <base-form :model="form" ref="formRef" class="h-full space-y-6">
              <base-form-item
                :model="form"
                v-slot="{ field }"
                prop="title"
                :rules="[
                  {
                    required: true,
                    message: '  عنوان پروژه الزامی می باشد',
                  },
                ]"
                label="عنوان"
                class="col-span-12"
              >
                <base-input
                  v-bind="field"
                  v-model="form.title"
                  placeholder="عنوان پروژه"
                ></base-input>
              </base-form-item>

              <base-form-item
                :model="form"
                v-slot="{ field }"
                prop="description"
                :rules="[
                  {
                    required: true,
                    message: '  توضیحات پروژه الزامی می باشد',
                  },
                ]"
                label="توضیحات"
                class="col-span-12"
              >
                <base-input
                  input-class="h-20 resize-none"
                  type="textarea"
                  v-bind="field"
                  v-model="form.description"
                  placeholder="توضیحات پروژه"
                ></base-input>
              </base-form-item>

              <div class="flex flex-col justify-between lg:items-center">
                <div class="w-full">
                  <base-button
                    class="w-full"
                    @click="handleCreateProject"
                    :loading="loader"
                    type="primary"
                    block
                  >
                    ایجاد
                  </base-button>
                </div>
              </div>
            </base-form>
          </div>
        </div>
        <div class="col-span-6 flex flex-col items-center justify-center">
          <div class="w-3/4 mx-auto">
            <img src="@/assets/media/28.svg" alt="" />
          </div>
        </div>
      </div>
    </base-dialog>
  </div>
</template>

<script setup lang="ts">
import { BaseFormItem, BaseForm, BaseFormGroup } from "@/components/base/form";
import { BaseSkeleton, BaseSkeletonItem } from "@/components/base/skeleton";

definePageMeta({
  layout: "portal",
});
const projects = ref([]);
const loading = ref(true);
const loader = ref(false);
const formRef = ref(null);
const visible_create_project = ref(false);

const form = ref({
  title: null,
  description: null,
});

const handleCloseCreateProject = () => {};
const handleShowCreateProject = () => {
  visible_create_project.value = true;
};

const handleCreateProject = () => {};

const fetchProjects = async () => {
  const { data } = await useApiService.get("portal/projects");
  projects.value = data.projects;
  loading.value = false;
};

onMounted(() => {
  fetchProjects();
});
</script>

<style scoped></style>
