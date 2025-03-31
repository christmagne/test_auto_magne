import { test, expect } from '@playwright/test';

test('ajouter un article au panier en détail', async ({ page }) => {
  // 3 minutes
  test.setTimeout(200000);
  
  await page.goto('https://ztrain-web.vercel.app/home');
  
  // Attendre le chargement des produits
  await page.waitForSelector('.style_card_body_img__mkV1D');
  
  // Ouvrir le panier pour vérifier l'état initial
  const cartButton = page.locator('#style_content_cart_wrapper__mqNbf');
  await cartButton.click();
  
  // Vérifier l'état initial du panier (nombre d'articles et prix total)
  let initialItemCount = 0;
  let initialTotalPrice = 0;
  
  // Attendre que le contenu du panier soit chargé
  await page.waitForSelector('.ant-drawer-body');
  
  // Vérifier si le panier est vide ou contient des articles
  const emptyCartElement = await page.locator('#style_empty_cart_wrapper__23a1z').count();
  
  if (emptyCartElement === 0) {
    // Le panier n'est pas vide, compter les articles
    initialItemCount = await page.locator('.style_card__JLMp6').count();
    
    // Récupérer le prix total
    const priceText = await page.locator('#style_totalPrice__o2yCy h5').last().textContent();
    initialTotalPrice = parseFloat(priceText!.replace('€', '').trim());
  }
  
  // Fermer le panier
  await page.locator('#style_content_cart_header__NIJbw svg').click();
  
  // Compter le nombre total de produits
  const productCount = await page.locator('.style_card_body_img__mkV1D').count();
  
  // Générer un index aléatoire entre 0 et productCount-1
  const randomIndex = Math.floor(Math.random() * productCount);
  
  // Sélectionner un produit aléatoire
  const productImage = page.locator('.style_card_body_img__mkV1D').nth(randomIndex);
  
  // Cliquer sur l'image du produit pour ouvrir ses détails
  await productImage.click();
  
  // Attendre que la page de détails du produit soit chargée
  await page.waitForSelector('#style_btn_add_cart__gTXM7', { state: 'visible', timeout: 10000 });
  
  // Trouver et cliquer sur le bouton "Ajouter au panier"
  const addToCartButton = page.locator('#style_btn_add_cart__gTXM7');
  await addToCartButton.click();
  
  // Attendre que la notification disparaisse 
  await page.waitForSelector('.ant-notification-notice', { state: 'hidden', timeout: 10000 });
  
  // Trouver et cliquer sur l'icone du panier
  const button_panier = page.locator('#style_content_cart_wrapper__mqNbf');
  await button_panier.click();
  
  // Attendre que le contenu du panier soit chargé
  await page.waitForSelector('.ant-drawer-body');
  
  // Vérifier l'état final du panier
  const finalItemCount = await page.locator('.style_card__JLMp6').count();
  
  // Récupérer le prix final
  const finalPriceElement = await page.locator('#style_totalPrice__o2yCy h5').last();
  const finalPriceText = await finalPriceElement.textContent();
  const finalTotalPrice = parseFloat(finalPriceText!.replace('€', '').trim());
  
  // Vérifier si le nombre d'articles OU le prix total a augmenté
  expect(finalItemCount > initialItemCount || finalTotalPrice > initialTotalPrice).toBeTruthy();
});