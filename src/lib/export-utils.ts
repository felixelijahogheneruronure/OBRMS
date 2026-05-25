/**
 * Utility function to export data to CSV format.
 * - Converts an array of objects into a CSV string.
 * - Triggers a browser download.
 */

export function exportToCSV(data: any[], filename: string) {
  if (!data || data.length === 0) {
    return;
  }

  // Define headers based on the first object keys
  const headers = Object.keys(data[0]);
  
  // Create CSV rows
  const csvRows = [
    headers.join(','), // Header row
    ...data.map(row => 
      headers.map(fieldName => {
        const value = row[fieldName] || '';
        // Handle values with commas by wrapping in quotes
        const escaped = ('' + value).replace(/"/g, '""');
        return `"${escaped}"`;
      }).join(',')
    )
  ];

  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
