import { accreditationsHandlers } from './accreditations.handlers'
import { coursesHandlers } from './courses.handlers'
import { offersHandlers } from './offers.handlers'
import { statsHandlers } from './stats.handlers'
import { testimonialsHandlers } from './testimonials.handlers'

export const handlers = [
  ...statsHandlers,
  ...offersHandlers,
  ...coursesHandlers,
  ...testimonialsHandlers,
  ...accreditationsHandlers,
]
