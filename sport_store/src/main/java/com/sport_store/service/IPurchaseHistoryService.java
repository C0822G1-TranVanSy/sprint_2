package com.sport_store.service;

import com.sport_store.dto.orders.ICartListDto;
import com.sport_store.dto.orders.ITotalDto;
import com.sport_store.entity.order.PurchaseHistory;

import java.util.List;

public interface IPurchaseHistoryService {

    void createCartItem(Long productId, Long orderId, Integer quantity);

    void updateQuantityCartItem(Long productId, Long orderId, Integer quantity);

    List<ICartListDto> getAllProductByOrderId(Long orderId);

    ITotalDto getTotal( Long orderId);

    PurchaseHistory findCartItemById( Long orderId, Long productId);

    void deleteCartItem(Long orderId, Long productId);
}
