import { http, HttpResponse } from 'msw'
import { valuesData } from '@/mocks/data/values.data'

export const valuesHandlers = [http.get('/api/values', () => HttpResponse.json(valuesData))]
