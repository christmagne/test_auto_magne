import { test, expect } from '@playwright/test';

test('create account succefuly', async ({ page }) => {
  test.setTimeout(180000);//3minutes
  // information de connexion
const email ="christ.magne0310@gmail.com";
const password = "12345678";

  await page.goto('https://ztrain-web.vercel.app/home');

  // procedure de connection
  await page.locator('#style_avatar_wrapper__pEGIQ').click();
  await page.locator("#email_login").fill(email);
  await page.locator("#password_login").fill(password);
  await page.locator("#btn_login").click();


// verifier si l'adresse mail present dans la page est bien celle avec laquelle on c'est register 
  await expect(page.locator("#style_avatar_wrapper__pEGIQ").locator("p.MuiTypography-root.MuiTypography-body1.css-80nwu0")).toHaveText(email);

})