<template>
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
              <img class="w-36 h-w-36" src="@/assets/media/colb.svg" alt="" />
            </div>
            <h2 class="text-2xl text-gray-700">
              کاربر <span class="text-blue-600">{{ invite.user }}</span> شما را
              به پروژه
              <span class="font-bold underline">{{
                invite.project?.title
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

<script setup lang="ts">
import { useAuthStore } from "@/modules/auth/store";

definePageMeta({
  layout: "invite",
  middleware: ["auth"],
});
const invite = ref({});
const invite_id = ref(null);
const token = ref(null);
const route = useRoute();
const loader = ref(false);
const loading = ref(false);
const decline_loader = ref(false);
const store = useAuthStore();
const handleConfirmInvite = async () => {
  try {
    loader.value = true;
    const formData = {
      token: token.value,
    };
    const data = await useApiService.post(
      "application/portal/projects/invite/membership/confirmation",
      formData
    );
    if (data.success) {
      await store.verify();

      navigateTo({
        name: "portal-projects-index",
        // params: {
        //   id: invite.value.project?.id,
        // },
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
    };
    const data = await useApiService.post(
      "application/portal/projects/invite/membership/decline",
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
    loading.value = true;
    const data = await useApiService.get(
      `application/portal/projects/invite/show/${invite_id.value}`
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
