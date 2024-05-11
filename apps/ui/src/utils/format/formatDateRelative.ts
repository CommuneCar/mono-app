import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/en';

dayjs.extend(relativeTime);
dayjs.locale('en');

const formatDateRelative = (date: Date): string => {
  const now = dayjs();
  const dateToFormat = dayjs(date);

  if (dateToFormat.isSame(now, 'day')) {
    return dateToFormat.format('HH:mm');
  } else if (dateToFormat.isSame(now.subtract(1, 'day'), 'day')) {
    return 'Yesterday';
  } else if (dateToFormat.isAfter(now.subtract(1, 'week'))) {
    return dateToFormat.fromNow();
  } else {
    return dateToFormat.format('MMM DD, YYYY');
  }
};

export { formatDateRelative };
