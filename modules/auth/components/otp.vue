<template>
  <div>
    <div class="w-full">
      <base-form
        @submit.prevent="handleSendCode"
        ref="form"
        class="h-full space-y-6"
      >
        <div class="block mb-4">
          <div class="flex items-center justify-between mb-6">
            <div class="text-gray-200 text-sm cursor-pointer">
              {{ username }}
            </div>
            <div
              @click="changePhone"
              class="text-gray-300 text-sm cursor-pointer lg:mr-0"
            >
              ویرایش شماره موبایل
            </div>
          </div>

          <div class="flex items-center">
            <!-- <base-otp :length="5" v-model="code"></base-otp> -->
            <input
              type="number"
              class="text-field w-input text-center"
              maxlength="5"
              name="Email"
              placeholder="کد تایید"
              v-model="code"
            />
            <div mode="out-in" class="flex flex-col justify-center mr-6 w-56">
              <Countdown
                v-if="!resend"
                :date="ttl_time"
                @finish="resend = true"
              />
              <div
                @click="handleresendCode"
                v-else
                class="inline-block text-xs cursor-pointer text-typo-light font-medium"
              >
                ارسال مجدد
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col justify-between lg:items-center">
          <div class="w-full">
            <!-- <base-button
              class="w-full"
              @click="handleSendCode"
              :loading="loader"
              type="primary"
              block
              >ورود</base-button
            > -->

            <button
              :loading="loader"
              type="submit"
              class="submit-button w-button block w-full"
            >
              ورود
            </button>
          </div>
        </div>
      </base-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/modules/auth/store";
import Countdown from "@/components/common/countdown.vue";
// import HxNotification from "@/components/base/notification";
const props = defineProps({
  username: {
    type: String,
  },
  end: {
    type: String,
  },
});

const emit = defineEmits(["reset"]);
const resend = ref<boolean>(false);
const store = useAuthStore();
const code = ref(null);
const loader = ref(false);
const route = useRoute();
const router = useRouter();
const ttl_time = ref<any>(props.end);
const error = ref<any>(null);

const changePhone = () => {
  emit("reset", true);
};

const handleSendCode = async () => {
  loader.value = true;
  const form = {
    username: props.username,
    code: code.value,
  };
  try {
    const data = await store.login(form);

    if (data.success) {
      await store.init();

      const backUrl = route.query.backUrl || "/portal/dashboard";

      navigateTo(backUrl);
    } else {
      error.value = data.data;
      // HxNotification.info({
      //   title: "",
      //   message: error.value,
      //   showClose: true,
      //   duration: 3000,
      //   position: "bottom-center",
      // });
    }
    loader.value = false;
  } catch (error) {
    loader.value = false;
  }
};

const handleresendCode = async () => {
  loader.value = true;
  const form = {
    username: props.username,
  };
  try {
    const { data } = await store.authenticate(form);
    ttl_time.value - data.ttl * 1000;
    resend.value = false;
    loader.value = false;
  } catch (error) {
    loader.value = false;
  }
};
</script>

<style scoped></style>
