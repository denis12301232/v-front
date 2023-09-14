import type { IAlertType } from '@/types';
import { onMounted, onUnmounted, ref } from 'vue';
import { defineStore } from 'pinia';
import { Alert, ChatAlert, Notice } from '@/models';
import { useAudioAlert } from '@/hooks';
import { NoticeService } from '@/api/services';

export const useAlertStore = defineStore('alert', () => {
  const { play } = useAudioAlert('/audio/new-message.mp3');
  const muted = ref(false);
  const alerts = ref<Array<Alert | ChatAlert>>([]);
  const leaved = ref(false);
  const notices = ref<Map<string, Notice>>(new Map());

  onMounted(async () => {
    Notification.permission === 'denied' && Notification.requestPermission();
    document.addEventListener('visibilitychange', onVisibilityChange);
    NoticeService.index()
      .json<Notice[]>()
      .then((n) => {
        for (const item of n) {
          const notice = new Notice(item);
          notices.value.set(notice.id, notice);
        }
      });
  });
  onUnmounted(() => document.removeEventListener('visibilitychange', onVisibilityChange));

  function onVisibilityChange() {
    document.visibilityState === 'visible' ? (leaved.value = false) : (leaved.value = true);
  }

  function setMuted() {
    muted.value = !muted.value;
  }

  function addNotice(title: string, text: string) {
    const notice = new Notice({ title, text });
    notices.value.set(notice.id, notice);
    NoticeService.store({ ...notice, show: false });
    !muted.value && play();
  }

  function addAlert(type: IAlertType, message: string) {
    alerts.value.push(new Alert(type, message));
    !muted.value && play();
  }

  function sendPushNotification(title: string, opts?: NotificationOptions) {
    if (muted.value || !leaved.value) return;
    Notification.permission === 'granted' && new Notification(title, opts);
  }

  return { muted, setMuted, alerts, addAlert, notices, addNotice, sendPushNotification };
});
