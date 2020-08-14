export const getOrderList = (max: number, min = 0): number[] => {
    const orderList: number[] = [];
    for (let i = min; i<= max; i++) {
        orderList.push(i);
    }

    return orderList;
};