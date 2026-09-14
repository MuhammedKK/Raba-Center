import { http, HttpResponse } from 'msw'
import { servicesData } from '@/mocks/data/services.data'

export const servicesHandlers = [http.get('/api/services', () => HttpResponse.json(servicesData))]
