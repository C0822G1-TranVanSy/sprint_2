package com.sport_store.reposiotry;

import com.sport_store.dto.product.IProductDto;
import com.sport_store.dto.warehouse.IWareHouseDto;
import com.sport_store.entity.warehouse.Warehouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Transactional
public interface IWareHouseRepository extends JpaRepository<Warehouse, Long> {
    @Query(value = "select id, quantity, product_id as productId from warehouse", nativeQuery = true)
    List<IWareHouseDto> getAll();

    @Query(value = "select id, quantity, product_id as productId from warehouse where product_id=:productId", nativeQuery = true)
    IWareHouseDto findByProductId(@Param("productId") Long productId);
}
