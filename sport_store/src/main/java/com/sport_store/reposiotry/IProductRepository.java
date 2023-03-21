package com.sport_store.reposiotry;

import com.sport_store.dto.product.IProductDto;
import com.sport_store.entity.product.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Transactional
public interface IProductRepository extends JpaRepository<Product, Long> {

    @Query(value = "select product_id as productId, product_name as productName, description, price, avatar, category_id as categoryId from product where flag_delete = false", nativeQuery = true)
    List<IProductDto> getAllProduct();

    @Query(value = "select product_id as productId, product_name as productName, description, price, avatar, category_id as categoryId from product where flag_delete = false",
            countQuery = "select product_id as productId, product_name as productName, description, price, avatar, category_id as categoryId from product where flag_delete = false",nativeQuery = true)
    Page<IProductDto> getAllProduct(Pageable pageable);

    @Query(value = "select * from product where flag_delete = false and product_id = :productId",nativeQuery = true)
    Optional<Product> findById(@Param("productId") Long productId);

}
