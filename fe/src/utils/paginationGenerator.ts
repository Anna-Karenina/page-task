export const getPaginationGenerator = (
  currentPageNumber: number,
  totalPageNumber: number,
  offset = 2
): number[] | string[] => {
  // By doing this, when we are close to the beginning or end of the pagination, two numbers are generated after/before the current page,
  // but when we are far from these points (in the middle of the pagination), we generate only one number after/before the current page.
  const offsetNumber =
    currentPageNumber <= offset || currentPageNumber > totalPageNumber - offset ? offset : offset - 1;
  const numbersList: Array<number> = [];
  const numbersListWithDots: Array<string> = [];

  // If itemsPerPage is less than what the user selected with the Select component or if there is no page or only one page:
  if (totalPageNumber <= 1 || totalPageNumber === undefined) return [1];

  // Create list of numbers:
  numbersList.push(1);
  for (let i = currentPageNumber - offsetNumber; i <= currentPageNumber + offsetNumber; i++) {
    if (i < totalPageNumber && i > 1) {
      numbersList.push(i);
    }
  }
  numbersList.push(totalPageNumber);

  // Add three dots to the list of numbers:
  numbersList.reduce((accumulator, currentValue) => {
    if (accumulator === 1) {
      numbersListWithDots.push(accumulator);
    }
    if (currentValue - accumulator !== 1) {
      numbersListWithDots.push('...');
    }
    numbersListWithDots.push(currentValue);

    return currentValue;
  });

  return numbersListWithDots;
};

export const getQueryParams = (url: string): Record<string, string> => {
  const urlObj = new URL(url);
  const params: Record<string, string> = {};

  urlObj.searchParams.forEach((value, key) => {
    params[key] = value;
  });

  return params;
}
