import type { IUser, IAlert } from '@/types';
import { ref, reactive, computed, watch } from 'vue';
import { defineStore } from 'pinia';
import { useQuasar } from 'quasar';
import { AuthService } from '@/api/services';

type Theme = 'light' | 'dark' | 'system';

export const useStore = defineStore('main', () => {
  const $q = useQuasar();
  const user = ref<IUser | null>(null);
  const theme = ref<Theme>(localStorage.getItem('theme') as Theme);
  const isPageLoading = ref(false);
  const alert = reactive({ show: false, message: '', type: 'success' as IAlert });
  const isAuth = computed(() => !!user.value);
  const isAdmin = computed(() => user.value?.roles.includes('admin') || false);
  const currentTheme = computed(() => {
    switch (theme.value) {
      case 'light':
      case 'dark':
        return theme.value;
      case 'system':
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      default:
        return 'light';
    }
  });

  watch(
    currentTheme,
    (n) => {
      const html = document.querySelector('html');
      n === 'dark' ? $q.dark.set(true) : $q.dark.set(false);
      html?.setAttribute('class', n);
      localStorage.setItem('theme', n);
    },
    { immediate: true }
  );

  function setTheme() {
    currentTheme.value === 'dark' ? (theme.value = 'light') : (theme.value = 'dark');
  }

  function setAlert(visible: boolean, opts: { type?: IAlert; message: string } = { type: 'success', message: '' }) {
    alert.show = visible;
    alert.type = opts.type || 'success';
    alert.message = opts.message;
  }

  async function refresh() {
    try {
      const response = await AuthService.refresh();
      localStorage.setItem('token', response.accessToken);
      user.value = response.user;
    } catch (e: any) {
      setAlert(true, { type: 'error', message: e.message });
      console.error(e);
    }
  }

  async function logout() {
    try {
      const response = await AuthService.logout();
      localStorage.removeItem('token');
      user.value = response;
    } catch (e: any) {
      setAlert(true, { type: 'error', message: e.message });
      console.error(e);
    }
  }

  return { user, theme, isPageLoading, alert, isAuth, isAdmin, currentTheme, setTheme, setAlert, refresh, logout };
});
