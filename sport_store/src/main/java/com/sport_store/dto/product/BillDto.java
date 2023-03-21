package com.sport_store.dto.product;

import java.util.Arrays;

public class BillDto {
    private Integer accountId;
    private String orderDate;
    private Cart[] carts;

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

    public Cart[] getCarts() {
        return carts;
    }

    public void setCarts(Cart[] carts) {
        this.carts = carts;
    }

    @Override
    public String toString() {
        return "BillDTO{" +
                "accountId=" + accountId +
                ", orderDate='" + orderDate + '\'' +
                ", carts=" + Arrays.toString(carts) +
                '}';
    }
}
