import { http, HttpResponse } from 'msw'
import { branchesData } from '@/mocks/data/branches.data'

export const branchesHandlers = [http.get('/api/branches', () => HttpResponse.json(branchesData))]
