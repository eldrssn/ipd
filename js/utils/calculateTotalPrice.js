export function calculateTotalPrice(choosenServices, serviceList) {
  let totalPrice = 0;
  let isFrom = false;

  const dependancies = ['transparent-ppf', 'colored-ppf', 'wrapping'];
  const isContainsDependancies = () => {
    let isContain = false;

    dependancies.forEach((el) => {
      if (choosenServices.includes(el)) {
        isContain = true;
      }
    });
    return isContain;
  };

  choosenServices.forEach((chosenService) => {
    const service = serviceList.find((item) => item.slug === chosenService);
    if (service) {
      let price = Array.isArray(service.price)
        ? service.price[0]
        : service.price;

      if (Array.isArray(service.price)) {
        isFrom = true;
      }

      if (isContainsDependancies() && service.slug === 'exterior-coating') {
        price = 600;
      }

      totalPrice += parseInt(price, 10);
    }
  });

  if (totalPrice === 0) {
    return 0;
  }

  return isFrom ? `From AED ${totalPrice}` : `AED ${totalPrice}`;
}
