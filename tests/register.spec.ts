import { test, expect } from '@playwright/test';

test('create account succefuly', async ({ page }) => {
  test.setTimeout(180000);//3minutes
  
  // Générer une adresse email aléatoire
  const randomString = Math.random().toString(36).substring(2, 10); // génère une chaîne aléatoire
  const timestamp = Date.now(); // ajout d'un timestamp pour plus d'unicité
  const email = `testuser_${randomString}_${timestamp}@example.com`;
  
  const password = "12345678";
  
  await page.goto('https://ztrain-web.vercel.app/home');
  
  //procedure d'inscription
  await page.locator('#style_avatar_wrapper__pEGIQ').click();
  await page.locator(".MuiTabs-root button:nth-child(2)").click();
  await page.locator("#email_register").fill(email);
  await page.locator("#password_register").fill(password);
  await page.locator("#confirm_password_register").fill(password);
  await page.locator("#btn_register").click();

  // Attendre que l'élément soit visible ET contienne l'email correct
await expect(page.locator("#style_avatar_wrapper__pEGIQ").locator("p.MuiTypography-root.MuiTypography-body1.css-80nwu0")).toHaveText(email, { timeout: 30000 });
  
  
});