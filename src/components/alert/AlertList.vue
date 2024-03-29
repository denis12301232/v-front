<template>
  <div :class="[$style.container, 'column', 'reverse', 'z-max', 'fixed']">
    <TransitionGroup :name="$style.animate">
      <AlertMessage
        v-for="alert of alerts"
        :key="alert._id"
        :icon="setIcon(alert.type)"
        :alert="alert"
        @hide-by-id="hideById"
      />
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import type { IAlert, Props } from '@/types';
import AlertMessage from './AlertMessage.vue';
import { watch } from 'vue';
import { useVModel } from '@/hooks';

defineProps<Props.Alert.List>();
defineEmits<{
  'update:modelValue': [alerts: IAlert[]];
}>();
const alerts = useVModel<IAlert[]>();

watch(
  () => alerts.value.length,
  (n, o) => {
    if (n > Number(o) && alerts.value.length) hideAlert();
  },
  { immediate: true }
);

function setIcon(type: IAlert['type']) {
  switch (type) {
    case 'success':
      return 'eva-checkmark-circle-2-outline';
    case 'error':
      return 'eva-close-circle-outline';
    case 'warning':
      return 'eva-alert-triangle-outline';
    case 'info':
      return 'eva-alert-circle-outline';
    default:
      return 'check_circle';
  }
}

function hideAlert() {
  setTimeout(() => alerts.value.splice(0, 1), 3000);
}

function hideById(id: string) {
  alerts.value = alerts.value.filter((item) => item._id !== id);
}
</script>

<style lang="scss" module>
.container {
  top: 80px;
  left: 10px;
  overflow: hidden;
}

.animate {
  &:global(-enter-active) {
    transition: all 0.3s ease-in-out;
  }

  &:global(-leave-active) {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  }
  &:global(-enter-from),
  &:global(-leave-to) {
    transform: translateX(-30px);
    opacity: 0;
  }
}
</style>
