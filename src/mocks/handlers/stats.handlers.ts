import { http, HttpResponse } from 'msw'
import { statsData } from '@/mocks/data/stats.data'

export const statsHandlers = [http.get('/api/stats', () => HttpResponse.json(statsData))]
