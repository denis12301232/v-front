import type { RouteRecordRaw } from 'vue-router';
import RouteMiddlewares from '../middlewares/RouteMiddlewares';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { layout: 'HomeLayout' },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/HomeView.vue'),
    meta: { layout: 'HomeLayout' },
    beforeEnter: [RouteMiddlewares.useNotAuthOnly],
  },
  {
    path: '/registration',
    name: 'registration',
    component: () => import('@/views/HomeView.vue'),
    meta: { layout: 'HomeLayout' },
    beforeEnter: [RouteMiddlewares.useNotAuthOnly],
  },
  {
    path: '/restore',
    name: 'restore',
    component: () => import('@/views/RestoreView.vue'),
    meta: { layout: 'SimpleLayout', layoutProps: { title: 'restore.layout.title' } },
    beforeEnter: [RouteMiddlewares.useNotAuthOnly],
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('@/views/ListView.vue'),
    meta: { layout: 'HomeLayout' },
    beforeEnter: [RouteMiddlewares.useAuthGuard, RouteMiddlewares.useRoleGuard(['admin'])],
  },
  {
    path: '/info',
    name: 'info',
    component: () => import('@/views/InfoView.vue'),
    meta: { layout: 'HomeLayout' },
    beforeEnter: [RouteMiddlewares.useAuthGuard, RouteMiddlewares.useRoleGuard(['admin'])],
  },
  {
    path: '/info/:id',
    name: 'infoId',
    component: () => import('@/views/InfoByIdView.vue'),
    meta: { layout: 'HomeLayout' },
    beforeEnter: [RouteMiddlewares.useAuthGuard, RouteMiddlewares.useRoleGuard(['admin'])],
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('@/views/AccountView.vue'),
    meta: { layout: 'AccountLayout' },
    beforeEnter: [RouteMiddlewares.useAuthGuard],
  },
  {
    path: '/tools',
    name: 'tools',
    component: () => import('@/views/ToolsView.vue'),
    redirect: '/tools/roles',
    children: [
      { path: 'google', component: () => import('~/tools/ToolsGoogle.vue') },
      { path: 'roles', component: () => import('~/tools/ToolsRoles.vue') },
    ],
    meta: { layout: 'ToolsLayout' },
    beforeEnter: [RouteMiddlewares.useAuthGuard, RouteMiddlewares.useRoleGuard(['admin'])],
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: () => import('@/views/TasksView.vue'),
    redirect: 'tasks/list',
    children: [
      { path: 'list', component: () => import('~/tasks/TasksList.vue') },
      { path: 'create', component: () => import('~/tasks/TasksCreate.vue') },
    ],
    meta: { layout: 'TasksLayout' },
    beforeEnter: [RouteMiddlewares.useAuthGuard],
  },
  {
    path: '/task/:id',
    name: 'taskById',
    component: () => import('@/views/TaskByIdView.vue'),
    meta: { layout: 'SimpleLayout', layoutProps: { title: 'tasks.byId.title' } },
    beforeEnter: [RouteMiddlewares.useAuthGuard],
  },
  {
    path: '/gallery',
    name: 'gallery',
    component: () => import('@/views/GalleryView.vue'),
    meta: { layout: 'GalleryLayout' },
  },
  {
    path: '/stats',
    component: () => import('@/views/StatsView.vue'),
    meta: { layout: 'StatsLayout' },
    beforeEnter: [RouteMiddlewares.useAuthGuard, RouteMiddlewares.useRoleGuard(['admin'])],
  },
  {
    path: '/meets',
    name: 'meets',
    component: () => import('@/views/MeetView.vue'),
    meta: { layout: 'SimpleLayout', layoutProps: { title: 'meets.title' } },
    beforeEnter: [RouteMiddlewares.useAuthGuard],
  },
  {
    path: '/meet/:id',
    component: () => import('@/views/MeetByIdView.vue'),
    meta: { layout: 'MeetLayout' },
    beforeEnter: [RouteMiddlewares.useAuthGuard, RouteMiddlewares.useUUIDV4Guard],
  },
  {
    path: '/chat',
    name: 'chat',
    component: () => import('@/views/ChatView.vue'),
    meta: { layout: 'VoidLayout' },
    beforeEnter: [RouteMiddlewares.useAuthGuard],
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('~/TheError.vue'),
    props: { code: 404, message: 'Not found' },
    meta: { layout: 'VoidLayout' },
  },
];
