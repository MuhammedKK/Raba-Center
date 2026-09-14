import { accreditationsHandlers } from './accreditations.handlers'
import { authHandlers } from './auth.handlers'
import { blogHandlers } from './blog.handlers'
import { branchesHandlers } from './branches.handlers'
import { cartHandlers } from './cart.handlers'
import { contactHandlers } from './contact.handlers'
import { coursesHandlers } from './courses.handlers'
import { offersHandlers } from './offers.handlers'
import { servicesHandlers } from './services.handlers'
import { statsHandlers } from './stats.handlers'
import { teamHandlers } from './team.handlers'
import { testimonialsHandlers } from './testimonials.handlers'
import { trainersHandlers } from './trainers.handlers'
import { valuesHandlers } from './values.handlers'

export const handlers = [
  ...statsHandlers,
  ...offersHandlers,
  ...coursesHandlers,
  ...testimonialsHandlers,
  ...accreditationsHandlers,
  ...teamHandlers,
  ...valuesHandlers,
  ...servicesHandlers,
  ...trainersHandlers,
  ...branchesHandlers,
  ...blogHandlers,
  ...contactHandlers,
  ...authHandlers,
  ...cartHandlers,
]
