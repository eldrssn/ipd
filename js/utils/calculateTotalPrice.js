export function calculateTotalPrice(choosenServices, serviceList) {
  let totalPrice = 0;
  let isFrom = false;

  choosenServices.forEach((chosenService) => {
    const service = serviceList.find((item) => item.slug === chosenService);
    if (service) {
      const price = Array.isArray(service.price)
        ? service.price[0]
        : service.price;

      if (Array.isArray(service.price)) {
        isFrom = true;
      }
      totalPrice += parseInt(price, 10);
    }
  });

  if (totalPrice === 0) {
    return 0;
  }

  return isFrom ? `From AED ${totalPrice}` : `AED ${totalPrice}`;
}
