const state = {
    funds: 10000,
    stocks: []
};

const mutations = {
    'BUY_STOCK' (state, {stockId, stockQuantity, stockPrice}) {
        const record = findStock(stockId);
        if (record) {
            record.quantity += stockQuantity;
        } else {
            state.stocks.push({
                id: stockId,
                quantity: stockQuantity
            });
        }
        state.funds -= stockPrice * stockQuantity;
    },
    'SELL_STOCK' (state, {stockId, stockQuantity, stockPrice}) {
        const record = findStock(stockId);
        if (record.quantity > stockQuantity) {
            record.quantity -= stockQuantity;
        } else {
            state.stocks.splice(state.stocks.indexOf(record), 1);
        }
        state.funds += stockPrice * stockQuantity;
    },
    'SET_PORTFOLIO' (state, portfolio) {
        state.funds = portfolio.funds;
        state.stocks = portfolio.stockPortfolio ? portfolio.stockPortfolio : [];
    }
};

const actions = {
    sellStock ({commit}, order) {
        commit('SELL_STOCK', order);
    }
};

const getters = {
    stockPortfolio (state, getters) {
        return state.stocks.map(stock => {
            const record = getters.stocks.find(element => element.id === stock.id);
            return {
                id: stock.id,
                quantity: stock.quantity,
                name: record.name,
                price: record.price
            }
        });
    },
    funds (state) {
        return state.funds;
    }
};

const findStock = (id) => state.stocks.find(element => element.id === id);

export default {
    state,
    mutations,
    actions,
    getters
};