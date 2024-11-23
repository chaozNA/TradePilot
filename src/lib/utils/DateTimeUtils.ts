import { format } from 'date-fns';

export const formatDate = (timestamp: number | string | Date) => {
    return format(new Date(timestamp), 'yyyy-MM-dd');
};