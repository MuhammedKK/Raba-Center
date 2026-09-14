import { apiClient } from '@/api/client'
import type {
  ContactSubmitResponse,
  HomeServiceRequestValues,
  InquiryFormValues,
  ShadowTeacherRequestValues,
} from '@/features/contact/contact.types'

export const contactApi = {
  submitInquiry: (payload: InquiryFormValues) =>
    apiClient.post<ContactSubmitResponse>('/contact/inquiry', payload),
  submitHomeServiceRequest: (payload: HomeServiceRequestValues) =>
    apiClient.post<ContactSubmitResponse>('/contact/home-service', payload),
  submitShadowTeacherRequest: (payload: ShadowTeacherRequestValues) =>
    apiClient.post<ContactSubmitResponse>('/contact/shadow-teacher', payload),
}
