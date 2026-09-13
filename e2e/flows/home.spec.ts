import { expect, test } from '@playwright/test'

async function dragFigure(page: import('@playwright/test').Page, deltaX: number) {
  const figure = page.locator('figure')
  const box = (await figure.boundingBox())!
  const startX = box.x + box.width / 2
  const startY = box.y + box.height / 2

  await page.mouse.move(startX, startY)
  await page.mouse.down()
  for (let step = 1; step <= 5; step += 1) {
    await page.mouse.move(startX + (deltaX * step) / 5, startY, { steps: 2 })
  }
  await page.mouse.up()
}

test.describe('home page', () => {
  test('renders hero, stats, offers, courses, testimonials, and accreditations in en', async ({
    page,
  }) => {
    await page.goto('/en')

    await expect(
      page.getByRole('heading', { name: 'Helping every child reach their fullest potential' }),
    ).toBeVisible()
    await expect(page.getByText('Special programs, thoughtfully priced')).toBeVisible()
    await expect(page.getByText('Featured certification programs')).toBeVisible()
    await expect(page.getByText('What parents are saying')).toBeVisible()
    await expect(page.getByText('Accreditations & partnerships')).toBeVisible()
  })

  test('animated stats count up to their final values', async ({ page }) => {
    await page.goto('/en')
    await page.getByText('Parent satisfaction').scrollIntoViewIfNeeded()
    await expect(page.getByText('92%')).toBeVisible({ timeout: 5000 })
  })

  test('testimonial dot pagination switches the visible quote', async ({ page }) => {
    await page.goto('/en')
    await page.getByText('What parents are saying').scrollIntoViewIfNeeded()

    await expect(page.getByText('Sara A.')).toBeVisible()
    await page.getByRole('button', { name: '2' }).click()
    await expect(page.getByText('Faisal M.')).toBeVisible()
    await expect(page.getByText('Sara A.')).not.toBeVisible()
  })

  test('dragging the testimonial forward/back is mirrored correctly between ltr and rtl', async ({
    page,
  }) => {
    await page.goto('/en')
    await page.getByText('What parents are saying').scrollIntoViewIfNeeded()
    await expect(page.getByText('Sara A.')).toBeVisible()

    // LTR: dragging toward the end (left-to-right negative delta) advances to "next".
    await dragFigure(page, -120)
    await expect(page.getByText('Faisal M.')).toBeVisible()

    await page.goto('/ar')
    await page.getByText('ماذا يقول أولياء الأمور').scrollIntoViewIfNeeded()
    await expect(page.getByText('سارة أ.')).toBeVisible()

    // RTL: the mirrored "toward the end" drag is a positive delta (physically rightward).
    await dragFigure(page, 120)
    await expect(page.getByText('فيصل م.')).toBeVisible()
  })
})
