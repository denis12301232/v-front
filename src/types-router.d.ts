import type { Component } from 'vue';
import 'vue-router';

declare module 'vue-router' {
  export interface RouteMeta {
    layout?: string;
    layoutComponent?: Component;
    layoutProps?: { [name: string]: any };
  }
}
