import { expect, test } from '@playwright/test'

test.describe('global navigation', () => {
  test('redirects the root path to the default Arabic locale', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveURL(/\/ar$/)
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
  })

  test('switches language and flips document direction', async ({ page }) => {
    await page.goto('/ar')
    await page.getByRole('button', { name: 'English' }).click()
    await expect(page).toHaveURL(/\/en$/)
    await expect(page.locator('html')).toHaveAttribute('dir', 'ltr')
  })

  test('navigates to every top-level nav destination', async ({ page }) => {
    await page.goto('/en')
    for (const name of [
      'About Us',
      'Services',
      'Programs & Courses',
      'Branches',
      'Blog',
      'Contact Us',
    ]) {
      await page.getByRole('navigation').getByRole('link', { name }).click()
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    }
  })
})
