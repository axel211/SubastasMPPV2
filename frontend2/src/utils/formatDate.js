export const formatDate = (isoString) => {
    const date = new Date(isoString);

    // Convertir la fecha a la zona horaria local
    const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);

    const day = String(localDate.getDate()).padStart(2, '0');
    const month = String(localDate.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
    const year = localDate.getFullYear();
    return `${day}/${month}/${year}`;
};
