<template>
  <button
    ref="_ref"
    :class="[
      ns.b(),
      // ns.m(_type),
      // plain ? ns.bm('outline', _type) : ns.m(_type),
      variantClass,
      ns.m(_size),

      ns.is('disabled', _disabled),
      ns.is('loading', loading),
      ns.is('plain', plain),
      ns.is('icon', icon),
      ns.is('round', round),
      ns.is('circle', circle),
      ns.is('text', text),
      ns.is('link', link),
      ns.is('has-bg', bg),
    ]"
    :aria-disabled="_disabled || loading"
    :disabled="_disabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :style="buttonStyle"
    @click="handleClick"
  >
    <template v-if="loading">
      <slot v-if="$slots.loading" name="loading" />
      <!-- <nuxt-icon v-else name="loading" :class="ns.is('loading')"> </nuxt-icon> -->
    </template>
    <!-- <el-icon v-else-if="icon || $slots.icon">
      <component :is="icon" v-if="icon" />
      <slot v-else name="icon" />
    </el-icon> -->

    <div :class="ns.m('overlay')"></div>
    <span
      v-if="$slots.default && !loading"
      :class="{ [ns.em('text', 'expand')]: shouldAddSpace }"
    >
      <slot />
    </span>
    <span v-if="loading" class="v-btn__loader"
      ><div
        class="v-progress-circular v-progress-circular--indeterminate v-progress-circular--visible v-theme--light"
        style="width: 23px; height: 23px"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <svg
          style="transform: rotate(calc(-90deg))"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 43.80952380952381 43.80952380952381"
        >
          <circle
            class="v-progress-circular__underlay"
            fill="transparent"
            cx="50%"
            cy="50%"
            r="20"
            stroke-width="3.8095238095238093"
            stroke-dasharray="125.66370614359172"
            stroke-dashoffset="0"
          ></circle>
          <circle
            class="v-progress-circular__overlay"
            fill="transparent"
            cx="50%"
            cy="50%"
            r="20"
            stroke-width="3.8095238095238093"
            stroke-dasharray="125.66370614359172"
            stroke-dashoffset="125.66370614359172px"
          ></circle>
        </svg></div
    ></span>
  </button>
</template>

<script lang="ts" setup>
import { Text, computed, inject, ref, useSlots } from "vue";

import { buttonGroupContextKey } from "@/core/tokens";
import { buttonEmits, buttonProps } from "./VButton";
import { useButtonCustomStyle } from "./VButtonCustom";

defineOptions({
  name: "BaseButton",
});

const props = defineProps(buttonProps);
const emit = defineEmits(buttonEmits);
const slots = useSlots();

const buttonGroupContext = inject(buttonGroupContextKey, undefined);
const globalConfig = useGlobalConfig("button");
const ns = useNamespace("button");
const { form } = useFormItem();
const _size = useSize(computed(() => buttonGroupContext?.size));
const _disabled = useDisabled();
const _ref = ref<HTMLButtonElement>();

const _type = computed(() => props.type || buttonGroupContext?.type || "");
const autoInsertSpace = computed(
  () => props.autoInsertSpace ?? globalConfig.value?.autoInsertSpace ?? false
);

const variantClass = computed(() => {
  if (props.plain) {
    return ns.bm("outline", props.type);
  }
  if (props.icon) {
    return ns.bm("icon", props.type);
  }

  return ns.m(props.type);
});

// add space between two characters in Chinese
const shouldAddSpace = computed(() => {
  const defaultSlot = slots.default?.();
  if (autoInsertSpace.value && defaultSlot?.length === 1) {
    const slot = defaultSlot[0];
    if (slot?.type === Text) {
      const text = slot.children as string;
      return /^\p{Unified_Ideograph}{2}$/u.test(text.trim());
    }
  }
  return false;
});

const buttonStyle = useButtonCustomStyle(props);

const handleClick = (evt: MouseEvent) => {
  if (props.nativeType === "reset") {
    form?.resetFields();
  }
  emit("click", evt);
};

defineExpose({
  /** @description button html element */
  ref: _ref,
  /** @description button size */
  size: _size,
  /** @description button type */
  type: _type,
  /** @description button disabled */
  disabled: _disabled,
  /** @description whether adding space */
  shouldAddSpace,
});
</script>
