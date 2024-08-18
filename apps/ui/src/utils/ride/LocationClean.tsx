export const cleanLocationName = (locationName: string) => {
  const regexRemove = /[^,]*(מחוז|District|\b\d{5,7}\b)[^,]*/gi;
  const cleanedName = locationName.replace(regexRemove, '');
  let parts = cleanedName.split(',').map(part => part.trim()).filter(part => part !== '');
  const subdistrictIndex = parts.findIndex(part => part.includes('נפת') || part.includes('Subdistrict'));
  if (subdistrictIndex > 1) {
    if (isNaN(+parts[0])) {
      parts = [parts[0], parts[subdistrictIndex - 1], ...parts.slice(subdistrictIndex + 1)];
    } else {
      parts = [parts[0], parts[1], parts[subdistrictIndex - 1], ...parts.slice(subdistrictIndex + 1)];
    }
  } else if (subdistrictIndex > 0) {
    parts = [parts[0], ...parts.slice(subdistrictIndex + 1)];
  }
  return parts.join(', ');
};