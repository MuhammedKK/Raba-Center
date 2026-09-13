import { http, HttpResponse } from 'msw'
import { accreditationsData, credentialsData } from '@/mocks/data/accreditations.data'

export const accreditationsHandlers = [
  http.get('/api/credentials', () => HttpResponse.json(credentialsData)),
  http.get('/api/accreditations', () => HttpResponse.json(accreditationsData)),
]
