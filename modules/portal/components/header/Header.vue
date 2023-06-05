<template>
  <div class="header py-8 mx-4 mt-2 items-stretch">
    <div class="container flex items-center justify-between">
      <div>
        <div></div>
        <div class="flex items-center lg:hidden ml-3" @click="handleShowNav">
          <div class="btn btn-icon btn-active-light-primary">
            <span class="svg-icon svg-icon-2x mt-1">
              <nuxt-icon name="menu" class="w-7 h-7 text-gray-500" />
            </span>
          </div>
        </div>
        <!--end::Aside mobile toggle-->
      </div>
      <div>
        <div>
          <base-avatar fit="cover" shape="circle">
            <img src="~/assets/media/faces/2.jpg" class="" />
          </base-avatar>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const active = ref(false);

const emits = defineEmits(["show-nav"]);

const handleShowNav = () => {
  active.value = true;
  emits("show-nav", active.value);
};
</script>

<style scoped></style>
