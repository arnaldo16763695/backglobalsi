
export function generateOrderCode(sequence: number): string {
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2); // '24'
    const month = String(now.getMonth() + 1).padStart(2, '0'); // '04'
    const day = String(now.getDate()).padStart(2, '0'); // '12'
    const seq = String(sequence).padStart(3, '0'); // '001'
  
    return `${year}${month}${day}${seq}`; // Ej: 240412001
  }