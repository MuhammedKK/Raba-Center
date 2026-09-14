import { http, HttpResponse } from 'msw'
import { teamData } from '@/mocks/data/team.data'

export const teamHandlers = [http.get('/api/team', () => HttpResponse.json(teamData))]
