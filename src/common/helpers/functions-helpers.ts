export const generateRandomCode = () => {
  const min = 10000;
  const max = 99999;
  return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
};

export const expirationTime = 5 * 60 * 1000; // 5 minutos en milisegundos