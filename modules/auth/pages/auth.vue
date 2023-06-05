<template>
  <div>
    <!-- <div class="bg-white p-5 lg:shadow-design-base rounded-3xl">
      <template v-if="otp">
        <Otp :username="username" :end="end" @reset="otp = false" />
      </template>
      <template v-else>
        <Confirmation v-model="username" @change="handleChange" />
      </template>
    </div> -->
    <div class="grid grid-cols-12 min-h-screen">
      <div
        class="col-span-12 md:col-span-6 auth-module-cover flex flex-col items-center justify-center"
      >
        <div class="py-24 px-12 flex flex-col items-center justify-center">
          <div>
            <!-- <h1 class="text-4xl font-semibold leading-7">
              به Volcano خوش آمدید و کسب و کار خود را توسعه دهید
            </h1> -->
          </div>
          <div class="mt-10">
            <img src="@/assets/media/25.svg" alt="" />
          </div>
        </div>
      </div>
      <div
        class="col-span-12 md:col-span-6 flex flex-col justify-center order-first md:order-last"
      >
        <div class="py-24 px-12 xl:max-w-xl xl:mx-auto">
          <h1 class="text-3xl">ورود به حساب کاربری</h1>

          <div class="mt-10">
            <div
              class="flex flex-col lg:flex-row space-y-4 lg:space-y-0 items-center"
            >
              <div class="w-full">
                <BaseButton class="w-full" size="large">
                  <div class="flex items-center">
                    <div>ورود با گوگل</div>
                    <nuxt-icon
                      filled
                      class="w-7 h-7 mr-4"
                      name="google"
                    ></nuxt-icon>
                  </div>
                </BaseButton>
              </div>

              <div class="w-full lg:mr-3">
                <BaseButton class="w-full" size="large">
                  <div class="flex items-center">
                    <div>ورود با گیت هاب</div>
                    <nuxt-icon
                      filled
                      class="w-7 h-7 mr-4"
                      name="github"
                    ></nuxt-icon>
                  </div>
                </BaseButton>
              </div>
            </div>
            <div class="relative flex justify-center mb-8 mt-10">
              <h3
                class="text-sm text-gray-500 z-10 relative dark:bg-dark-930 bg-white px-3"
              >
                یا ورود به حساب
              </h3>
              <i
                class="absolute top-1/2 transform -translate-y-1/2 z-0 right-0 w-full flex border-t border-gray-400 border-opacity-30"
              ></i>
            </div>
            <div class="mt-8">
              <template v-if="otp">
                <Otp :username="username" :end="end" @reset="otp = false" />
              </template>
              <template v-else>
                <Confirmation v-model="username" @change="handleChange" />
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Otp from "@/modules/auth/components/otp.vue";
import Confirmation from "@/modules/auth/components/confirmation.vue";

definePageMeta({
  layout: "auth",
  middleware: ["guest"],
});
const username = ref("");
const otp = ref(false);
const end = ref("");
const handleChange = (val: any) => {
  otp.value = true;
  end.value = val;
};
</script>

<style scoped></style>
