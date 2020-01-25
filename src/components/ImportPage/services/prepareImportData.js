export default function(data) {
  return data.map(item => {
    const {
      bocoArticle = null,
      category = null,
      name = null,
      image = null,
      brand = null,
      weight = null,
      volumeL = null,
      area = null,
      volumeM = null,
      width = null,
      height = null,
      thickness = null,
      leruaArt = null,
      leruaPrice = null,
      leruaLink = null,
      obiArt = null,
      obiPrice = null,
      obiLink = null,
      maxidomArt = null,
      maxidomPrice = null,
      maxidomLink = null,
      petrovichArt = null,
      petrovichPrice = null,
      petrovichLink = null,
    } = item;

    const product = {
      bocoArticle,
      category: category ? category.trim() : null,
      name,
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

    if (leruaArt || leruaPrice || leruaLink)
      shops.lerua = { leruaArt, leruaPrice, leruaLink };
    if (obiArt || obiPrice || obiLink)
      shops.obi = { obiArt, obiPrice, obiLink };
    if (maxidomArt || maxidomPrice || maxidomLink)
      shops.maxidom = { maxidomArt, maxidomPrice, maxidomLink };
    if (petrovichArt || petrovichPrice || petrovichLink) {
      shops.petrovich = {
        petrovichArt,
        petrovichPrice,
        petrovichLink,
      };
    }
    return { product, shops };
  });
}
