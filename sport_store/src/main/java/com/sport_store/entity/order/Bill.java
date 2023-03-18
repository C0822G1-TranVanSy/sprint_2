package com.sport_store.entity.order;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.sport_store.entity.account.Account;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Bill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bill_id")
    private Long billId;
    private Boolean flagDelete;
    @Column(columnDefinition = "date")
    private String orderDate;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "account_id")
    private Account account;

    public Long getBillId() {
        return billId;
    }

    public void setBillId(Long billId) {
        this.billId = billId;
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
}