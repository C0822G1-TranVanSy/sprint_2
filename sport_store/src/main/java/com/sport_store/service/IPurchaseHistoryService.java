package com.sport_store.service;

import com.sport_store.dto.orders.CartListDto;
import com.sport_store.dto.orders.ICartListDto;
import com.sport_store.dto.orders.ITotalDto;
import com.sport_store.dto.product.IBestProductDto;
import com.sport_store.entity.order.Orders;
import com.sport_store.entity.order.PurchaseHistory;
import com.sport_store.entity.product.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IPurchaseHistoryService {

    void createCartItem(Long productId, Long orderId, Integer quantity);

    void updateQuantityCartItem(Long productId, Long orderId, Integer quantity);

    List<ICartListDto> getAllProductByOrderId(Long orderId);

    List<ICartListDto> getPurchaseHistoriesByOrderId( Long orderId);

    ITotalDto getTotal( Long orderId);

    PurchaseHistory findCartItemById( Long orderId, Long productId);

    void deleteCartItem(Long orderId, Long productId);

    void insertCartItemLocal(Long orderId, List<CartListDto> cartListDtos);

    Page<IBestProductDto> getBestProduct(Pageable pageable);

}
