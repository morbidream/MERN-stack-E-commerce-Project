
const puppeteer =require ('puppeteer');
const fs =require ('fs-extra');



(async function shirt(){

try{

    const browser =await puppeteer.launch({headless : true});
    const page =await browser.newPage();
    page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.36');
    await page.goto('https://www.labasni.com/categorie-produit/personnaliser/hommes/t-shirts/');
    await page.waitForSelector('#main');
    const sections =await page.$$('#main > div');
    await fs.writeFile('shirtHomme.js','shirt.exports=[\n' )

    for (let i =0;i<sections.length;i++){
        await page.goto('https://www.labasni.com/categorie-produit/personnaliser/hommes/t-shirts/');
        await page.waitForSelector('#main');
        const sections =await page.$$('#main > div');
        const div =sections[i];

        const Image =await div.$eval('img',img=>img.src);        
      
        for (const div of sections){

            const Name= await div.$eval('p',p=>p.innerText);

            await page .waitForSelector('.price');
            
            const lis =await page.$$('.price > span');
            for (const span of lis ){
                const Price =await span.$eval('bdi',bdi=>bdi.innerText);
                await fs.appendFile('shirtHomme.js',`Image:"${Image}",Name:"${Name}",Price:"${Price}"\n`);
            }
        }
      

    }
    await fs.appendFile('shirtHomme.js',`];`);

    console.log('done');

    await browser.close();

}catch(e){
    console.log('our error',e );
}




})();
(async function cap(){

    try{
    
        const browser =await puppeteer.launch({headless : true});
        const page =await browser.newPage();
        page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.36');
        await page.goto('https://www.labasni.com/categorie-produit/personnaliser/accessoires/casquettes/');
        await page.waitForSelector('#main');
        const sections =await page.$$('#main > div');
        await fs.writeFile('shirtHomme.js','shirt.exports=[\n' )
    
        for (let i =0;i<sections.length;i++){
            await page.goto('https://www.labasni.com/categorie-produit/personnaliser/accessoires/casquettes/');
            await page.waitForSelector('.products ');
            const sections =await page.$$('.products  > div');
            const div =sections[i];
            const Image =await div.$eval('img',img=>img.src);        
          
            for (const div of sections){
                const Name= await div.$eval('p',p=>p.innerText);
    
                await page .waitForSelector('.price');
                const lis =await page.$$('.price > span');
                for (const span of lis ){
                    const Price =await span.$eval('bdi',bdi=>bdi.innerText);
                    await fs.appendFile('shirtHomme.js',`Image:"${Image}",Name:"${Name}",Price:"${Price}"\n`);
                }
            }
          
    
        }
        await fs.appendFile('shirtHomme.js',`];`);
    
        console.log('done');
    
        await browser.close();
    
    }catch(e){
        console.log('our error',e );
    }
    
    
    
    
    })();