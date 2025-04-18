


 const swapCore = { 
    async getDate() {
        const now = new Date();
        
        // Get date components
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(now.getDate()).padStart(2, '0');
        
        // Get time components
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        // Format as YYYY-MM-DD HH:MM:SS
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },

    rand(l, u) {
        return Math.floor(Math.random() * (u - l + 1)) + l;
    },

    generateDepositReference(userId)
    {
        return `BDP-${parseInt(userId)+10000000}-${this.rand(10000000, 99999999)}`;
    }
}
module.exports = swapCore;
