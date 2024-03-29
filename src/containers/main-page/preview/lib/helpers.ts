import dayjs from 'dayjs';

export const formatDateAsianStandart = (id: string | Date): string => dayjs(id).format('MMMM YYYY');
