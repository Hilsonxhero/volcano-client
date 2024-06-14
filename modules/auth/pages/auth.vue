<template>
  <div>
    <!-- <div class="grid grid-cols-12 min-h-screen">
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
    </div> -->

    <div class="w-layout-grid grid-account">
      <div data-w-id="Div Block" class="img-account"></div>
      <div class="account">
        <!-- <a href="/" class="brand-account w-nav-brand">
          <BaseLogo class="logo" />
        </a> -->
        <div class="brand-account w-nav-brand">
          <BaseLogo class="logo" />
        </div>

        <div class="w-full max-w-[500px]">
          <div class="account-form">
            <h3 class="heading-form">سلام رفیق!</h3>
            <p class="paragraph-form text-gray-400">به خونه خوش اومدی!</p>

            <!-- <div
              class="flex flex-col lg:flex-row space-y-4 lg:space-y-0 items-center mb-4"
            >
              <div class="w-full">
                <BaseButton class="w-full" size="large">
                  <div class="flex items-center">
                    <div class="text-gray-300">ورود با گوگل</div>
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
                    <div class="text-gray-300">ورود با گیت هاب</div>
                    <nuxt-icon
                      filled
                      class="w-7 h-7 mr-4"
                      name="github"
                    ></nuxt-icon>
                  </div>
                </BaseButton>
              </div>
            </div> -->

            <div class="form-block w-form">
              <form
                id="wf-form-Sign-up"
                name="wf-form-Sign-up"
                data-name="Sign up"
                method="get"
                class="form"
                data-wf-page-id="647e61defa63c5689d7aed28"
                data-wf-element-id="1e4857dc-6e9f-b392-2236-96c15a7560e8"
                aria-label="Sign up"
              >
                <!-- <input
                  type="email"
                  class="text-field w-input"
                  maxlength="256"
                  name="Email"
                  data-name="Email"
                  placeholder="آدرس ایمیل"
                  id="Email"
                />

                <button type="submit" class="submit-button w-button">
                  ادامه
                </button> -->
                <template v-if="otp">
                  <Otp :username="username" :end="end" @reset="otp = false" />
                </template>
                <template v-else>
                  <Confirmation v-model="username" @change="handleChange" />
                </template>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseLogo from "@/components/app/BaseLogo.vue";
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
