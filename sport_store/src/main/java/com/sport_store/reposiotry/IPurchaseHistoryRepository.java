package com.sport_store.reposiotry;

import com.sport_store.dto.orders.ICartListDto;
import com.sport_store.dto.orders.ITotalDto;
import com.sport_store.entity.order.PurchaseHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
public interface IPurchaseHistoryRepository extends JpaRepository<PurchaseHistory, Long> {
    @Modifying
    @Query(value = "insert into purchase_history (product_id,order_id,quantity)\n" +
            " VALUES (:productId,:orderId,:quantity)", nativeQuery = true)
    void createCartItem(@Param("productId") Long productId, @Param("orderId") Long orderId, @Param("quantity") Integer quantity);

    @Modifying
    @Query(value = "update purchase_history set quantity =:quantity where order_id=:orderId and product_id=:productId", nativeQuery = true)
    void updateCartItem(@Param("productId") Long productId, @Param("orderId") Long orderId, @Param("quantity") Integer quantity);

    @Query(value = "select ph.product_id as productId, p.product_name as productName, p.price, p.avatar, ph.quantity from purchase_history ph join product p on p.product_id = ph.product_id join orders o on ph.order_id = o.order_id where o.payment_status = false and ph.order_id = :orderId"
            , nativeQuery = true)
    List<ICartListDto> getAllProductByOrderId(@Param("orderId") Long orderId);

    @Query(value = "select sum(quantity) as totalQuantity, sum(quantity*price) as totalPayment from product p join purchase_history ph on p.product_id = ph.product_id join orders o on ph.order_id = o.order_id where o.payment_status = false and ph.order_id = :orderId"
            , nativeQuery = true)
    ITotalDto getTotal(@Param("orderId") Long orderId);

    @Query(value = "select * from purchase_history where order_id = :orderId and product_id = :productId", nativeQuery = true)
    PurchaseHistory findCartItemById(@Param("orderId") Long orderId, @Param("productId") Long productId);

    @Modifying
    @Query(value = "delete from purchase_history where order_id = :orderId and product_id = :productId", nativeQuery = true)
    void deleteCartItem(@Param("orderId") Long orderId, @Param("productId") Long productId);
}
