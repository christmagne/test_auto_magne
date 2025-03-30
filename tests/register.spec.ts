import { test, expect } from '@playwright/test';

test('create account succefuly', async ({ page }) => {
  test.setTimeout(180000);//3minutes
  
  // informations d'enregistrement
  const email ="chr.magne0310@gmail.com"; 
  const password = "12345678";
  
  await page.goto('https://ztrain-web.vercel.app/home');
  
  //procedure d'inscription
  await page.locator('#style_avatar_wrapper__pEGIQ').click();
  await page.locator(".MuiTabs-root button:nth-child(2)").click();
  await page.locator("#email_register").fill(email);
  await page.locator("#password_register").fill(password);
  await page.locator("#confirm_password_register").fill(password);
  await page.locator("#btn_register").click();
  
  // Ajouter un délai avant de vérifier l'adresse email
  await page.waitForTimeout(5000); // Attendre 5 secondes
  
  // verifier que l'email present sur la page correspont
  await expect(page.locator("#style_avatar_wrapper__pEGIQ").locator("p.MuiTypography-root.MuiTypography-body1.css-80nwu0")).toHaveText(email);
});