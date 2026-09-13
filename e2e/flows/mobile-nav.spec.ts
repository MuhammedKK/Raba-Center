import { expect, test } from '@playwright/test'

test.use({ viewport: { width: 390, height: 844 } })

test.describe('mobile nav drawer', () => {
  test('opens from the inline-start side and traps focus in RTL', async ({ page }) => {
    await page.goto('/ar')
    await page.getByRole('button', { name: 'القائمة' }).click()

    const drawer = page.getByRole('dialog', { name: 'القائمة' })
    await expect(drawer).toBeVisible()

    const box = await drawer.boundingBox()
    expect(box?.x).toBeGreaterThan(page.viewportSize()!.width / 2)

    await page.keyboard.press('Escape')
    await expect(drawer).toBeHidden()
  })

  test('opens from the inline-start side in LTR', async ({ page }) => {
    await page.goto('/en')
    await page.getByRole('button', { name: 'Menu' }).click()

    const drawer = page.getByRole('dialog', { name: 'Menu' })
    await expect(drawer).toBeVisible()

    const box = await drawer.boundingBox()
    expect(box?.x).toBeLessThan(50)

    await page.getByRole('button', { name: 'Close' }).click()
    await expect(drawer).toBeHidden()
  })

  test('closing the drawer returns focus to the trigger button', async ({ page }) => {
    await page.goto('/en')
    const trigger = page.getByRole('button', { name: 'Menu' })
    await trigger.click()

    const drawer = page.getByRole('dialog', { name: 'Menu' })
    await expect(drawer).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(trigger).toBeFocused()
  })
})
