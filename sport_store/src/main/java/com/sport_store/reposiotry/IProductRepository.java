package com.sport_store.reposiotry;

import com.sport_store.dto.product.IProductDto;
import com.sport_store.entity.product.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Transactional
public interface IProductRepository extends JpaRepository<Product, Long> {

    @Query(value = "select product_id as productId, product_name as productName, description, price, avatar, category_id as categoryId from product where flag_delete = false", nativeQuery = true)
    List<IProductDto> getAllProduct();

    @Query(value = "select product_id as productId, product_name as productName, description, price, avatar, category_id as categoryId from product where flag_delete = false order by product_id desc",
            countQuery = "select product_id as productId, product_name as productName, description, price, avatar, category_id as categoryId from product where flag_delete = false order by product_id desc", nativeQuery = true)
    Page<IProductDto> getAllProduct(Pageable pageable);

    @Query(value = "select * from product where flag_delete = false and product_id = :productId", nativeQuery = true)
    Optional<Product> findById(@Param("productId") Long productId);

    @Modifying
    @Query(value = "insert into product (product_name, description, price, avatar, category_id)\n" +
            " VALUES (:productName, :description, :price, :avatar, :categoryId)", nativeQuery = true)
    void createProduct(@Param("productName") String productName, @Param("description") String description,
                       @Param("price") Double price, @Param("avatar") String avatar,
                       @Param("categoryId") Long categoryId);

    @Modifying
    @Query(value = "update product set product_name = :productName, description = :description, price = :price, avatar = :avatar, category_id = :categoryId where product_id = :productId", nativeQuery = true)
    void updateProduct(@Param("productName") String productName, @Param("description") String description,
                       @Param("price") Double price, @Param("avatar") String avatar,
                       @Param("categoryId") Long categoryId, @Param("productId") Long productId);

    @Modifying
    @Query(value = "update product set flag_delete = true where product_id = :productId", nativeQuery = true)
    void deleteProduct(@Param("productId") Long productId);

    @Query(value = "select product_id as productId, product_name as productName, description, price, avatar, category_id as categoryId from product where flag_delete = false and category_id =:categoryId order by product_id desc",
            countQuery = "select product_id as productId, product_name as productName, description, price, avatar, category_id as categoryId from product where flag_delete = false and category_id =:categoryId order by product_id desc", nativeQuery = true)
    Page<IProductDto> searchByCategory(@Param("categoryId") Long categoryId,Pageable pageable);

}
