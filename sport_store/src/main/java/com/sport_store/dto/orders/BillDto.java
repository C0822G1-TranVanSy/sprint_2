package com.sport_store.dto.orders;

import com.sport_store.dto.orders.CartDto;

public class BillDto {
    private Integer accountId;
    private String orderDate;
    private CartDto[] carts;

    public Integer getAccountId() {
        return accountId;
    }

    public void setAccountId(Integer accountId) {
        this.accountId = accountId;
    }

    public String getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(String orderDate) {
        this.orderDate = orderDate;
    }

    public CartDto[] getCarts() {
        return carts;
    }

    public void setCarts(CartDto[] carts) {
        this.carts = carts;
    }

}
