import type { HomeServiceRequestValues } from '@/features/contact/schemas/homeServiceRequest.schema'
import type { InquiryFormValues } from '@/features/contact/schemas/inquiryForm.schema'
import type { ShadowTeacherRequestValues } from '@/features/contact/schemas/shadowTeacherRequest.schema'

export interface ContactSubmitResponse {
  success: true
  referenceId: string
}

export type { HomeServiceRequestValues, InquiryFormValues, ShadowTeacherRequestValues }
