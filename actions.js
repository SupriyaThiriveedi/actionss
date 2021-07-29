import axios from '../axios/axios';

const _addOrder = (order) => ({
    type: 'ADD_ORDER',
    order
});


export const addOrder = (orderData = {
    orderId: '',
    amount: '',
    billingDate:''
  
}) => {
    return (dispatch) => {
        console.log("in add order action empdata"+orderData.billingDate)
        const order = {
            orderId: orderData.orderId,
            amount: orderData.amount,
            billingDate:orderData.billingDate
        };
        console.log("order dispatch"+order.amount)
        return axios.post('orders', order).then(result => {
            dispatch(_addOrder(result.data));
        });
    };
};

const _editOrder = (id, updates) => ({
    type: 'EDIT_ORDER',
    id,
    updates
});

export const editOrder = (id, updates) => {
    return (dispatch) => {
        return axios.put(`orders/${id}`, updates).then(() => {
            dispatch(_editOrder(id, updates));
        });
    }
};
//return axios.post(ORDER_API_BASE_URL, order);

const _removeOrder = ({ id } = {}) => ({
    type: 'REMOVE_ORDER',
    id
});

export const removeOrder = (id) => {
    console.log("id"+id);
    return (dispatch) => {
        return axios.delete(`orders/${id}`).then(() => {
            dispatch(_removeOrder({ id }));
        })
    }
};





const _getOrders = (orders) => ({
    type: 'GET_ORDERs',
    orders
});

export const getOrders = () => {
    return (dispatch) => {
        return axios.get('orders').then(result => {
            const orders = [];

            result.data.forEach(item => {
                orders.push(item);
            });

            dispatch(_getOrders(orders));
        });
    };
};