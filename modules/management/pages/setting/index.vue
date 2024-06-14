<template>
  <div>
    <base-skeleton class="mt-3" animated :loading="loading">
      <template #template>
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12">
            <base-skeleton-item variant="card"></base-skeleton-item>
          </div>
        </div>
      </template>
      <template #default>
        <section class="mb-6 bg-white shadow-lg p-4 rounded-2xl">
          <div>
            <base-form
              @submit.prevent="handleSave"
              :model="form"
              ref="formRef"
              class="h-full"
            >
              <base-tabs v-model="activeTab">
                <base-tab-pane label="تنظیمات اولیه" name="variables">
                  <section class="grid grid-cols-12 gap-2">
                    <base-form-item
                      :model="form"
                      prop="site_name"
                      :rules="[
                        {
                          required: true,
                          message: '   نام سایت  الزامی می باشد',
                        },
                      ]"
                      label=" نام سایت"
                      class="col-span-12 lg:col-span-12"
                    >
                      <base-input
                        v-model="form.site_name"
                        placeholder=" نام سایت "
                      ></base-input>
                    </base-form-item>
                    <base-form-item
                      :model="form"
                      prop="site_description"
                      :rules="[
                        {
                          required: true,
                          message: '   توضیحات سایت  الزامی می باشد',
                        },
                      ]"
                      label=" توضیحات سایت"
                      class="col-span-12 lg:col-span-6"
                    >
                      <base-input
                        input-class="h-[70px]"
                        type="textarea"
                        v-model="form.site_description"
                        placeholder=" توضیحات سایت "
                      ></base-input>
                    </base-form-item>
                    <base-form-item
                      :model="form"
                      prop="copyright"
                      :rules="[
                        {
                          required: true,
                          message: '   متن کپی رایت  الزامی می باشد',
                        },
                      ]"
                      label=" متن کپی رایت"
                      class="col-span-12 lg:col-span-6"
                    >
                      <base-input
                        input-class="h-[70px]"
                        type="textarea"
                        v-model="form.copyright"
                        placeholder=" متن کپی رایت "
                      ></base-input>
                    </base-form-item>
                    <base-form-item
                      :model="form"
                      prop="email"
                      :rules="[
                        {
                          required: true,
                          message: '    ایمیل   الزامی می باشد',
                        },
                      ]"
                      label="  ایمیل "
                      class="col-span-12 lg:col-span-4"
                    >
                      <base-input
                        input-class="h-[70px]"
                        v-model="form.email"
                        placeholder="  ایمیل  "
                      ></base-input>
                    </base-form-item>
                    <base-form-item
                      :model="form"
                      prop="phone"
                      :rules="[
                        {
                          required: true,
                          message: '    شماره تلفن   الزامی می باشد',
                        },
                      ]"
                      label="  شماره تلفن "
                      class="col-span-12 lg:col-span-4"
                    >
                      <base-input
                        input-class="h-[70px]"
                        v-model="form.phone"
                        placeholder="  شماره تلفن  "
                      ></base-input>
                    </base-form-item>
                    <base-form-item
                      :model="form"
                      prop="mobile"
                      :rules="[
                        {
                          required: true,
                          message: '    شماره همراه   الزامی می باشد',
                        },
                      ]"
                      label="  شماره همراه "
                      class="col-span-12 lg:col-span-4"
                    >
                      <base-input
                        input-class="h-[70px]"
                        v-model="form.mobile"
                        placeholder="  شماره همراه  "
                      ></base-input>
                    </base-form-item>
                    <base-form-item
                      :model="form"
                      prop="home_title"
                      :rules="[
                        {
                          required: true,
                          message: '    عنوان صفحه اصلی  الزامی می باشد',
                        },
                      ]"
                      label="  عنوان صفحه اصلی"
                      class="col-span-12 lg:col-span-12"
                    >
                      <base-input
                        v-model="form.home_title"
                        placeholder="  عنوان صفحه اصلی "
                      ></base-input>
                    </base-form-item>
                    <base-form-item
                      :model="form"
                      prop="home_description"
                      :rules="[
                        {
                          required: true,
                          message: '    توضیحات صفحه اصلی  الزامی می باشد',
                        },
                      ]"
                      label="  توضیحات صفحه اصلی"
                      class="col-span-12 lg:col-span-12"
                    >
                      <base-input
                        input-class="h-[70px]"
                        type="textarea"
                        v-model="form.home_description"
                        placeholder="  توضیحات صفحه اصلی "
                      ></base-input>
                    </base-form-item>
                  </section>
                </base-tab-pane>
                <base-tab-pane label="شبکه های مجازی" name="social">
                  <section>
                    <div
                      class="grid grid-cols-12 gap-2 mb-3"
                      v-for="(socialmedia, index) in form.socialmedia"
                      :key="index"
                    >
                      <base-input
                        class="col-span-6"
                        v-model="socialmedia.name"
                        placeholder="کلید "
                      ></base-input>
                      <base-input
                        class="col-span-6"
                        v-model="socialmedia.value"
                        placeholder="مقدار"
                      ></base-input>
                    </div>
                  </section>
                </base-tab-pane>
                <base-tab-pane label="لوگو و طراحی" name="design">
                  <section>
                    <base-form-item
                      :model="form"
                      prop="image"
                      label="لوگوی روشن سایت"
                      class="col-span-12 mt-8"
                    >
                      <div>
                        <base-upload
                          :max="1"
                          v-model="form.logo_light_media"
                          :sources="form.logo_light"
                        ></base-upload>
                      </div>
                    </base-form-item>
                    <base-form-item
                      :model="form"
                      prop="image"
                      label="لوگوی تاریک سایت"
                      class="col-span-12 mt-8"
                    >
                      <div>
                        <base-upload
                          :max="1"
                          v-model="form.logo_dark_media"
                          :sources="form.logo_dark"
                        ></base-upload>
                      </div>
                    </base-form-item>
                  </section>
                </base-tab-pane>
              </base-tabs>

              <div class="flex flex-col justify-between lg:items-center mt-8">
                <div class="w-full flex items-center">
                  <base-button
                    nativeType="submit"
                    class="w-full"
                    :loading="loader"
                    type="primary"
                    block
                  >
                    ویرایش
                  </base-button>
                </div>
              </div>
            </base-form>
          </div>
        </section>
      </template>
    </base-skeleton>
  </div>
</template>

<script setup lang="ts">
import {
  BaseFormItem,
  BaseForm,
  BaseFormGroup,
  BaseValidationError,
} from "@/components/base/form";
import { BaseTabPane } from "@/components/base/tabs";
import { BaseSkeleton, BaseSkeletonItem } from "@/components/base/skeleton";
import { FormItemContext } from "~/core/tokens";
import BaseMessage from "@/components/base/message";

definePageMeta({
  layout: "management",
  middleware: ["auth"],
});
const formRef = ref(null);
const loader = ref(false);
const activeTab = ref("variables");
const loading = ref(true);
const form = ref({
  site_name: null,
  site_description: null,
  logo: null,
  copyright: null,
  home_title: null,
  home_description: null,
  email: null,
  phone: null,
  mobile: null,
  socialmedia: null,
  logo_dark_media: null,
  logo_light_media: null,
});
const handleSave = () => {
  formRef.value?.validate(async (valid: any): Promise<void> => {
    if (valid) {
      try {
        const form_data = new FormData();
        form_data.append("site_name", form.value.site_name);
        form_data.append("site_description", form.value.site_description);
        form_data.append("home_title", form.value.home_title);
        form_data.append("home_description", form.value.home_description);
        form_data.append("phone", form.value.phone);
        form_data.append("address", form.value.address);
        form_data.append("email", form.value.email);
        form_data.append("mobile", form.value.mobile);
        form_data.append("copyright", form.value.copyright);
        form_data.append("socialmedia", JSON.stringify(form.value.socialmedia));
        if (form.value.logo_light_media.file) {
          form_data.append("logo_light", form.value.logo_light_media?.file);
        }
        if (form.value.logo_dark_media.file) {
          form_data.append("logo_dark", form.value.logo_dark_media?.file);
        }
        loader.value = true;
        const data = await useApiService.post(
          "management/setting/variables",
          form_data
        );

        BaseMessage({
          message: "ویرایش تنظیمات با موفقیت انجام شد!",
          type: "success",
          duration: 4000,
          center: true,
          offset: 20,
        });
      } catch (error) {}

      loader.value = false;
    }
  });
};

const fetchSetting = async () => {
  const data = await useApiService.get("management/setting/variables");
  loading.value = false;
  form.value.site_name = data.data.site_name;
  form.value.site_description = data.data.site_description;
  form.value.home_title = data.data.home_title;
  form.value.home_description = data.data.home_description;
  form.value.address = data.data.address;
  form.value.email = data.data.email;
  form.value.phone = data.data.phone;
  form.value.mobile = data.data.mobile;
  form.value.copyright = data.data.copyright;
  form.value.logo_light = data.data.logo_light;
  form.value.logo_dark = data.data.logo_dark;
  form.value.socialmedia = data.data.socialmedia;
};

onMounted(() => {
  fetchSetting();
});
</script>

<style scoped></style>
