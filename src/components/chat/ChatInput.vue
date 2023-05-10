<template>
  <QInput
    v-model="message"
    ref="inputRef"
    class="input"
    filled
    label-slot
    :readonly="isRecording || !!voiceMessage"
    :="$attrs"
    @keyup.enter="saveMessage()"
  >
    <template #label>
      <div v-if="voiceMessage">Записано голосовое сообщение</div>
      <div v-else-if="!isRecording">Написать сообщение</div>
      <div class="recording" v-else>Идет запись...</div>
    </template>
    <template #prepend>
      <EmojiPicker @pick="onPickEmoji" @hide="inputRef?.$el.focus()" />
    </template>
    <template #append>
      <QBtn v-if="!message" dense round flat icon="photo_camera" @click="fileInput?.click()" />
      <QBtn v-if="voiceMessage" dense round flat icon="stop_circle" color="red" @click="voiceMessage = null" />
      <QBtn
        v-if="!message && !voiceMessage"
        dense
        round
        flat
        :icon="!isRecording ? 'mic' : 'mic_off'"
        @click="!isRecording ? startRecording() : stopRecording()"
      />
      <QBtn
        v-if="message || voiceMessage"
        dense
        round
        flat
        icon="send"
        @click="saveMessage(voiceMessage ? 'audio' : null)"
      />
    </template>
  </QInput>
  <input v-show="false" ref="fileInput" type="file" multiple accept="image/*" @change="onMedia" />
</template>

<script setup lang="ts">
import type { QInput } from 'quasar';
import EmojiPicker from '~/EmojiPicker.vue';
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useStore, useChatStore } from '@/stores';
import { useVoice } from '@/hooks';
import { Util } from '@/util';

const { user } = storeToRefs(useStore());
const chatStore = useChatStore();
const message = ref<string | null>(null);
const files = ref<File[] | null>(null);
const inputRef = ref<QInput | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);
const { voiceMessage, isRecording, startRecording, stopRecording } = useVoice();
const onTypingDebounce = Util.debounceDecorator(onTyping, 1000);

watch(message, () => {
  onTypingDebounce();
});

watch(voiceMessage, () => {
  if (voiceMessage.value) {
    files.value = [voiceMessage.value];
  }
});

watch(files, () => {
  if (files.value && !voiceMessage.value) {
    saveMessage('image');
  }
});

watch(isRecording, () => {
  inputRef.value?.blur();
});

function saveMessage(type: 'audio' | 'image' | null = null) {
  chatStore.socket.emit('chat:message', {
    text: message.value!,
    chatId: chatStore.currentChatId!,
    attachments: files.value,
    type: type,
  });
  message.value = null;
  files.value = null;
  voiceMessage.value = null;
}

async function onMedia(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    files.value = Array.from(target.files);
  }
}

function onTyping() {
  chatStore.socket.emit('chat:typing', chatStore.currentChatId!, user.value.name, user.value._id);
}

function onPickEmoji(emoji: string) {
  message.value = message.value + emoji;
}
</script>

<style scoped lang="scss">
.input {
  & div.q-field__label {
    width: 100% !important;
  }
  font-size: 1.2em;

  & .recording {
    display: flex;
    justify-content: center;
    transition: none !important;
  }

  & .send {
    cursor: pointer;
    color: $primary;

    &:hover {
      color: $secondary;
    }
  }
}
</style>