export const catColor = (category: string) => {
  switch (category) {
    case "Food":
      return "bg-red-600";
    case "Wood":
      return "bg-green-600";
    case "Furniture":
      return "bg-yellow-600";
    case "Electronics":
      return "bg-orange-600";
    case "Human":
      return "bg-cyan-600";
    case "Metals":
      return "bg-purple-600";
    case "Other":
      return "bg-gray-600";
    default:
      return "bg-gray-600";
  }
};

export const pageSizes = ["24", "48", "72"];
export const roles = ["ADMIN", "USER"];
export const units = ["pcs", "kg"];
