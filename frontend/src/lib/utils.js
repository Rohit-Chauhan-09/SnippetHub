export function formatData(dateString) {
    if (!dateString) return '';
    
    // Convert the incoming API string into a valid Date object
    const date = new Date(dateString);
    
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}