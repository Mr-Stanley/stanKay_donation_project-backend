const acceptableItems = [
    { name: 'Clothes', category: 'Apparel' },
    { name: 'Books', category: 'Education' },
    { name: 'Toys', category: 'Children' },
    {name: 'food', category: 'raw-food'},
  ];
  
  const getAcceptableItems = () => acceptableItems;
  
  const addAcceptableItem = (item) => {
    acceptableItems.push(item);
    return acceptableItems;
  };
  
  module.exports = { getAcceptableItems, addAcceptableItem };