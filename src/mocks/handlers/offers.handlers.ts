import { http, HttpResponse } from 'msw'
import { offersData } from '@/mocks/data/offers.data'

export const offersHandlers = [http.get('/api/offers', () => HttpResponse.json(offersData))]
