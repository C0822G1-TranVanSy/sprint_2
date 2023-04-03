package com.sport_store.service;

import com.sport_store.entity.order.Orders;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface IOrderService {
    void createOrder( Long accountId);

    Optional<Orders> findByAccountId( Long accountId);

    Page<Orders> findOrderPurchaseByAccountId(Long accountId, Pageable pageable);

    void save(Orders orders);

    Optional<Orders> findById(Long orderId);


    void payAllByOrderId(Long orderId, String orderDate);
}
