export function calculateTotalPrice(choosenServices, serviceList) {
  let totalPrice = 0;

  choosenServices.forEach((chosenService) => {
    const service = serviceList.find((item) => item.slug === chosenService);
    if (service) {
      const price =
        typeof service.price === 'string'
          ? service.price.split(' / ')[1]
          : service.price;
      totalPrice += parseInt(price, 10);
    }
  });

  return totalPrice;
}
