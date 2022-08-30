export const rowalizer = (items, items_per_row = 3) => {
  const rowsNumber = Math.ceil(items.length / items_per_row);
  return Array.from({ length: rowsNumber }, (_, index) => {
    let start = index * items_per_row;
    let end = start + items_per_row;
    return items.slice(start, end);
  });
};
