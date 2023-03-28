package com.sport_store.reposiotry;

import com.sport_store.controller.OrderRestController;
import com.sport_store.entity.order.Orders;
import com.sport_store.entity.product.Product;
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
    Optional<Orders> findById(@Param("accountId") Long accountId);
}
