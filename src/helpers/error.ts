export const showError = (error: unknown) => {
  const err = error as Error;
  alert(`${err.name} - ${err.message}`);
};
