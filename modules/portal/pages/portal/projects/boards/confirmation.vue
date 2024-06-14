<template>
  <base-skeleton class="my-3 h-screen" animated :loading="loading">
    <template #template>
      <div class="grid grid-cols-12 gap-4 h-full">
        <div class="col-span-12 lg:col-span-6">
          <base-skeleton-item
            class="h-full"
            variant="card"
          ></base-skeleton-item>
        </div>
        <div class="col-span-12 lg:col-span-6">
          <base-skeleton-item
            class="h-full"
            variant="card"
          ></base-skeleton-item>
        </div>
      </div>
    </template>
    <template #default>
      <div class="grid grid-cols-12 min-h-screen">
        <div
          class="col-span-12 md:col-span-6 auth-module-cover flex flex-col items-center justify-center"
        >
          <div class="py-24 px-12 flex flex-col items-center justify-center">
            <div></div>
            <div class="mt-10">
              <img src="@/assets/media/25.svg" alt="" />
            </div>
          </div>
        </div>
        <div
          class="col-span-12 md:col-span-6 flex flex-col justify-center order-first md:order-last"
        >
          <div class="py-24 px-2 xl:max-w-xl xl:mx-auto">
            <div class="mt-10">
              <div class="mt-8">
                <div class="my-8 flex justify-center">
                  <img
                    class="w-36 h-w-36"
                    src="@/assets/media/colb.svg"
                    alt=""
                  />
                </div>
                <h2 class="text-2xl text-gray-700">
                  کاربر
                  <span class="text-blue-600">{{
                    invite.inviter?.username
                  }}</span>
                  شما را به تابلوی
                  <span class="font-bold underline">{{
                    invite.board?.title
                  }}</span>
                  دعوت کرده است.
                </h2>
                <div class="flex justify-center items-center mt-8">
                  <base-button
                    @click="handleConfirmInvite"
                    :loading="loader"
                    type="success"
                    class="ml-2"
                  >
                    تایید درخواست
                  </base-button>
                  <base-button
                    :loading="decline_loader"
                    @click="handleDeclineInvite"
                    type="danger"
                  >
                    رد درخواست
                  </base-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </base-skeleton>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/modules/auth/store";
import { BaseSkeleton, BaseSkeletonItem } from "@/components/base/skeleton";

definePageMeta({
  layout: "invite",
  middleware: ["auth"],
});
const invite = ref({});
const invite_id = ref(null);
const token = ref(null);
const route = useRoute();
const loader = ref(false);
const loading = ref(true);
const decline_loader = ref(false);
const store = useAuthStore();

const handleConfirmInvite = async () => {
  try {
    loader.value = true;
    const formData = {
      token: token.value,
      confirm: true,
    };
    const data = await useApiService.post(
      `application/portal/projects/board/invite/confirmation/${invite_id.value}`,
      formData
    );
    if (data.success) {
      await store.verify();

      navigateTo({
        name: "portal-projects-boards-show",
        params: {
          id: invite.value.board.project?.id,
          board: invite.value.board?.short_link,
        },
      });
    }

    loader.value = false;
  } catch (error) {
    loader.value = false;
  }
};

const handleDeclineInvite = async () => {
  try {
    decline_loader.value = true;
    const formData = {
      token: token.value,
      confirm: false,
    };
    const data = await useApiService.post(
      `application/portal/projects/board/invite/confirmation/${invite_id.value}`,
      formData
    );
    if (data.success) {
      navigateTo("/");
    }

    decline_loader.value = false;
  } catch (error) {
    decline_loader.value = false;
  }
};

const fetchInvite = async () => {
  try {
    const data = await useApiService.get(
      `application/portal/projects/board/invite/confirmation/${invite_id.value}`
    );
    invite.value = data.data;
    loading.value = false;
  } catch (error) {
    loading.value = false;
  }
};

onMounted(() => {
  token.value = route.query.token;
  invite_id.value = route.query.id;
  fetchInvite();
});
</script>

<style scoped></style>
