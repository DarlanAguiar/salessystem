export const errorText = (error: unknown): string => {
  const err = error as Error;
  return err.message;
};

export const showError = (error: unknown) => {
  const err = error as Error;
  alert(`${err.name} - ${err}`);
};
