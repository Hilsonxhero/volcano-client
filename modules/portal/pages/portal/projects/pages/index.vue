<template>
  <div>
    <div class="mb-3 flex justify-between items-center">
      <h1 class="text-2xl text-gray-600">صفحه ها</h1>
      <div>
        <base-button
          @click="handleShowCreatePageHead()"
          type="primary"
          class=""
        >
          <div class="flex items-center">
            <span class="ml-2">ساخت عنوان صفحه</span>
            <nuxt-icon name="add"></nuxt-icon>
          </div>
        </base-button>
      </div>
    </div>

    <div class="mt-4">
      <base-collapse accordion class="product-reviews__collapse">
        <base-collapse-item
          class="bg-white shadow-lg rounded-2xl py-2 px-3 mb-2"
          v-for="(head, index) in pages"
          :data-index="index + 1"
          :title="head.title"
          :name="index + 1"
        >
          <template #actions>
            <BaseButton icon @click.stop="handleShowCreatePage(head)">
              <nuxt-icon class="w-6 h-6" name="add"></nuxt-icon>
            </BaseButton>
            <BaseButton @click.stop="handleShowUpdatePageHead(head)" icon>
              <nuxt-icon class="w-6 h-6" name="magicpen"></nuxt-icon>
            </BaseButton>
            <BaseButton @click.stop="handleDeleteHeadPage(head, index)" icon>
              <nuxt-icon class="w-6 h-6" name="trash"></nuxt-icon>
            </BaseButton>
          </template>
          <div
            v-for="(page, i) in head.children"
            :index="i"
            class="bg-white border border-gray-300 rounded-2xl p-2 flex justify-between items-center mb-2"
          >
            <div>
              <div class="text-gray-700">{{ page.title }}</div>
            </div>
            <div class="flex items-center">
              <BaseButton icon @click="handleShowUpdatePage(page)">
                <nuxt-icon name="magicpen"></nuxt-icon>
              </BaseButton>
              <BaseButton @click="handleSharePage(page)" icon>
                <nuxt-icon name="share"></nuxt-icon>
              </BaseButton>
              <BaseButton
                icon
                @click="handleDeletePage(head.children, page, i)"
              >
                <nuxt-icon class="w-6 h-6" name="trash"></nuxt-icon>
              </BaseButton>
            </div>
          </div>
        </base-collapse-item>
      </base-collapse>
    </div>

    <PageDialog
      :page="selectd_child_page"
      :selected="selectd_page"
      :visible="visible_create_page"
      @create="handleOnCreatePage()"
      @close="handleClosePageDialog()"
    />
    <PageHeadDialog
      :head="selected_head"
      @store="handleOnCreatePageHead()"
      :visible="visible_create_head"
      @close="handleCloseCreateHead()"
    />

    <base-dialog title="اشتراک گذاری" width="50%" v-model="visible_share">
      <div class="mx-4 flex flex-col items-center">
        <base-button block variant="light" @click="handleCopyPagePath()">
          <div class="flex items-center">
            <div class="text-gray-500 ml-2">
              <span v-if="!copied">کپی کردن لینک</span>
              <span v-else>کپی شد!</span>
            </div>
            <span>
              <nuxt-icon
                class="text-gray-500"
                name="clipboard-text"
              ></nuxt-icon>
            </span>
          </div>
        </base-button>

        <div class="text-gray-400 text-xs text-center my-4">
          این صفحه را با دیگران به اشتراک بگذارید!
        </div>

        <!-- <div class="grid grid-cols-12 gap-2">
          <a
            target="_blank"
            :href="`https://wa.me/?text=${product_path}`"
            class="col-span-6 flex rounded-md items-center justify-center scm-whatsapp-bc p-2"
          >
            <div class="scm-whatsapp-tc ml-2">واتساپ</div>
            <div>
              <nuxt-icon class="scm-whatsapp-tc" name="whatsapp"></nuxt-icon>
            </div>
          </a>
          <a
            target="_blank"
            :href="`https://t.me/share/url?text=${product_path}`"
            class="col-span-6 flex rounded-md items-center justify-center scm-telegram-bc p-2"
          >
            <div class="scm-telegram-tc ml-2">تلگرام</div>
            <div>
              <nuxt-icon class="scm-telegram-tc" name="telegram"></nuxt-icon>
            </div>
          </a>
        </div> -->
      </div>
      <template #footer> </template>
    </base-dialog>
  </div>
</template>

<script setup lang="ts">
import { BaseCollapseItem, BaseCollapse } from "@/components/base/collapse";
import PageDialog from "@/modules/portal/components/pages/PageDialog.vue";
import PageHeadDialog from "@/modules/portal/components/pages/PageHeadDialog.vue";
import { BaseMessageBox } from "@/components/base/message-box";
import BaseMessage from "@/components/base/message";
import { useClipboard } from "@vueuse/core";

definePageMeta({
  layout: "project",
  middleware: ["auth"],
});
const visible_share = ref(false);
const visible_create_page = ref(false);
const visible_create_head = ref(false);
const project_id = ref(null);
const route = useRoute();
const pages = ref([]);
const selectd_page: Ref<Object> = ref({});
const selectd_child_page: Ref<Object | null> = ref(null);
const selected_head = ref(null);
const page_path = ref(null);
const selected_page_share = ref(null);
const project_slug = ref(null);
const { text, copy, copied, isSupported } = useClipboard({ page_path });

const handleShowCreatePage = (page: any) => {
  selectd_page.value = page;
  visible_create_page.value = true;
};
const handleShowUpdatePage = (page: any) => {
  selectd_child_page.value = page;
  visible_create_page.value = true;
};

const handleShowCreatePageHead = () => {
  visible_create_head.value = true;
};
const handleShowUpdatePageHead = (head: any) => {
  selected_head.value = head;
  visible_create_head.value = true;
};

const handleCloseCreateHead = () => {
  selected_head.value = null;
  visible_create_head.value = false;
};

const handleClosePageDialog = () => {
  selectd_child_page.value = null;
  visible_create_page.value = false;
};

const handleOnCreatePageHead = () => {
  fetchPages();
};
const handleOnCreatePage = () => {
  fetchPages();
};
const handleSharePage = (page) => {
  selected_page_share.value = page;
  visible_share.value = true;
};
const handleCopyPagePath = () => {
  copy(
    window.location.host +
      `/software/projects/${project_id.value}/${project_slug.value}/pages/${selected_page_share.value.id}`
  );
};

const handleDeleteHeadPage = (head: any, index: any) => {
  BaseMessageBox.confirm(
    `آیا از حذف عنوان صفحه  اطمینان دارید ؟!`,
    "پیام تایید",
    {
      confirmButtonText: "تایید",
      cancelButtonText: "لغو",
      type: "warning",
    }
  )
    .then(async () => {
      const data = await useApiService.remove(
        `application/portal/projects/${project_id.value}/pages/${head?.id}`
      );
      if (data.success) {
        pages.value.splice(index, 1);
        BaseMessage({
          message: "حذف عنوان صفحه با موفقیت انجام شد!",
          type: "success",
          duration: 4000,
          center: true,
          offset: 20,
        });
      }
    })
    .catch(() => {});
};

const handleDeletePage = (head: any, page: any, index: any) => {
  BaseMessageBox.confirm(`آیا از حذف  صفحه  اطمینان دارید ؟!`, "پیام تایید", {
    confirmButtonText: "تایید",
    cancelButtonText: "لغو",
    type: "warning",
  })
    .then(async () => {
      const data = await useApiService.remove(
        `application/portal/projects/${project_id.value}/pages/${page?.id}`
      );
      if (data.success) {
        head.splice(index, 1);
        BaseMessage({
          message: "حذف  صفحه با موفقیت انجام شد!",
          type: "success",
          duration: 4000,
          center: true,
          offset: 20,
        });
      }
    })
    .catch(() => {});
};

const fetchPages = async () => {
  const { data } = await useApiService.get(
    `application/portal/projects/${project_id.value}/pages`
  );
  pages.value = data;
};

onMounted(() => {
  project_id.value = route.params.id;
  project_slug.value = route.params.slug;

  fetchPages();
});
</script>

<style scoped></style>
