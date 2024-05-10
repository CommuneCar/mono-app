const formatDateRelative = (date: Date): string => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(today.getDate() - 7);

  const dateToFormat = new Date(date);
  const dateOnly = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );

  // Formatting for "today"
  if (dateOnly.getTime() === today.getTime()) {
    return dateToFormat.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  }
  // Formatting for "yesterday"
  else if (dateOnly.getTime() === yesterday.getTime()) {
    return 'Yesterday';
  }
  // Formatting for "X days ago" up to a week
  else if (dateOnly > oneWeekAgo) {
    const daysAgo = (today.getTime() - dateOnly.getTime()) / (1000 * 3600 * 24);
    return `${Math.round(daysAgo)} days ago`;
  }
  // Formatting for dates older than a week
  else {
    return dateToFormat.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }
};

export { formatDateRelative };
