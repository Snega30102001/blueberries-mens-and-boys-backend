const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, '..', 'local_db.json');

const getLocalData = () => {
    if (!fs.existsSync(DB_FILE)) {
        const initialData = { categories: [], subcategories: [], products: [], banners: [] };
        fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
        return initialData;
    }
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    try {
        return JSON.parse(data);
    } catch (e) {
        return { categories: [], subcategories: [], products: [], banners: [] };
    }
};

const saveLocalData = (data) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

const localDB = {
    getAll: (collection) => {
        const data = getLocalData();
        return data[collection] || [];
    },
    getById: (collection, id) => {
        const data = getLocalData();
        return (data[collection] || []).find(i => i._id === id);
    },
    insert: (collection, item) => {
        const data = getLocalData();
        if (!data[collection]) data[collection] = [];
        
        const newItem = { 
            _id: Date.now().toString(), 
            ...item, 
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        data[collection].push(newItem);
        saveLocalData(data);
        return newItem;
    },
    update: (collection, id, updates) => {
        const data = getLocalData();
        const index = data[collection].findIndex(i => i._id === id);
        if (index !== -1) {
            data[collection][index] = { ...data[collection][index], ...updates, updatedAt: new Date().toISOString() };
            saveLocalData(data);
            return data[collection][index];
        }
        return null;
    },
    delete: (collection, id) => {
        const data = getLocalData();
        if (data[collection]) {
            data[collection] = data[collection].filter(i => i._id !== id);
            saveLocalData(data);
        }
        return true;
    }
};

module.exports = localDB;
