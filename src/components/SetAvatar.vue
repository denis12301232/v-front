<template>
  <div class="column">
    <QAvatar
      :class="$style.avatar"
      :icon="avatarTempUrl ? undefined : 'eva-image'"
      :color="color"
      :size="size"
      @click="fileRef?.click()"
    >
      <QImg v-if="avatarTempUrl" :class="$style.image" :src="avatarTempUrl" fit="cover" width="100%" height="100%" />
    </QAvatar>
    <QBtn
      :class="['q-mt-sm', avatarTempUrl ? '' : 'invisible']"
      color="negative"
      icon="eva-close"
      flat
      dense
      round
      @click="resetAvatar"
    />
    <input class="hidden" ref="fileRef" type="file" :accept="accept" @change="onChange" />
  </div>
</template>

<script setup lang="ts">
import type { Props } from '@/types';
import { ref } from 'vue';
import { ENV } from '@/util';

const props = withDefaults(defineProps<Props.Common.SetAvatar>(), {
  size: '45px',
  color: 'blue-grey-3',
  src: '',
  accept: 'image/*',
});
const emit = defineEmits<{ 'update:modelValue': [file: File | null] }>();
const fileRef = ref<HTMLInputElement | null>(null);
const avatarTempUrl = ref(props.src && ENV.IMAGE_URL + '/' + props.src);

function onChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files?.length) {
    avatarTempUrl.value = URL.createObjectURL(target.files[0]);
    emit('update:modelValue', target.files[0]);
  }
}

function resetAvatar() {
  if (fileRef.value) {
    fileRef.value.type = '';
    fileRef.value.type = 'file';
  }
  avatarTempUrl.value = '';
  emit('update:modelValue', null);
}
</script>

<style module lang="scss">
.avatar {
  cursor: pointer;

  & .image {
    transition: all 1.5s;
    &:hover {
      transform: scale(1.1);

      .remove {
        display: block;
      }
    }
  }
}
</style>
