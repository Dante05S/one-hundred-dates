/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

export const trimValues = (object: any): void => {
  const keys = Object.keys(object);

  keys.forEach((key) => {
    object[key] =
      typeof object[key] === 'string' && key !== 'password'
        ? object[key].trim()
        : object[key];
  });
};
