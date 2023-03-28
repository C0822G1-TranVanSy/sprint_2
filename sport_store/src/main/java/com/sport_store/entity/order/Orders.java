package com.sport_store.entity.order;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.sport_store.entity.account.Account;

import javax.persistence.*;
import java.util.List;

@Entity
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Long orderId;
    @Column(columnDefinition = "bit default 0")
    private Boolean flagDelete;
    @Column(columnDefinition = "date")
    private String orderDate;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "account_id")
    private Account account;
    @Column(columnDefinition = "bit default 0")
    private Boolean paymentStatus;
    @OneToMany(cascade = CascadeType.ALL,fetch = FetchType.LAZY, mappedBy = "order")
    @JsonBackReference
    private List<PurchaseHistory> purchaseHistoryList;

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Boolean getFlagDelete() {
        return flagDelete;
    }

    public void setFlagDelete(Boolean flagDelete) {
        this.flagDelete = flagDelete;
    }

    public String getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(String orderDate) {
        this.orderDate = orderDate;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public Boolean getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(Boolean paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public List<PurchaseHistory> getPurchaseHistoryList() {
        return purchaseHistoryList;
    }

    public void setPurchaseHistoryList(List<PurchaseHistory> purchaseHistoryList) {
        this.purchaseHistoryList = purchaseHistoryList;
    }
}
