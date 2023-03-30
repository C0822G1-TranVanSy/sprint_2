package com.sport_store.service.impl;

import com.sport_store.dto.orders.CartListDto;
import com.sport_store.dto.orders.ICartListDto;
import com.sport_store.dto.orders.ITotalDto;
import com.sport_store.entity.order.Orders;
import com.sport_store.entity.order.PurchaseHistory;
import com.sport_store.entity.product.Product;
import com.sport_store.reposiotry.IPurchaseHistoryRepository;
import com.sport_store.service.IOrderService;
import com.sport_store.service.IProductService;
import com.sport_store.service.IPurchaseHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PurchaseHistoryServiceImpl implements IPurchaseHistoryService {
    @Autowired
    private IPurchaseHistoryRepository iPurchaseHistoryRepository;
    @Autowired
    private IProductService iProductService;
    @Autowired
    private IOrderService iOrderService;

    @Override
    public void createCartItem(Long productId, Long orderId, Integer quantity) {
        List<ICartListDto> cartListDtos = iPurchaseHistoryRepository.getAllProductByOrderId(orderId);
        for (ICartListDto cart : cartListDtos) {
            if (cart.getProductId().equals(productId)) {
                Integer newQuantity = quantity + cart.getQuantity();
                iPurchaseHistoryRepository.updateCartItem(productId, orderId, newQuantity);
                return;
            }
        }
        iPurchaseHistoryRepository.createCartItem(productId, orderId, quantity);
    }

    @Override
    public void updateQuantityCartItem(Long productId, Long orderId, Integer quantity) {
        iPurchaseHistoryRepository.updateCartItem(productId, orderId, quantity);
    }

    @Override
    public List<ICartListDto> getAllProductByOrderId(Long orderId) {
        return iPurchaseHistoryRepository.getAllProductByOrderId(orderId);
    }

    @Override
    public ITotalDto getTotal(Long orderId) {
        return iPurchaseHistoryRepository.getTotal(orderId);
    }

    @Override
    public PurchaseHistory findCartItemById(Long orderId, Long productId) {
        return iPurchaseHistoryRepository.findCartItemById(orderId, productId);
    }

    @Override
    public void deleteCartItem(Long orderId, Long productId) {
        iPurchaseHistoryRepository.deleteCartItem(orderId, productId);
    }

    @Override
    public void insertCartItemLocal(Long orderId, List<CartListDto> cartListLocal) {
//        List<ICartListDto> cartList = iPurchaseHistoryRepository.getAllProductByOrderId(orderId);

//        for (int i = 0; i < cartListLocal.size(); i++) {
//            for (ICartListDto cart : cartList) {
//                if (cart.getProductId().equals(cartListLocal.get(i).getProductId())) {
//                    Integer newQuantity = cartListLocal.get(i).getQuantity() + cart.getQuantity();
//                    iPurchaseHistoryRepository.updateCartItem(cartListLocal.get(i).getProductId(), orderId, newQuantity);
//                    cartListLocal.remove(cartListLocal.get(i));
//                }
//            }
//            iPurchaseHistoryRepository.createCartItem(cartListLocal.get(i).getProductId(), orderId, cartListLocal.get(i).getQuantity());
//        }

        for (CartListDto cart : cartListLocal) {
            createCartItem(cart.getProductId(),orderId,cart.getQuantity());
        }
    }
}
