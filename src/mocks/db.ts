export interface Location {
  id: number;
  name: string;
  robot: {
    id: string;
    is_online: boolean;
  };
}

export const locations = [
  {
    id: 0,
    name: "Spicy restaurant",
    robot: {
      id: "",
      is_online: false,
    },
  },
  {
    id: 1,
    name: "Salty restaurant",
    robot: {
      id: "fghij456",
      is_online: false,
    },
  },
  {
    id: 2,
    name: "Sweet Bakery",
    robot: {
      id: "ijklm789",
      is_online: true,
    },
  },
  {
    id: 3,
    name: "Sour Cafe",
    robot: {
      id: "nopqr012",
      is_online: false,
    },
  },
  {
    id: 4,
    name: "Bitter Bar",
    robot: {
      id: "stuvw345",
      is_online: true,
    },
  },
  {
    id: 5,
    name: "Umami Diner",
    robot: {
      id: "xyzab678",
      is_online: true,
    },
  },
  {
    id: 6,
    name: "Savory Grill",
    robot: {
      id: "cdefg901",
      is_online: false,
    },
  },
  {
    id: 7,
    name: "Cheesy Cafe",
    robot: {
      id: "ghijk234",
      is_online: true,
    },
  },
  {
    id: 8,
    name: "Fruity Bistro",
    robot: {
      id: "lmnop567",
      is_online: false,
    },
  },
  {
    id: 9,
    name: "Nutty House",
    robot: {
      id: "qrstuv890",
      is_online: true,
    },
  },
  {
    id: 10,
    name: "Tangy Terrace",
    robot: {
      id: "wxyzab123",
      is_online: false,
    },
  },
  {
    id: 11,
    name: "Minty Lounge",
    robot: {
      id: "bcdefg456",
      is_online: true,
    },
  },
  {
    id: 12,
    name: "Crispy Corner",
    robot: {
      id: "hijklm789",
      is_online: true,
    },
  },
  {
    id: 13,
    name: "Zesty Zone",
    robot: {
      id: "nopqrs012",
      is_online: false,
    },
  },
  {
    id: 14,
    name: "Herbal Haven",
    robot: {
      id: "tuvwxy345",
      is_online: true,
    },
  },
  {
    id: 15,
    name: "Spiced Den",
    robot: {
      id: "zabcde678",
      is_online: false,
    },
  },
  {
    id: 16,
    name: "Grilled Yard",
    robot: {
      id: "fghijk901",
      is_online: true,
    },
  },
  {
    id: 17,
    name: "Smoky BBQ",
    robot: {
      id: "lmnopq234",
      is_online: false,
    },
  },
  {
    id: 18,
    name: "Roasted Place",
    robot: {
      id: "rstuvw567",
      is_online: true,
    },
  },
  {
    id: 19,
    name: "Flavored Inn",
    robot: {
      id: "xyzabc890",
      is_online: false,
    },
  },
];
