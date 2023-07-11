export const dividePoints = (shortestPath) => {
  const outputArray = shortestPath.reduce((result, obj, index) => {
    if (index < shortestPath.length - 1) {
      result.push([obj, shortestPath[index + 1]]);
    }
    return result;
  }, []);
  return outputArray;
};
