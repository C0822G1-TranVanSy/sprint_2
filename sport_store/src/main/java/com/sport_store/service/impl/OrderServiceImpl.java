package com.sport_store.service.impl;

import com.sport_store.entity.order.Orders;
import com.sport_store.reposiotry.IOrderRepository;
import com.sport_store.service.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public Optional<Orders> findById(Long accountId) {
        return iOrderRepository.findById(accountId);
    }

    @Override
    public void save(Orders orders) {
        iOrderRepository.save(orders);
    }
}
