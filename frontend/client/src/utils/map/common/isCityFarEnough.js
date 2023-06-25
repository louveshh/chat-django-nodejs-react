export const isCityFarEnough = (points, x, y, selectedSize = 10) =>
  points.find(({ x: pointX, y: pointY }) => {
    const distance = Math.sqrt((pointX - x) ** 2 + (pointY - y) ** 2);
    return distance <= selectedSize;
  });
