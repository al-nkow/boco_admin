export default function(data) {
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

    if (leruaPrice && leruaArt && leruaLink)
      shops.lerua = { leruaArt, leruaPrice, leruaLink };
    if (obiPrice && obiArt && obiLink)
      shops.obi = { obiArt, obiPrice, obiLink };
    if (maxidomPrice && maxidomArt && maxidomLink)
      shops.maxidom = { maxidomArt, maxidomPrice, maxidomLink };
    if (petrovichPrice && petrovichArt && petrovichLink) {
      shops.petrovich = {
        petrovichArt,
        petrovichPrice,
        petrovichLink,
      };
    }
    return { product, shops };
  });
}
