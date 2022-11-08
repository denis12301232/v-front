import $api from '../index'
import { AxiosResponse } from 'axios'
import AssistanceFormDto from '@/api/dtos/AssistanseFormDto'
import { HumansListResponse, FormsListResponse, SendFormResponse } from '@/intefaces/http'


export default class AssistanceService {
   static async catchHumansList({ limit, page }: any): Promise<AxiosResponse<HumansListResponse>> {
      return $api.get<HumansListResponse>('/assistance/list', { params: { limit, page } });
   }

   static async findHuman(surname: string, name: string, patronymic: string,): Promise<AxiosResponse<FormsListResponse>> {
      return $api.post<FormsListResponse>('/assistance/info', { name, patronymic, surname });
   }

   static async sendForm(form: AssistanceFormDto): Promise<AxiosResponse<SendFormResponse>> {
      return $api.post<SendFormResponse>('/assistance', { form });
   }

   static async deleteHuman(id: string): Promise<void> {
      return $api.delete('/assistance/delete/human', { data: { id } });
   }

   static async modifyAssistanceForm(form: AssistanceFormDto, id: string): Promise<void> {
      return $api.patch('/assistance/modify/form', { form, id });
   }

   static async saveFormsToSheet(filters: any): Promise<AxiosResponse<{ message: string, link: string }>> {
      return $api.post('/assistance/sheet', filters);
   }
}