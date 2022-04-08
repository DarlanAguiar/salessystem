export const showError = (error: Error) => {
  alert(`${error.name} - ${error.message}`);
};
