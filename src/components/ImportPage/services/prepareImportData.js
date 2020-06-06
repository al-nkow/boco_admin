export default function(data, wholesaleKeys, shopKeys) {
  return data.map(item => {
    const {
      bocoArticle = null,
      category = null,
      name = null,
      description = null,
      image = null,
      brand = null,
      weight = null,
      volumeL = null,
      area = null,
      volumeM = null,
      width = null,
      height = null,
      thickness = null,
    } = item;

    const product = {
      bocoArticle,
      category,
      name,
      description,
      image,
      brand,
      weight,
      volumeL,
      area,
      volumeM,
      width,
      height,
      thickness,
    };

    const shops = {};
    // shops: { obi: { obiPrice: '', obiArt: '', obiLink: '' }, petrovich: { .... } ... }
    shopKeys.forEach(shopName => {
      const art = item[`${shopName}Art`];
      const link = item[`${shopName}Link`];
      const price = item[`${shopName}Price`];

      if (price && art && link) {
        shops[shopName] = {
          [`${shopName}Art`]: art,
          [`${shopName}Link`]: link,
          [`${shopName}Price`]: price,
        };
      }
    });

    const wholesale = {};
    // wholesale: { coopLarge: { price: '', quantity: '' }, coop: { .... } ... }
    wholesaleKeys.forEach(wholesaleName => {
      const price = item[`${wholesaleName}Price`];
      const quantity = item[`${wholesaleName}Quantity`];

      if (price && quantity)
        wholesale[wholesaleName] = { price, quantity };
    });

    return { product, shops, wholesale };
  });
}
