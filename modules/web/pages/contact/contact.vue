<template>
  <div>
    <div class="section-hero for-grid">
      <div class="content">
        <div class="w-layout-grid grid-single-page">
          <div class="block-left">
            <h1 data-w-id="Heading 2" class="heading-hero">ارتباط با ما</h1>
            <p data-w-id="Paragraph 2" class="paragraph-hero">
              از طریق روش های زیر با ما در ارتباط باشید!
            </p>
            <div data-w-id="Div Block 12" class="contact-information">
              <div class="icon-contact-bg">
                <img
                  src="@/assets/media/contact-mail.svg"
                  loading="eager"
                  width="35"
                  alt=""
                  class="icon-contact"
                />
              </div>
              <div data-w-id="Div Block 13" class="info-contact">
                <div class="text-info-contact">ایمیل</div>

                <a
                  class="heading-info-contact text-right mt-2 text-xl"
                  :href="`mailto:${variables?.email}`"
                >
                  {{ variables?.email }}
                </a>
              </div>
            </div>
            <div
              data-w-id="bd411211-acea-f1c1-336d-3f9acf9478b7"
              class="contact-information"
            >
              <div class="icon-contact-bg">
                <img
                  src="@/assets/media/contact-phone.svg"
                  loading="eager"
                  width="35"
                  alt=""
                  class="icon-contact"
                />
              </div>
              <div class="info-contact">
                <div class="text-info-contact">شماره همراه</div>
                <h6 class="heading-info-contact text-right mt-2">
                  {{ variables?.phone }}
                </h6>
              </div>
            </div>
          </div>
          <div
            id="w-node-div-block-15-9d7aed22"
            data-w-id="Div Block 15"
            class="block-contact"
          >
            <div class="contact">
              <h3 class="heading-form">برای ما پیام ارسال کنید</h3>
              <p class="paragraph-form">
                پاسخ پیام شما در سریع ترین زمان ممکن از طریق ایمیل ارسال می شود.
              </p>
              <div class="form-block w-form">
                <base-form
                  @submit.prevent="handleSendMessage"
                  ref="formRef"
                  class="form"
                  :model="form"
                >
                  <base-form-item
                    :model="form"
                    v-slot="{ field }"
                    prop="name"
                    :rules="[
                      {
                        required: true,
                        message: ' نام   الزامی می باشد',
                      },
                    ]"
                    label=""
                  >
                    <input
                      type="text"
                      class="text-field w-input"
                      maxlength="256"
                      name="name"
                      data-name="Name"
                      placeholder="نام شما"
                      v-model="form.name"
                    />
                  </base-form-item>

                  <input
                    type="email"
                    class="text-field w-input"
                    maxlength="256"
                    name="Email"
                    data-name="Email"
                    placeholder="آدرس ایمیل"
                    id="Email"
                    required
                    v-model="form.email"
                  />

                  <textarea
                    placeholder="متن پیام .."
                    maxlength="5000"
                    id="Message"
                    name="Message"
                    data-name="Message"
                    required
                    class="textarea w-input"
                    v-model="form.content"
                  ></textarea>

                  <input
                    type="submit"
                    value="ارسال"
                    data-wait="Please wait..."
                    class="submit-button w-button"
                  />
                </base-form>
              </div>
            </div>
            <div class="block-circle---d-top">
              <img
                src="~/assets/media/shape-03.png"
                loading="eager"
                alt=""
                class="image-circle---d3"
              />
            </div>
            <div class="block-circle---d-down">
              <img
                src="~/assets/media/shape-01.webp"
                loading="eager"
                alt=""
                class="image-circle---d4"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BaseFormItem, BaseForm, BaseFormGroup } from "@/components/base/form";
import { storeToRefs } from "pinia";
import { useWebStore } from "@/modules/web/store";
import BaseMessage from "@/components/base/message";

const webStore = useWebStore();
const { variables } = storeToRefs(webStore);
const formRef = ref(null);

const form = ref({
  name: "",
  email: "",
  content: "",
});

const handleSendMessage = () => {
  formRef.value?.validate(async (valid: any): Promise<void> => {
    if (valid) {
      try {
        const form_data = {
          name: form.value.name,
          content: form.value.content,
          email: form.value.email,
        };
        const data = await useApiService.post(
          "application/contact/messages",
          form_data
        );

        if (data.success) {
          BaseMessage({
            message: "پیام شما با موفقیت ارسال شد.",
            type: "success",
            duration: 4000,
            center: true,
            offset: 100,
          });
        }
      } catch (error) {}
    }
  });
};
</script>

<style scoped></style>
