package com.sport_store.service;

import com.sport_store.dto.product.IProductDto;
import com.sport_store.entity.product.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface IProductService {
    List<IProductDto> getAllProduct();

    Page<IProductDto> getAllProduct(Pageable pageable);

    Page<IProductDto> searchAllProductByName(Pageable pageable, String name);

    Page<IProductDto> searchAllProductByNameAndPrice(Pageable pageable, String name, String sm, String bg);

    Optional<Product> findById( Long productId);

    void createProduct(String productName, String description,
                       Double price, String avatar, Long categoryId);

    void updateProduct(String productName, String description,
                       Double price, String avatar,
                       Long categoryId, Long productId);

    void deleteProduct( Long productId);

    Page<IProductDto> searchByCategory(Long categoryId,Pageable pageable);
}
