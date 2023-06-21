import type { AssistanceResponse, Langs, PaginationRequest } from '@/types';
import { $api } from '@/api';

export default class AssistanceService {
  static saveForm(form: Omit<AssistanceResponse, '_id'>) {
    return $api.post('assistance', { json: form });
  }

  static getHumansList(params: PaginationRequest) {
    return $api.get('assistance/list', { searchParams: new URLSearchParams(params as any) });
  }

  static deleteForms(ids: string[]) {
    return $api.delete('assistance/forms', { json: ids });
  }

  static findForms(nameOrSurname: string, limit: number, page: number) {
    return $api.get('assistance', { searchParams: new URLSearchParams({ nameOrSurname, limit, page } as any) });
  }

  static getFormById(formId: string) {
    return $api.get('assistance/id', { searchParams: new URLSearchParams({ id: formId }) });
  }

  static saveFormsToSheet(filters: { locale: Langs, street: string, district: string; birth: { from: number; to: number } }) {
    return $api.post('assistance/sheet', { json: filters });
  }

  static getStats(filters: { by: 'month' | 'year'; timestamp: number }) {
    return $api.get('assistance/stats', { searchParams: filters });
  }

  static updateForm(form: Omit<AssistanceResponse, '_id'>, id: string) {
    return $api.patch('assistance', { json: { form, id } });
  }
}
