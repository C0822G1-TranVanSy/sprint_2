package com.sport_store.service.impl;

import com.sport_store.entity.order.Orders;
import com.sport_store.reposiotry.IOrderRepository;
import com.sport_store.service.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class OrderServiceImpl implements IOrderService {
    @Autowired
    private IOrderRepository iOrderRepository;

    @Override
    public void createOrder(Long accountId) {
        iOrderRepository.createOrder(accountId);
    }

    @Override
    public Optional<Orders> findByAccountId(Long accountId) {
        return iOrderRepository.findByAccountId(accountId);
    }

    @Override
    public Page<Orders> findOrderPurchaseByAccountId(Long accountId, Pageable pageable) {
        return iOrderRepository.findOrderPurchaseByAccountId(accountId, pageable);
    }


    @Override
    public void save(Orders orders) {
        iOrderRepository.save(orders);
    }

    @Override
    public Optional<Orders> findById(Long orderId) {
        return iOrderRepository.findById(orderId);
    }

    @Override
    public void payAllByOrderId(Long orderId, String orderDate) {
        iOrderRepository.payAllByOrderId(orderId,orderDate);
    }
}
