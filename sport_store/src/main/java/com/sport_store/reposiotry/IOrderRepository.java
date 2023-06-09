package com.sport_store.reposiotry;

import com.sport_store.controller.OrderRestController;
import com.sport_store.entity.order.Orders;
import com.sport_store.entity.product.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.Optional;

@Transactional
public interface IOrderRepository extends JpaRepository<Orders, Long> {
    @Modifying
    @Query(value = "insert into orders (account_id)\n" +
            " VALUES (:accountId)", nativeQuery = true)
    void createOrder(@Param("accountId") Long accountId);

    @Query(value = "select * from orders where payment_status = false and account_id = :accountId", nativeQuery = true)
    Optional<Orders> findByAccountId(@Param("accountId") Long accountId);

    @Query(value = "select * from orders where payment_status = true and account_id = :accountId", nativeQuery = true)
    Page<Orders> findOrderPurchaseByAccountId(@Param("accountId") Long accountId, Pageable pageable);

    @Modifying
    @Query(value = "update orders set order_date = :orderDate,address = :address, phone_number = :phoneNumber, note = :note, payment_status = true where order_id= :orderId", nativeQuery = true)
    void payAllByOrderId(@Param("orderId") Long orderId, @Param("orderDate") String orderDate, @Param("address") String address, @Param("phoneNumber") String phoneNumber, @Param("note") String note);

}
