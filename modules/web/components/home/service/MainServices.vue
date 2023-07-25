<template>
  <div>
    <section class="bg-white py-14">
      <div class="container">
        <h1 class="text-center text-gray-700 text-4xl font-semibold mb-36">
          مدیریت کار انعطاف پذیر - از ابتدا تا انتها
        </h1>

        <div class="grid grid-cols-12 gap-4 lg:gap-y-20 lg:gap-x-20">
          <div
            class="col-span-12 md:col-span-6 lg:col-span-4"
            v-for="(service, index) in items"
            :key="index"
          >
            <div>
              <div class="flex flex-col items-center">
                <img
                  :src="service?.media?.thumb"
                  alt=""
                  class="mb-10 w-[100px] h-[100px]"
                />

                <h4 class="text-2xl font-semibold text-gray-800 mb-4">
                  {{ service?.title }}
                </h4>
                <div class="text-center text-gray-700 leading-7 ellipsis-2">
                  {{ service?.description }}
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <div>
              <div class="flex flex-col items-center">
                <img src="@/assets/media/11.svg" alt="" class="mb-10" />

                <h4 class="text-2xl font-semibold text-gray-800 mb-4">
                  لورم ایپسوم متن ساختگی با تولید
                </h4>
                <div class="text-center text-gray-700 leading-7">
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                  با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و
                  مجله
                </div>
              </div>
            </div>
          </div>
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <div>
              <div class="flex flex-col items-center">
                <img src="@/assets/media/12.svg" alt="" class="mb-10" />

                <h4 class="text-2xl font-semibold text-gray-800 mb-4">
                  لورم ایپسوم متن ساختگی با تولید
                </h4>
                <div class="text-center text-gray-700 leading-7">
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                  با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و
                  مجله
                </div>
              </div>
            </div>
          </div>
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <div>
              <div class="flex flex-col items-center">
                <img src="@/assets/media/13.svg" alt="" class="mb-10" />

                <h4 class="text-2xl font-semibold text-gray-800 mb-4">
                  لورم ایپسوم متن ساختگی با تولید
                </h4>
                <div class="text-center text-gray-700 leading-7">
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                  با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و
                  مجله
                </div>
              </div>
            </div>
          </div>
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <div>
              <div class="flex flex-col items-center">
                <img src="@/assets/media/14.svg" alt="" class="mb-10" />

                <h4 class="text-2xl font-semibold text-gray-800 mb-4">
                  لورم ایپسوم متن ساختگی با تولید
                </h4>
                <div class="text-center text-gray-700 leading-7">
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                  با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و
                  مجله
                </div>
              </div>
            </div>
          </div>
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
            <div>
              <div class="flex flex-col items-center">
                <img src="@/assets/media/15.svg" alt="" class="mb-10" />

                <h4 class="text-2xl font-semibold text-gray-800 mb-4">
                  لورم ایپسوم متن ساختگی با تولید
                </h4>
                <div class="text-center text-gray-700 leading-7">
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                  با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و
                  مجله
                </div>
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  items: {},
});
</script>

<style scoped></style>
