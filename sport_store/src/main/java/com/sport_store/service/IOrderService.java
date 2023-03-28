package com.sport_store.service;

import com.sport_store.entity.order.Orders;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface IOrderService {
    void createOrder( Long accountId);

    Optional<Orders> findById( Long accountId);

    void save(Orders orders);
}
