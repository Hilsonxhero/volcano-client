<template>
  <div>
    <div v-if="store.isLoggedIn" @click="showAccountDialog()">

      <template v-if="user?.media.avatar !== ''">
        <base-avatar fit="cover" shape="circle">
          <img :src="user?.media.avatar" class="" />
        </base-avatar>
      </template>
      <template v-else>
        <base-avatar fit="cover" shape="circle">
          <img src="@/assets/media/faces/blank.png" class="" />
        </base-avatar>
      </template>

    </div>
    <base-dialog v-model="visible_account" title="حساب کاربری" @close="handleFilterModal">
      <div
        class="group t-flex-between-center border-b-gray-300 px-2 hover:bg-gray-100 border-b hover:border-transparent hover:rounded-lg transition-all">
        <div class="flex items-center w-full cursor-pointer">
          <div
            class="w-[2.6rem] overflow-hidden h-[2.6rem] flex items-center justify-center lg:w-[3.5rem] lg:h-[3.5rem] ml-3 rounded-full lg:bg-gray-100 lg:rounded-lg">
            <template v-if="user?.media.avatar !== ''">
              <img class="w-full h-full object-cover border-gray-300 overflow-hidden" :src="user?.media.avatar"
                alt="avatar" />
            </template>
            <template v-else>
              <img class="w-full h-full object-cover border-gray-300 overflow-hidden"
                src="@/assets/media/faces/blank.png" alt="avatar" />
            </template>

          </div>
          <div class="flex flex-col justify-between pb-3 pt-2 w-max">
            <div class="leading-[1.5625rem] mb-2 text-sm font-bold lg:text-typo lg:font-extrabold">
              {{ store.user?.phone }}
            </div>
            <div class="text-typo-light text-xs leading-5 lg:font-bold text-right">
              {{ store.user?.username }}
            </div>
          </div>
        </div>
        <i color="#666" name="t-icon-arrow_back_ios_new-24px"
          class="group-hover:block hidden ml-2 group-hover:text-primary text-sm transition-all material-icons t-icon-arrow_back_ios_new-24px"></i>
      </div>

      <div class="mt-3">
        <div @click="showManageAccountDialog"
          class="group flex items-center py-2 px-2 hover:text-danger hover:bg-gray-100 rounded-lg cursor-pointer">
          <div
            class="flex items-center justify-center profile-item-container min-w-[2.75rem] h-11 rounded-2xl text-[rgb(188, 91, 204)] profile-item-container lg:transition lg:duration-500">
            <nuxt-icon name="user-octagon"
              class="w-6 h-6 fill-current text-primary icon sprite-next text-blue-600"></nuxt-icon>
          </div>
          <span class="block text-center group-hover:text-danger text-sm group-hover:font-bold font-bold mr-2">
            مدیریت حساب کاربری</span>
        </div>
        <div @click="handleLogout"
          class="group flex items-center py-2 px-2 hover:text-danger hover:bg-gray-100 rounded-lg cursor-pointer">
          <div
            class="flex items-center justify-center profile-item-container min-w-[2.75rem] h-11 rounded-2xl text-[rgb(188, 91, 204)] profile-item-container lg:transition lg:duration-500">
            <nuxt-icon name="logout-bulk"
              class="w-6 h-6 fill-current text-primary icon sprite-next text-blue-600"></nuxt-icon>
          </div>
          <span class="block text-center group-hover:text-danger text-sm group-hover:font-bold font-bold mr-2">خروج از
            حساب
            کاربری</span>
        </div>
      </div>
    </base-dialog>
    <ManageAccount v-model="visible_manage_account" @close="visible_manage_account = false" />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/modules/auth/store";
import ManageAccount from "@/modules/auth/components/profile/ManageAccount.vue";
import { storeToRefs } from "pinia";
const store = useAuthStore();
const { user } = storeToRefs(store);
const visible_account = ref(false);
const visible_manage_account = ref(false);
const handleLogout = async () => {
  try {
    await store.logout();
    navigateTo("/");
  } catch (error) { }
};

const handleFilterModal = () => { };

const showAccountDialog = () => {
  visible_account.value = true;
};
const showManageAccountDialog = () => {
  visible_account.value = false;
  visible_manage_account.value = true;
};
</script>

<style scoped></style>
