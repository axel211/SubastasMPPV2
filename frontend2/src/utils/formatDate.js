export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = (`0${date.getDate()}`).slice(-2); // Añade un cero al inicio y toma los últimos dos dígitos
    const month = (`0${date.getMonth() + 1}`).slice(-2); // Los meses son base 0
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};
