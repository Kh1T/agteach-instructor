function createData(...rest) {
    return { ...rest };
  }
  const headers = ["Product Name", "Category", "Quantity", "Price", "Edit"];
  const rows = [
    createData("Pruning Shears", "Planting Tools", 25, "$15", 'edit'),
    createData("Garden Hose", "Watering Equipment", 50, "$30", 'edit'),
    createData("Soil pH Meter", "Soil Testing", 40, "$25", 'edit'),
    createData("Wheelbarrow", "Transport Tools", 15, "$80", 'edit'),
    createData("Garden Gloves", "Safety Gear", 100, "$5", 'edit'),
    createData("Lawn Mower", "Lawn Care", 10, "$200", 'edit'),
    createData("Compost Bin", "Composting", 12, "$60", 'edit'),
    createData("Garden Trowel", "Planting Tools", 75, "$10", 'edit'),
    createData("Plant Fertilizer", "Soil Amendments", 45, "$12", 'edit'),
    createData("Watering Can", "Watering Equipment", 30, "$8", 'edit'),
    createData("Garden Rake", "Garden Tools", 25, "$20", 'edit'),
    createData("Hedge Trimmer", "Garden Tools", 20, "$100", 'edit'),
    createData("Seed Starter Kit", "Planting Tools", 60, "$18", 'edit'),
    createData("Bird Feeder", "Garden Decor", 40, "$25", 'edit'),
    createData("Plant Labels", "Garden Accessories", 150, "$3", 'edit'),
  ];
  const data = { headers, rows };

  export const products = [
  {
    name: 'Grow Lights - LED or fluorescent grow lights',
    category: 'Planting Tools',
    price: 10,
    quantity: 5,
  },
  {
    name: 'Garden Hose',
    category: 'Planting Tools',
    price: 10,
    quantity: 5,
  },
  {
    name: 'Soil pH Meter',
    category: 'Planting Tools',
    price: 10,
    quantity: 5,
  },
  {
    name: 'Lawn Mower',
    category: 'Planting Tools',
    price: 10,
    quantity: 5,
  },
  {
    name: 'Plant Fertilizer',
    category: 'Planting Tools',
    price: 10,
    quantity: 5,
  },
  {
    name: 'Soil pH Meter',
    category: 'Planting Tools',
    price: 10,
    quantity: 5,
  },
  {
    name: 'Lawn Mower',
    category: 'Planting Tools',
    price: 10,
    quantity: 5,
  },
  {
    name: 'Plant Fertilizer',
    category: 'Planting Tools',
    price: 10,
    quantity: 5,
  },
  {
    name: 'Soil pH Meter',
    category: 'Planting Tools',
    price: 10,
    quantity: 5,
  },
  {
    name: 'Lawn Mower',
    category: 'Planting Tools',
    price: 10,
    quantity: 5,
  },
  {
    name: 'Plant Fertilizer',
    category: 'Planting Tools',
    price: 10,
    quantity: 5,
  },

];