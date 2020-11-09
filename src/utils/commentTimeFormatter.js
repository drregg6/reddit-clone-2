import { format } from 'date-fns';

export default function(timeInSeconds) {
  if (timeInSeconds === undefined) return 'New Comment!';
  const timeInMilliseconds = timeInSeconds * 1000;
  return format(new Date(timeInMilliseconds), 'MM-dd-yyyy HH:mm')
}